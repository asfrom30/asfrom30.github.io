- [Setup and Running](#setup-and-running)
    - [Environments](#environments)
    - [Install Dependency](#install-dependency)
    - [Livereload](#livereload)
- [Structure](#structure)
    - [Type of Navigation](#type-of-navigation)
- [For Development](#for-development)
    - [/index.html](#indexhtml)
- [For Writing](#for-writing)
- [Domain Syntax](#domain-syntax)
    - [disable footer](#disable-footer)

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

### /index.html

- ~/\_data/router/list.yml
  - url이 없으면 마우스 포인터가 자동으로 변경되는 것 적용해 놓음
  - 외부 링크는 `external: true`를 주면 아이콘이 하나 더 붙게 작업해 놓음.

# For Writing

# Domain Syntax

### disable footer

```
---
needFooter: false
---
```
