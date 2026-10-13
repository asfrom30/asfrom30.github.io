# ADR 0001: 초안 저장소를 거쳐 발행하는 구조

- 날짜: 2026-10-13
- 상태: 채택

## 배경

- 글을 웹과 모바일 어디서든 쓰고 싶다. 그래서 초안을 기기가 아니라 원격에 둬야 한다.
- 블로그 저장소(`asfrom30.github.io`)는 무료 GitHub Pages를 쓰려고 공개로 둔다. 여기에 초안을 커밋하면 사이트에는 안 나와도 GitHub에서 누구나 읽을 수 있다.
- GitHub Pages는 정적 사이트라서 "나만 쓰는 경로"를 만들 수 없다.

## 결정

초안은 비공개 저장소에 두고, 발행할 때만 공개 저장소로 옮긴다. 옮기는 일은 비공개 저장소의 GitHub Actions만 한다.

| 저장소 | 공개 | 역할 |
| --- | --- | --- |
| `asfrom30/asfrom30.github.io.draft` | 비공개 | 초안 보관(`journal/`, `service/`), 발행 workflow |
| `asfrom30/asfrom30.github.io` | 공개 | 사이트 코드와 발행된 글, 배포 workflow |

편집 도구는 두 가지다.

- **웹:** `cms/`의 Sveltia CMS. 맥미니의 nginx 컨테이너를 `cms.asfrom30.cloud`(Cloudflare Tunnel + Access)로 서빙한다.
- **모바일:** `app/`의 PocketBlog 앱

## 1. md 파일이 발행되기까지

```
 Sveltia CMS (웹)            PocketBlog (모바일)
   CMS PAT                     모바일 PAT
        \                        /
         ▼                      ▼
 asfrom30.github.io.draft (비공개)
   journal/2026-10-13-제목.md   publish를 켜거나 끄고 저장
         │ main에 push
         ▼
 .github/workflows/publish.yml
   ① 모든 초안을 읽고 publish 값에 맞춰 할 일을 정한다
      (publish: true인데 필수 칸이 비었거나 draft 칸이 있으면 아무것도 안 하고 실패)
   ② publish: true → publish·publishedAt 칸을 빼고 공개 저장소의 같은 이름 파일로 쓴다
        journal/ → src/content/posts/
        service/ → src/content/services/
      publish: false + publishedAt 있음 → 공개 저장소에서 파일을 지운다 (발행 취소)
   ③ 공개 저장소에 바뀐 게 있으면 push한다 (deploy key)
   ④ 처음 공개한 초안에는 publishedAt을 쓰고, 취소한 초안에서는 지워서 push한다 (GITHUB_TOKEN)
         │
         ▼
 asfrom30.github.io (공개)
   .github/workflows/deploy.yml → 빌드 → GitHub Pages
         ▼
 https://asfrom30.github.io
```

- **초안 형식:** 맨 위 정보 칸은 공개 저장소의 스키마(`src/content.config.ts`)와 같다. 그래서 옮길 때 변환하지 않고 발행용 칸만 뺀다. 자세한 형식은 초안 저장소의 `README.md`에 있다.
- **상태값은 `publish` 하나:** "공개 상태여야 하는가"를 뜻한다. CMS와 앱만 바꾸고 workflow는 바꾸지 않는다. 초안 저장소의 파일은 모두 초안이라 `draft` 칸을 쓰지 않는다. 공개 저장소에 들어간 파일은 사이트에 안 보여도 GitHub에서 누구나 읽을 수 있으므로, `draft` 칸이 있는 초안은 workflow가 옮기지 않는다.
- **`publishedAt`:** 상태가 아니라 처음 공개된 시각 기록이다. workflow만 쓴다. `publish: false`인데 `publishedAt`이 있으면 "공개된 적이 있는데 지금은 꺼짐"이라 발행 취소로 처리한다.
- **수정과 취소:** 발행한 글을 고쳐 저장하면 공개 글도 따라 바뀐다. `publish`를 끄고 저장하면 공개 저장소에서 파일이 지워진다. 지운 글도 공개 저장소의 git 기록에는 남는다(감수하기로 함).
- **날짜:** CMS는 `pubDatetime`을 `+09:00`을 붙여 저장한다(`input_timezone: Asia/Seoul`). 블로그 스키마는 따옴표 친 날짜 문자열도 받도록 `z.coerce.date()`를 쓴다.

