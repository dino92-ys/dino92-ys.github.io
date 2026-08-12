# Claude Code CLI 사용법 학습 정리

---

## 1. Claude Code란?

단순 챗봇이 아닌 **자율형 코딩 에이전트**. 파일 읽기, 명령어 실행, 코드 수정을 Claude가 직접 수행한다.

- 기존 AI 도구: 내가 코드 작성 → AI에게 질문 → 복붙
- Claude Code: 목표 설명 → Claude가 직접 구현

---

## 2. 세션 시작 / 종료

```bash
claude                          # 프로젝트 루트에서 실행 (CLAUDE.md 자동 로드)
claude "지시사항"                # 바로 작업 지시하며 시작
claude --enable-auto-mode       # Auto Mode로 시작 (승인 팝업 최소화)
```

```bash
/exit       # 정상 종료
Ctrl + D    # 정상 종료 (동일 효과)
Ctrl + C    # ⚠️ 세션 완전 종료 (응답 중에 누르면 종료됨, 주의!)
```

---

## 3. 핵심 키보드 조작

| 키 | 동작 | 언제 사용? |
|---|---|---|
| `Escape` | 현재 응답 **중지** | Claude가 잘못된 방향으로 갈 때 |
| `Escape` × 2 | 이전 메시지 목록 표시 | 이전 대화로 돌아갈 때 |
| `Ctrl + C` | 세션 완전 종료 | 진짜 나갈 때만 |
| `Shift + Tab` | Auto Mode 순환 전환 | 승인 팝업 줄일 때 |
| `↑` / `↓` | 이전 입력 불러오기 | 직전 명령 재사용 시 |

> ⚠️ 응답 중지는 반드시 `Escape` — `Ctrl+C`는 세션 자체가 종료됨!

---

## 4. 필수 슬래시 명령어

| 명령어 | 설명 |
|---|---|
| `/init` | 프로젝트 분석 후 CLAUDE.md 자동 생성 ⭐ |
| `/clear` | 대화 기록 초기화 (새 작업 시작 전 필수 습관) |
| `/compact` | 컨텍스트 압축 (긴 작업 중간에 사용) |
| `/context` | 현재 토큰 점유율 시각화 확인 |
| `/cost` | 현재 세션 토큰 사용량 및 비용 확인 |
| `/model` | 사용 모델 변경 (Haiku / Sonnet / Opus) |
| `/permissions` | 허용/차단 명령어 규칙 관리 |
| `/btw` | 대화 히스토리에 남지 않는 빠른 질문 오버레이 |
| `/help` | 전체 명령어 목록 확인 |

---

## 5. 셸 명령어 직접 실행

```bash
!git status       # ! 접두사로 셸 명령 즉시 실행 (토큰 절약)
!npm test
!python -m pytest tests/
```

`!` 없이 "git status 실행해줘"라고 해도 되지만, `!`를 쓰면 토큰 낭비 없이 결과만 컨텍스트에 포함됨.

---

## 6. 파이프라인 연동

```bash
cat error.log | claude "이 에러 원인 파악하고 수정해줘"
git diff | claude "이 변경사항으로 커밋 메시지 작성해줘"
npm test 2>&1 | claude "실패한 테스트 수정해줘"
python train.py 2>&1 | claude "이 학습 로그에서 문제 찾아줘"
```

---

## 7. 세션 관리 핵심 패턴

### 새 작업 시작할 때 (가장 중요한 습관!)
```
/clear        ← 반드시! 새 작업 전 컨텍스트 초기화
> 다음 작업 지시...
```

### 작업 중 컨텍스트가 차오를 때
```
/compact      ← 핵심 정보 유지하면서 압축
> 이어서 계속해줘
```

### Claude가 잘못된 방향으로 갈 때
```
[Escape]      ← 즉시 중지
> 아니야, 이 파일만 수정해줘
```

---

## 8. Plan Mode (계획 모드)

기존 코드가 있을 때 바로 수정 요청하면 맥락 없이 작업해서 엉뚱한 결과가 나올 수 있음.
**Plan Mode를 먼저 쓰는 게 정석.**

```bash
Shift + Tab   # Plan Mode 진입/전환
```

Plan Mode에서는 **파일 읽기와 분석만** 하고 실제 파일 수정은 하지 않음.

### 활용 예시
```
(Plan Mode에서)
> 이 프로젝트 전체 구조를 파악해줘.
  주요 파일 역할, 데이터 흐름, 의존성을 설명해줘.
  코드는 수정하지 마.

> 분석 내용을 .claude/docs/architecture.md로 저장해줘.
```

