# asfrom30 x Jekyll

[Welcome to my blog](https://asfrom30.github.io/)

### Setup and Running

**Setup**

- install rvm
- require ruby 2.7
  - `$ rvm install 2.71`

**Install Dependency**

```sh
$ sh bin/install.sh
```

**Build**

```sh
$ sh bin/build.sh
```

**Livereload**

```sh
$ sh livereload.sh
```

# Structure

### Type of Navigation

- post
  - cf) welcome(welcome.page.html), portfolio, resume...
- router
  - cf) book (book.router.md)
  - see `router-provider` folder
- external link
  - cf) camping location

# For Development

### /index.html

- ~/\_data/router/list.yml
  - url이 없으면 마우스 포인터가 자동으로 변경되는 것 적용해 놓음
  - 외부 링크는 `external: true`를 주면 아이콘이 하나 더 붙게 작업해 놓음.

# For Writing

> Post의 경로는 중요하지 않다. 프론트 매터가 중요함.

# Domain Syntax

### disable footer

```
---
needFooter: false
---
```

# Syntax

### Code block을 리스트 안에 넣으려면

- 인덴트를 2배 주면 된다. 2였으면 4, 4였으면 8

# Managing Project

- github project
  - 기능추가는 `[Style] [Develop] [Content]`로 각각 나누어서 githubㅂ프로젝트에 추가한다.
- 버그
  - 버그는 이슈로 만들어서 1.0.0 프로젝트에 할당한다.
- post 주제는 notion에 할당한다.
