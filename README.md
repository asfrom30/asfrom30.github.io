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
    $ gem install jekyll
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
# Jekyll excutes
```
$ bundle exec jekyll serve
```

# 고찰
* site.pages
    * 이게 헤더에 선언이 되어 있는데. 아마 생성된 모든 url 링크를 자동으로 헤더에 삽입하는거 같다. 카테고리 별로 되는게 아니고.
    * pagenate를 적용했더니 이게 그냥 계속 늘어난다. /page2 /page3 url에도 네비게이션에 자동으로 삽입된다.

# Reference
### Liquid
* https://github.com/Shopify/liquid
* https://shopify.github.io/liquid/

### Jekyll
* https://devhints.io/jekyll
* https://blog.webjeda.com/
* https://jekyllrb.com/docs/plugins/
* http://jekyllrb-ko.github.io/docs/collections/
* http://jekyllrb-ko.github.io/docs/sites/

### Github x jekyll supported plugins
* https://pages.github.com/versions/


### 참고한 글들
* http://blog.jeonghwan.net/2016/02/07/jekyll-customizing.html
* http://blog.jeonghwan.net/2016/02/29/jekyll-tag.html
* https://jamiekang.github.io/2017/04/28/add-tag-support/
* https://nolboo.kim/blog/2014/01/09/upgrade-jekyll-github-blog/
* http://blog.saltfactory.net/upgrad-github-pages-dependencies-in-jekyll/



# Code Styler with Prism.js

```html
<pre><code class="language-js">
...
</code></pre>
```

```html
<pre data-src=""></pre>
```
### Power shell

```html
<pre class="command-line" data-user="" data-host="" data-src=""><code class="language-powershell">
</code></pre>
```

### Bash
```html
<pre class="command-line" data-user="" data-host="" data-src=""><code class="language-bash">
</code></pre>
```


# Todo

### bootstrap or material design


### fetch all post summary and sort by select
* sorting algorithm practice


### Replace `/api/posts` to serve Json feature
* https://arcath.net/2016/02/ajax-page-loading-in-jekyll-or-any-static-site/



# Todo animation
### home-menu
* https://codepen.io/nodws/pen/lahqf