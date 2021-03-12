# Introduction

# Install ans Run

### Ruby 2.7

- If version is not 2.7
  - $ rvm install 2.7
  - $ bundle update —bundler
  - $ bundle install
  - $ bundle update
  - $ npm run start

### CLI

```
$ bundle install
$ bundle update // update dependency
$ bundle exec jekyll serve --livereload
```

## Structure

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
