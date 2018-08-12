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
$ bundle exec jekyll serve --livereload
```

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