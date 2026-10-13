# 다음에 할 일

2026-10-13 기준. 발행 흐름(초안 저장소 workflow, 날짜 형식 확인, 앱 코드 변경)은 따로 진행한다.

## CMS 배포

- [x] **맥미니에 올리기**: nginx 이미지로 `asfrom30-github-cms` 컨테이너를 띄웠다 (`cms/.sh/build.sh`, `deploy.sh`).
- [x] **Cloudflare Tunnel**: `cms.asfrom30.cloud → http://asfrom30-github-cms:80` 경로를 추가했다.
- [x] **Cloudflare Access**: `cms.asfrom30.cloud`는 `asfrom30@gmail.com`만 들어온다.
- [ ] **cms 저장소 원격 백업**: `cms/`는 로컬 git에만 있다. GitHub에 비공개 저장소로 올릴지 정한다.

## 블로그 정리

- [ ] **push**: 아직 push하지 않은 커밋이 있다 (포트 4040, `.env.example`, 이 문서).
- [ ] **소셜 링크**: X, LinkedIn 주소를 `astro-paper.config.ts`의 `socials`에 넣는다. 푸터 "연락" 칸에 자동으로 나온다.
- [ ] **Role 페이지**: `src/pages/role.astro`에 명세를 쓴다. 지금은 "준비 중입니다."만 있다.
- [ ] **푸터 "전체 글"**: `/posts/`와 Journal(`/journal/`)이 같은 목록이다. 링크를 빼고 칸 이름("글")도 다시 정한다.
- [ ] **"헬로" 글**: 앱 시험용으로 발행된 `src/content/posts/2026-10-13-헬로.md`를 지울지 정한다.
- [ ] **홈 화면**: 지금은 비어 있다. 무엇을 보여 줄지 정한다.
- [ ] **삼성전기 둘째 줄**: 직책("기구설계 선임 엔지니어")과 "자동화 설비 기계 설계"가 겹친다. 줄일지 정한다.
