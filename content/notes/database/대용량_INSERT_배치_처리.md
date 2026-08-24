---
title: "대용량 INSERT 배치 처리"
date: 2026-08-24
tags:
  - MySQL
  - 성능
description: "수십만~수백만 건 규모의 INSERT를 안전하게 처리하기 위한 청크 크기, 커밋 시점, 자르는 기준을 정리한다."
draft: true
---

## 핵심 정리

- 수십만 건 이상을 하나의 트랜잭션으로 SELECT/INSERT하면 undo log와 buffer pool에 부담이 몰려 DB가 응답 불능 상태에 빠질 수 있다.
- 통상 **1,000~5,000건** 단위로 잘라 청크마다 커밋하는 방식을 쓴다. 청크 처리 시간이 1~2초 안쪽으로 끝나는 크기가 적당하다는 것이 실무 감각이다.
- 자르는 기준은 `LIMIT/OFFSET`보다 **PK 범위**(`WHERE id BETWEEN x AND y`)가 인덱스를 타므로 더 빠르다.
- 여러 건을 한 문장에 묶는 멀티밸류 INSERT나 `LOAD DATA INFILE`이 건별 INSERT보다 빠르다.

## 개념 또는 사용법

### 청크 크기

- 너무 작으면(예: 100건) 커밋 오버헤드와 네트워크 왕복 횟수가 늘어 느려진다.
- 너무 크면(예: 10만 건) undo log·buffer pool 부담이 커져 원래 문제(장시간 트랜잭션, buffer pool 초과)가 재발할 수 있다.
- 정답 수치는 없다. 로우 크기(컬럼 수·타입)에 따라 다르다. 작은 로우는 5,000건도 가볍고, TEXT/BLOB이 섞인 큰 로우는 500건도 무거울 수 있다.
- 기준으로 삼을 감각: 청크 하나 처리 시간이 1~2초 이내로 끝나는 크기. 이보다 오래 걸리면 청크를 줄인다.

### 커밋 시점

- 청크 하나 = 트랜잭션 하나로 묶어 INSERT 후 커밋한다.
- autocommit이 켜진 상태로 문장 하나하나를 트랜잭션으로 처리하면 문장마다 fsync가 발생해 오히려 느려질 수 있다. 그렇다고 전체를 한 트랜잭션으로 묶으면 장시간 트랜잭션 문제가 생긴다. 수천 건 단위로 묶는 것이 두 극단 사이의 절충점이다.

### 자르는 기준

- `LIMIT/OFFSET`: 구현은 쉽지만 OFFSET이 커질수록 그 앞부분을 스캔하고 버리는 비용이 늘어 뒤로 갈수록 느려진다.
- PK 범위(`WHERE id BETWEEN x AND y`): 인덱스를 타므로 데이터 규모가 커도 성능이 일정하다. PK가 auto_increment면 특히 구현이 간단하다.

### INSERT 문 자체 최적화

- 멀티밸류 INSERT(`INSERT INTO t VALUES (...),(...),(...)`)가 건별 INSERT보다 빠르다.
- 단, 한 문장에 너무 많은 값을 묶으면 `max_allowed_packet`을 넘어 에러가 난다. 이 값을 확인하고 청크 크기를 맞춰야 한다.
- 파일로 뽑아서 적재할 수 있는 상황이라면 `LOAD DATA INFILE`이 가장 빠른 방법이다.

### 부하 조절

- 청크 사이에 짧은 sleep(예: 100ms~수백ms)을 넣어 buffer pool과 디스크 I/O가 숨 돌릴 틈을 주는 방식도 실무에서 쓰인다. 특히 서비스가 운영 중인 DB에 배치 작업을 돌릴 때 유효하다.
- 배치 시작 전 `SHOW ENGINE INNODB STATUS`나 buffer pool 여유를 확인하는 것도 도움이 된다.

## 예시

```sql
-- PK 범위로 청크를 나눠 처리하는 예시 (의사 코드)
-- 1) 대상 PK 범위 확인
SELECT MIN(id), MAX(id) FROM source_table;

-- 2) 5,000건 단위로 반복 (애플리케이션 또는 스크립트에서 반복)
START TRANSACTION;
INSERT INTO target_table
SELECT * FROM source_table
WHERE id BETWEEN 1 AND 5000;
COMMIT;

-- 다음 반복: id BETWEEN 5001 AND 10000 ...
```

<!-- 실행하지 않은 예시임. 실제 적용 시에는 로우 크기와 서버 여유 자원에 맞춰 청크 크기를 조정해야 한다. -->

## 주의점과 관련 링크

- 청크 크기·sleep 간격의 "좋고 나쁨"을 판단하는 정량적 기준은 아직 확립하지 못했다. 실제 워크로드로 측정하며 조정이 필요하다. **확인 필요**.
- 이 정리는 [[blog/MySQL_Buffer_Pool_초과_장애_트러블슈팅]] 장애를 계기로 시작했다. buffer pool 자체의 동작 원리는 [[InnoDB_Buffer_Pool]] 참고.
- `LOAD DATA INFILE`은 바이너리 로그 설정(`sql_log_bin`)에 따라 복제 환경에서 동작이 달라질 수 있다 — 적용 전 확인 필요.

## 참고 자료

<!-- 확인 필요: MySQL 공식 문서(Bulk Data Loading, INSERT 최적화 챕터) 링크 추가 예정. -->

## 공개 전 점검

- [ ] 제목, 날짜, 태그, 설명을 작성했는가?
- [x] 하나의 주제에 집중했는가?
- [x] 실행 결과와 예시를 구분했는가?
- [ ] 비밀정보와 내부 정보를 제거하거나 익명화했는가?
- [ ] 공개 준비가 끝났다면 `draft: false`로 변경했는가?
