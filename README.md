# Jekyll Set-up
1. Ruby 다운로드
    * https://rubyinstaller.org/downloads/
    * Devkit도 같이 설치
        * devkit이 2.4버전 이상부터는 msys로 통합
        * 참조 : https://rubyinstaller.org/add-ons/devkit.html
1. Ruby Bundler 설치
    ```
    $ gem install bundler
    ```
1. Jeykyll 설치
    ```
    $ gem install jekyll bundler
    ```
1. Init new jekyll
    ```
    $ jekyll new my-awesome-site
    ```
1. 프로젝트 디렉터리이동
    ```
    $ cd my-awesome-site
    ```
1. 번들인스톨 및 실행
    ```
    ~/my-awesome-site $ bundle install
    ~/my-awesome-site $ bundle exec jekyll serve
    ```
# To-be continue
* 테마
    * http://lawfully.kr/smart/jekyll.html#fn:fn2
* 메뉴얼
    * http://jekyllrb-ko.github.io/docs/pages/
* 실행하는법
```
$ bundle exec jekyll serve
```

# 카테고리적용하는법
* 하위 폴더에 `index.html`을 작성하고 포스트를 리스트하는 순환문(Liquid형식)을 작성한다.
    * 하위 폴더에 포스트도 같이 넣게 되면 해당 포스트가 카테고리로 인식한다.
    * 포스트는 포스트 폴더에 얺는다.
* 각 포스트마다 카테고리를 지정한다
    ```
    ---
    layout: post
    title:  "Book B"
    date:   2018-04-21 14:30:43 +0900
    categories: books
    ---
    ```


# 페이지 만드는법


# Frontfomatter
* http://jekyllrb-ko.github.io/docs/frontmatter/

```
----
layout
permalink
published
category
categories
tags
---
```


# 문법
```
{%- assign -%}
{% for post in site.categories.books %} // 제어문
{{}} // 변수
```

# 고찰
* site.pages
    * 이게 헤더에 선언이 되어 있는데. 아마 생성된 모든 url 링크를 자동으로 헤더에 삽입하는거 같다. 카테고리 별로 되는게 아니고.
    * pagenate를 적용했더니 이게 그냥 계속 늘어난다. /page2 /page3 url에도 네비게이션에 자동으로 삽입된다.

# Extras
* custom navigation
    * https://jekyllrb.com/tutorials/navigation/


# Archive

### 모든 페이지 display
```html
{%- for path in page_paths -%}
    {%- assign my_page = site.pages | where: "path", path | first -%}
    {%- if my_page.title -%}
    <a class="page-link" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
    {%- endif -%}
{%- endfor -%}
```


### Permalink
```YAML
---
layout: page
permalink: /categories/
title: Categories
---
```


# Welcome to Jekyll
```html
---
layout: post
title:  "Welcome to Jekyll!"
date:   2018-04-21 14:30:43 +0900
categories: jekyll update
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
```
# Reference
### Github x jekyll
* https://pages.github.com/versions/
### Jekyll 사이트들
* http://jekyllrb-ko.github.io/docs/sites/

