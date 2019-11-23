# Jekyll livereload in Windows

jekyll update를 먼저 해준다. 3.1에서는 `--livereload` 옵션이 먹지 않는다.

```
// for jekyll 3.1 -> 3.7
$ bundle update
```

이후 livereload 옵션을 줘서 실행하면 아래와 같은 에러가 뜨는데 
```
~~블라블라 require 'em/pure_ruby'
```

이것은 ruby `event machine`이 제대로 깔리지 않아서 그렇다.

```
$ gem uninstall eventmachine
Select gem to uninstall:
 1. eventmachine-1.2.7
 2. eventmachine-1.2.7-x64-mingw32 <-- 이놈이 문제
 3. All versions
```

모든 버전을 삭제하고 아래와 같이 다시 설치한다.
```
$ gem install eventmachine --platform ruby
```

bundle update를 하면 eventmachine이 자동으로 깔릴 수 있는데 그러면 자연스럽게

```
$ gem uninstall eventmachine
Select gem to uninstall:
 1. eventmachine-1.2.7
 2. eventmachine-1.2.7-x64-mingw32 <-- 이놈이 문제
 3. All versions
```

2번만 삭제해도 된다.


# pagination

pagination은 all posts로만 작동한다. 정적 웹페이지이기 때문에 따라서 아래와 같은 케이스는 작동하지 않는다.

```yml
paginate: 2
paginate_path: "/books/page:num/"
paginate_path: "/categories/books/page:num/"
paginate_path: "/mech/page:num"
paginate_path: "/api/pages/page:num"
paginate_path: "/blog/page:num/"
```

아래와 같이 하나에 대해서만 가능하다.

```yml
paginate: 2
paginate_path: "/books/page:num
```

만약 multiple pagination을 하고 싶으면 아래와 repo를 참조한다.

* https://github.com/scandio/jekyll-paginate-multiple