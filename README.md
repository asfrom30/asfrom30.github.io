- [Setup and Running](#setup-and-running)
    - [Environments](#environments)
    - [Install Dependency](#install-dependency)
    - [Livereload](#livereload)
- [Structure](#structure)
    - [Type of Navigation](#type-of-navigation)
- [For Development](#for-development)
    - [최상위 템플릿](#최상위-템플릿)
    - [최상위 템플릿에서 전역 css 삽입하기](#최상위-템플릿에서-전역-css-삽입하기)
    - [/index.html](#indexhtml)
- [For Writing](#for-writing)
- [Domain Syntax](#domain-syntax)
    - [disable footer](#disable-footer)
- [Syntax](#syntax)
    - [Code block을 리스트 안에 넣으려면](#code-block을-리스트-안에-넣으려면)

# Setup and Running

### Environments

- install rvm
- require ruby 2.7
  - `$ rvm install 2.71

### Install Dependency

```
$ sh install.sh
```

### Livereload

```
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

### 최상위 템플릿

- 경로 `_layouts/atomics/root.html`
  - JAVA의 최상위 Object 처럼 이곳이 최상위 템플릿이 된다.
  - 다른 레이아웃도 최상위 레이아웃을 상속 받을 수 있다.
    - 프론트매터에 다음과 같이 선언 : `layout: atomics/root`
  - post에서도 상속 받을 수 있다.
    - 프론트매터에 다음과 같이 선언 : `layout: atomics/root`

### 최상위 템플릿에서 전역 css 삽입하기

- 모든 css, js, images 경로는 projectRoot/assets로 한다.
- 최상위 템플릿의 `head` 태그에 삽입한다.
- head-tag.html 보기
  - app.css
  - common.css

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