## 2. 비밀값

| 비밀값 | 어디에 | 닿는 곳 | 권한 |
| --- | --- | --- | --- |
| CMS PAT | CMS를 연 브라우저의 localStorage | 초안 저장소 (공개 저장소는 읽기만 필요) | Contents 읽기/쓰기 |
| 모바일 PAT | 앱의 보안 저장소 | 초안 저장소 (공개 저장소는 발행된 글 목록을 읽을 때만) | Contents 읽기/쓰기 |
| `PUBLIC_REPO_DEPLOY_KEY` | 초안 저장소 Actions secret (비밀 키). 공개 키는 공개 저장소의 Deploy keys | 공개 저장소 | 쓰기 |
| `GITHUB_TOKEN` | Actions가 실행마다 자동으로 발급 | 초안 저장소 | `contents: write` |
| `SECRET_PRIVATE_DRAFT_REPO_PAT` | 블로그 루트 `.env` (git 제외) | 지금은 두 저장소 | Contents 읽기/쓰기. 로컬에서 확인·시험할 때만 쓴다 |

### 왜 이렇게 나눴나

- **편집 도구는 초안 저장소만 만진다.** PAT가 새거나 기기를 잃어버려도 그 토큰으로는 공개 블로그를 바꿀 수 없다. 공개 블로그는 workflow를 거쳐야만 바뀐다.
- **공개 저장소에 쓰는 열쇠는 deploy key 하나다.** 계정이 아니라 공개 저장소 하나에 묶이고 만료가 없다. 그래서 PAT 권한을 줄이거나 다시 발급해도 발행이 멈추지 않는다.
- **초안 저장소에 다시 쓸 때는 `GITHUB_TOKEN`을 쓴다.** 따로 관리할 열쇠가 없고, 이 토큰으로 한 push는 workflow를 다시 부르지 않아서 무한 반복이 생기지 않는다. 반면 deploy key로 공개 저장소에 한 push는 배포 workflow를 부른다.
- **기기마다 PAT를 따로 둔다.** 잃어버린 기기의 토큰만 폐기하면 된다.
- **CMS 페이지에는 외부 스크립트를 두지 않는다.** PAT가 localStorage에 있으므로 Sveltia를 npm에서 번들하고 CSP로 GitHub API 외의 접속을 막는다. 블로그와 다른 주소(`cms.asfrom30.cloud`)에 둬서 localStorage도 섞이지 않게 한다.
- **발행 규칙은 workflow 한 곳에만 있다.** CMS와 앱은 `publish` 칸만 바꾸므로 두 클라이언트의 규칙이 어긋나지 않는다.
- **`publish`를 일회성 신호가 아니라 "원하는 상태"로 둔다.** 처음에는 workflow가 발행 후 `publish`를 `false`로 되돌렸는데, 그러면 "발행이 끝나서 꺼진 것"과 "취소하려고 끈 것"을 구분할 수 없었다. 상태로 두면 웹과 앱 모두 `publish` 하나로 발행·수정·취소를 할 수 있다. Sveltia CMS는 저장소를 하나만 다루므로, 공개 저장소 파일을 클라이언트가 직접 지우는 방식으로는 웹에서 취소할 수 없다.

## 검토했지만 고르지 않은 것

- **공개 저장소에 `draft: true`로 커밋:** 사이트에는 안 나와도 원본이 공개된다.
- **블로그 저장소 자체를 비공개로:** 비공개 저장소의 Pages는 유료이고, 사이트는 여전히 공개다.
- **CMS와 앱이 각자 공개 저장소로 옮기기:** 두 저장소에 쓰는 일이라 중간에 실패할 수 있고, 같은 규칙을 두 코드에 따로 둬야 한다. 오픈소스 CMS에는 다른 저장소로 옮기는 기능도 없다.
- **중개 서버에 PAT를 두고 클라이언트는 서버만 부르기:** 가장 깔끔하지만 서버를 만들고 운영해야 한다. 나중에 필요하면 맥미니에서 이 구조로 옮길 수 있다.
- **Actions에서 PAT 쓰기:** 만료 관리가 필요하고, PAT 권한을 바꾸면 발행이 멈춘다.
