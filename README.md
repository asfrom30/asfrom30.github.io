# Introduction

## Setup

1. install ruby or rvm

- rvm : see confluence
- ruby : install bundle

## Update Pacakge

```bash
$ bundle install
```

## Run

```
// develop
$ bundle exec jekyll serve --livereload
```

## CLI

```
$ bundle update // update dependency
```

# DashBoard

- `/dashboard`

# Structure

### Type of Navigation

- post
  - cf) welcome(welcome.page.html), portfolio, resume...
- router
  - cf) book (book.router.md)
  - see `router-provider` folder
- external link
  - cf) camping location

# Todo

- [x] make footer
- [ ] router 정리하기...
- [ ] flow of thought는 가벼운 포스트로 변경하기
- [ ] cheet sheet에 아이콘 넣기...
- [ ] 2019년 읽은 책 정리하기
- [ ] h1, h2, h3 인덴트 넣기
- [ ] [transparent list 스타일 적용 고민](https://codepen.io/nodws/pen/lahqf)
- [ ] bootstrap or material design
- [ ] fetch all post summary and sort by select
  - sorting algorithm practice
- [ ] Replace `/api/posts` to serve Json feature
  - https://arcath.net/2016/02/ajax-page-loading-in-jekyll-or-any-static-site/
- [ ] 폰트 템플릿 하일라이트 수정
  - 특히 \*뒤에 `` 안먹히는 것.
- [ ] Quotes 만들기
  - https://jekyllrb.com/docs/includes/#passing-parameters-to-includes
  - Atomic 스타일임
  - 이걸 사용하게 되면 md 내에서 자유롭게 include quote해서 스타일을 수정할 수 있겠다.
- timelinejs를 resume에 반영하기.
  - 구글 스프레드시트로 실시간 반영하기
- 크로스브라우징 대응 css vendor prefix
- All posts, By Tags, By Categories
  - 지금은 하드웨어 밑에 있음
  - 모든 포스트는 그냥 다 보여주기식으로 나열해야됨.
- Impl Style And Feature Testing (url : /router/tests) (\_posts/tests) (router_provider/tests)
- 404 수정하기
- Footer에 wiki 아이콘 만들고 링크 넣기
- router 헤더 스타일 주기....
- Add emoji to home.html
- [ ] smooth scroll
- 변경을 생각하면 til을 collection으로 다 묶는게 좋을것 같다. 만약 레이아웃이나 형식이 변한다면? 그낭 task-runner를 사용해도 될거 같은데.
- `<a class="u-url" href="{{ page.url | relative_url }}" hidden></a>` <-- what is this.
- [ ] Book Card에 grid view 적용할 것.

# Next Task

- password organize
- wordlist from iphone anylist app
- dev-posts sorter

# 깨달은 점 (need to move to confluence wiki)

- site.pages
  - 이게 헤더에 선언이 되어 있는데. 아마 생성된 모든 url 링크를 자동으로 헤더에 삽입하는거 같다. 카테고리 별로 되는게 아니고.
  - pagenate를 적용했더니 이게 그냥 계속 늘어난다. /page2 /page3 url에도 네비게이션에 자동으로 삽입된다.

# BUG

### 아래 렌더링 이상하게 됨 p 태그가 삽입됨

Nested list 일 때 생기는 버그 아래 리스트가 하나 더 붙으면

```md
## Multi

- ## Multi

  -

- Multi
```

위에 것이 포매팅이 아래와 같이 된다.

```md
## Multi

- Multi

  ## -

- Multi
```

따라서 `<br>` 태그를 삽입해서 포매팅을 방지하자

```md
## Multi

- ## Multi
  -

<br/>

- Multi
```
