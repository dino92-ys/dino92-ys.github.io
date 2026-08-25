---
title: "InnoDB Buffer Pool"
date: 2026-08-24
tags:
  - MySQL
  - InnoDB
description: "InnoDB가 데이터/인덱스 페이지를 캐싱하는 메모리 영역인 buffer pool의 동작 원리와 크기 산정 기준을 정리한다."
draft: true
---

## 핵심 정리

- InnoDB가 디스크의 데이터·인덱스 페이지를 메모리에 캐싱하는 영역이다. MySQL 성능에서 가장 큰 비중을 차지하는 설정 중 하나다.
- `innodb_buffer_pool_size` 기본값은 128MB로, 실서버에서는 대체로 이 값을 그대로 두면 안 된다.
- 통상 권장 크기는 전용 DB 서버 기준 물리 RAM의 **50~70%**다. 나머지는 OS와 커넥션별 메모리 몫으로 남겨야 한다.
- `SET GLOBAL`로 바꾼 값은 재시작 시 원복된다. 영구 반영하려면 `my.cnf`에 적거나 `SET PERSIST`(8.0+)를 쓴다.

## 개념 또는 사용법

### 동작 원리

- SELECT: 디스크에서 읽은 페이지를 buffer pool에 캐싱해두고 재사용한다. 캐시 히트 시 디스크 I/O가 발생하지 않는다.
- INSERT/UPDATE: 변경분(dirty page)을 먼저 buffer pool에 반영하고, 이후 백그라운드로 디스크에 flush(체크포인트)한다.
- 처리할 데이터셋이 buffer pool보다 크면 페이지 교체(eviction)가 반복돼 디스크 I/O가 늘어난다.
- dirty page가 유입되는 속도가 flush 속도보다 빠르면 buffer pool이 dirty page로 가득 차고, 새 페이지를 들일 공간이 없어 InnoDB가 사실상 멈추는 상태에 이를 수 있다.

### 크기 산정 기준

- 이상적으로는 "자주 쓰는 데이터셋 전체"를 담을 수 있는 크기가 목표다.
- 물리 RAM의 50~70%를 기준으로 잡되, 100%를 다 주면 OS가 쓸 메모리가 없어 스와핑이나 OOM killer에 의한 프로세스 종료로 이어질 수 있다.
- 커넥션별로도 `sort_buffer_size`, `join_buffer_size`, `read_buffer_size` 등 세션당 메모리가 별도로 잡히므로, 커넥션 수가 많으면 이 몫도 함께 고려해야 한다.
- 전체 메모리 예산 감각: `(max_connections × 세션당 메모리) + buffer pool + OS 여유분` ≤ 물리 RAM.

### 여러 인스턴스로 분할

- `innodb_buffer_pool_instances`: buffer pool을 여러 조각으로 나눠 락 경합을 줄인다.
- buffer pool이 8GB를 넘으면 기본적으로 여러 instance로 분할된다.

### 재시작 시 캐시 유지

- 기본적으로 재시작하면 buffer pool 내용이 사라져 콜드 스타트가 발생한다.
- `innodb_buffer_pool_dump_at_shutdown` + `innodb_buffer_pool_load_at_startup`을 함께 켜두면 종료 시 buffer pool 상태를 저장하고, 시작 시 복원한다.

## 예시

```sql
-- 현재 설정값 확인
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';

-- 런타임 임시 변경 (재시작 시 원복)
SET GLOBAL innodb_buffer_pool_size = 68719476736; -- 64GB

-- 8.0+ : 재시작 후에도 유지되도록 영구 반영
SET PERSIST innodb_buffer_pool_size = 68719476736;
```

<!-- 실행하지 않은 예시임. 실제 운영 환경에서는 값 변경 전 현재 워크로드와 여유 메모리를 확인해야 한다. -->

### 모니터링 지표

- `Innodb_buffer_pool_pages_free`: 여유 페이지 수.
- `Innodb_buffer_pool_wait_free`: buffer pool에 여유가 없어 대기한 횟수. 0보다 크면 buffer pool 부족 신호로 본다.
- buffer pool hit rate(캐시 히트율): 보통 99% 이상 유지되는 것이 정상 범위로 알려져 있다.

```sql
SHOW STATUS LIKE 'Innodb_buffer_pool_wait_free';
SHOW ENGINE INNODB STATUS; -- BUFFER POOL AND MEMORY 섹션 확인
```

## 주의점과 관련 링크

- `innodb_buffer_pool_size`는 동적 변경이 가능하지만(온라인 리사이즈), 대용량으로 크게 줄이거나 늘릴 때는 일시적으로 부하가 걸릴 수 있다.
- 이 노트는 실제 장애 대응 과정에서 정리한 것이다. 사건 경위는 [[blog/MySQL_Buffer_Pool_초과_장애_트러블슈팅]] 참고.
- 대용량 데이터 처리 시 buffer pool 크기만으로 해결되지 않는 경우가 많다. 처리 방식 자체는 [[대용량_INSERT_배치_처리]] 참고.

## 참고 자료

<!-- 확인 필요: MySQL 공식 문서(InnoDB Buffer Pool 챕터) 링크 추가 예정. -->

## 공개 전 점검

- [ ] 제목, 날짜, 태그, 설명을 작성했는가?
- [x] 하나의 주제에 집중했는가?
- [x] 실행 결과와 예시를 구분했는가?
- [ ] 비밀정보와 내부 정보를 제거하거나 익명화했는가?
- [ ] 공개 준비가 끝났다면 `draft: false`로 변경했는가?
