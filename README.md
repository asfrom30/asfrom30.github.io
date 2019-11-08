# Introduction 
## Setup 

1. install ruby or rvm
* rvm : see confluence
* ruby : install bundle

## Run
```
// develop
$ bundle exec jekyll serve --livereload
```

# Syntax
### Add New Page without api

```
---
layout: default/with-nav
title: My page
permalink: /router/devs/dev-til
---

// direct render with jekyll syntaxk
{ { site.categories.{cateogory name}.size } }

// or inclues html file
{% include_relative index.html %}
```

above `index.md` file will create `new link address`

```
// post.md
---
category: {category name}
---

```

### Add New Page with api

# 고찰

- site.pages
  - 이게 헤더에 선언이 되어 있는데. 아마 생성된 모든 url 링크를 자동으로 헤더에 삽입하는거 같다. 카테고리 별로 되는게 아니고.
  - pagenate를 적용했더니 이게 그냥 계속 늘어난다. /page2 /page3 url에도 네비게이션에 자동으로 삽입된다.

# Next Task

- password organize
- wordlist from iphone anylist app
- dev-posts sorter
- make footer

# Todo

### make footer

### bootstrap or material design

### fetch all post summary and sort by select

- sorting algorithm practice

### Replace `/api/posts` to serve Json feature

- https://arcath.net/2016/02/ajax-page-loading-in-jekyll-or-any-static-site/

# Todo animation

### home-menu

- https://codepen.io/nodws/pen/lahqf



# Todo
-[] cheet sheet에 아이콘 넣기...
-[] 2019년 읽은 책...