---

## 9. CLAUDE.md — 가장 중요한 기능

### 개념
Claude Code는 매 세션이 완전히 초기화됨 → 매번 프로젝트 설명 반복 필요.
**CLAUDE.md에 프로젝트 정보를 한 번만 써두면, 세션 시작 시 자동으로 읽어서 맥락 파악.**

### 파일 위치 2종류

| 위치 | 적용 범위 | 내용 |
|---|---|---|
| `~/.claude/CLAUDE.md` | **전역** (모든 프로젝트) | 개인 스타일, 공통 규칙 |
| `./CLAUDE.md` | **해당 프로젝트만** | 프로젝트 스택, 현재 단계 |

```bash
# 전역 CLAUDE.md 위치 (절대 이동 금지!)
/Users/ys/.claude/CLAUDE.md
```

### 빠른 시작
```bash
/init   # 프로젝트 구조 분석해서 CLAUDE.md 초안 자동 생성
```

### 작성 원칙
- **간결하게 유지**: 각 줄마다 "이걸 빼면 Claude가 실수할까?" 물어보기
- 길어질수록 Claude가 실제 지시사항을 무시하게 됨
- 코드처럼 취급: 정기적으로 검토하고 업데이트

### 업데이트 방법
```bash
# 세션 마무리마다
> 오늘 작업 내용 반영해서 CLAUDE.md 업데이트해줘.
```

---

## 10. 커스텀 슬래시 명령어

반복 작업을 명령어로 저장해두는 기능.

```bash
# 위치
.claude/commands/   # 현재 프로젝트에서만 사용
~/.claude/commands/ # 모든 프로젝트에서 사용

# 만드는 방법 (파일명이 명령어 이름)
echo "이 코드를 리뷰해줘. 성능, 가독성, 보안 관점에서:" > .claude/commands/review.md
echo "이슈 #\$ARGUMENTS를 해결해줘." > .claude/commands/fix-issue.md

# 사용
/review
/fix-issue 42
```

---

## 11. 모델 선택 전략

| 모델 | 언제 사용? |
|---|---|
| Sonnet | 대부분의 일반 작업 (기본값) |
| Haiku | 빠르고 저렴하게, 쉬운 작업 |
| Opus | 복잡한 아키텍처 결정, 다단계 계획 |

```bash
/model    # 세션 중 모델 변경
```

---

## 12. Git 연동 꿀팁

```bash
# 작업 단계마다 커밋 요청 습관화
> 변경사항 적용 전에 먼저 커밋해줘
> Draft PR 만들어줘 (검토 후 직접 머지할게)
```

---

## 13. 프로젝트 첫 투입 시 추천 순서

```bash
# 1. 프로젝트 루트로 이동
cd ~/dev/ai/프로젝트명

# 2. conda 환경 활성화
conda activate 환경명

# 3. Claude Code 실행
claude

# 4. CLAUDE.md 생성
/init

# 5. Plan Mode로 구조 파악
Shift + Tab
> 이 프로젝트 전체 구조를 파악해줘. 코드는 수정하지 마.

# 6. 분석 결과 저장
> .claude/docs/architecture.md로 정리해줘.
> CLAUDE.md에 핵심 요약 3줄 추가해줘.

# 7. Plan Mode 해제 후 작업 시작
Shift + Tab
```

---

## 14. 주의사항 모음

- `~/.claude/` 폴더는 **절대 이동 금지** (Claude Code 시스템 폴더)
- Git 프로젝트는 iCloud 안에 두면 안 됨 (파일 충돌, .git 손상 위험)
- `Ctrl+C`는 응답 중지가 아닌 **세션 완전 종료**
- CLAUDE.md가 너무 길면 오히려 Claude가 지시사항을 무시함

---

## 15. 파일/폴더 구조 (영선님 환경 기준)

```
/Users/ys/
├── dev/
│   ├── ai/              ← AI 프로젝트 (Git 관리)
│   │   ├── public-chatbot/
│   │   └── cookie-chatbot/
│   └── blog/            ← GitHub Pages (Git 관리)
│       └── dino92-ys.github.io/
├── models/              ← 모델 파일 (Git 제외, 용량 큰 파일)
└── llama.cpp/           ← 도구류

~/.claude/               ← Claude Code 시스템 폴더 (이동 금지!)
└── CLAUDE.md            ← 전역 설정
```

---

*작성일: 2026.04.04*
