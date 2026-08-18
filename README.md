# Dino's AI Garden

데이터 엔지니어링 경험과 AI/ML 학습·프로젝트 과정을 기록하는 개인 기술 블로그입니다.
단순한 기술 목록보다 문제, 선택의 이유, 구현 과정, 검증 결과와 배운 점을 남기는 것을 목표로 합니다.

## 기술 구성

- 정적 사이트 생성기: [Quartz v4](https://quartz.jzhao.xyz/)
- 콘텐츠 형식: Markdown
- 배포: GitHub Actions와 GitHub Pages
- 기본 언어: 한국어

## 콘텐츠 구조

- `content/projects/`: 프로젝트 포트폴리오
- `content/blog/`: 기술 글과 회고
- `content/notes/`: 주제별 학습 노트
- `content/templates/`: 발행하지 않는 문서 템플릿

## 로컬 실행

Node.js 22 이상과 npm 10.9.2 이상이 필요합니다.

```powershell
npm ci
npx quartz build --serve
```

정적 결과물만 생성하려면 다음 명령을 사용합니다.

```powershell
npx quartz build
```

생성된 `public/` 디렉터리는 Git으로 관리하지 않습니다.

## 글 작성과 발행

1. 새 글은 `draft: true` 상태로 작성합니다.
2. 사실, 출처, 공개 범위와 링크를 검토합니다.
3. `npx quartz build`로 렌더링 오류를 확인합니다.
4. 공개 준비가 끝나면 `draft: false`로 변경합니다.
5. `main` 브랜치에 반영된 변경은 GitHub Actions를 통해 GitHub Pages로 배포합니다.

기존 글은 현재 기준으로 다시 검토하고 있으며, 검토가 끝난 글부터 순차적으로 공개합니다.

## Quartz 및 라이선스

이 블로그는 Quartz v4를 기반으로 제작했습니다. Quartz 원본 코드의 라이선스는 [LICENSE.txt](./LICENSE.txt)를 따릅니다.
