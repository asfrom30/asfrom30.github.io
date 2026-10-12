# asfrom30.github.io

김도윤의 블로그. [AstroPaper](https://github.com/satnaing/astro-paper) v6.1.0(MIT)을 바탕으로 [lethain.com](https://lethain.com) 같은 글 중심 구성으로 손봤다.

## 글 쓰기

`src/content/posts/`에 마크다운 파일을 추가한다.

```md
---
title: 글 제목
pubDatetime: 2026-10-12T09:00:00+09:00
description: 목록과 공유 미리보기에 보일 한 줄 설명
tags: [blog]
featured: true # 인기 글에 넣기 (선택)
draft: true # 초안: 사이트에 안 보임 (선택)
---
```

## 명령

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # dist/ 생성 (astro check + 검색 색인 포함)
```

`main`에 push하면 `.github/workflows/deploy.yml`이 GitHub Pages로 배포한다.

## 바꾼 것 (AstroPaper 대비)

- 한국어 UI(`src/i18n/lang/ko.ts`), 서울 시간대, 날짜 `YYYY년 M월 D일`
- 본문 글꼴 Pretendard(CDN), 코드는 Google Sans Code
- 글 페이지: 제목 아래 태그(글 수), 글 아래 저자 소개 · RSS 안내 · 인기/최근/관련 글
- `/popular` 인기 글 페이지(`featured: true`)
- 동적 OG 이미지 끔(한글 글꼴 문제) → `public/default-og.jpg`
