---
layout: post
author: asfrom30
title:  "Mocha Test Framework Basic - 1/3"
categories: []
tags: []
---


{: .line-numbers}
```js
var myFunction = function(){
  alert('hello world');
}
```

{: .line-numbers}
```css
p { color: red }
```

{: .command-line data-prompt="c:sandbox>"}
```powershell
a
b
c
d
```

세개의 포스팅에 걸쳐서 mocha framework를 사용하는 법을 정리해 보았다. 첫번째는 커맨드 쉘로 모카를 실행하는 방법을 얘기할 것이고. 두번째는 전역에서 쓸 변수나 config 파일을 등록하는 방법. 세번째는 npm script로 만들고 재사용을 위해서 파일(mocha.opt)로 mocha 설정을 저장하는 법으로 나누어 설명하겠다.

# 두줄의 명령어로 mocha 실행

두줄의 명령어로 mocha test frame work를 구성해보자. 먼저 `mocha`가 global하게 설치되어 있는지 확인한다.

<pre class="command-line" data-src="/assets/posts/sw/mocha-setting-1-3/a.sh" data-prompt="c:sandbox>"><code class="language-powershell">
</code></pre>

제대로 설치가 되었다면 바로 테스트코드를 작성한다. 루트 폴더에 test.js를 만든다.

<pre class="command-line" data-src="/assets/posts/sw/mocha-setting-1-3/b.tree" data-filter-output="#"><code class="language-powershell">
</code></pre>

<pre data-src="/assets/posts/sw/mocha-setting-1-3/c.js"><code class="language-js line-numbers">
</code></pre>

작성한 코드를 바로 돌려보자.

<pre class="command-line" data-src="/assets/posts/sw/mocha-setting-1-3/d.sh" data-prompt="c:sandbox>"><code class="language-powershell"></code></pre>

테스트를 수행하고 녹색불이 뜨는 것을 확인할 수 있다.

# 수정, 저장시 자동으로 갱신하는 옵션 추가

<pre class="command-line" data-src="/assets/posts/sw/mocha-setting-1-3/e.sh" data-prompt="c:sandbox>"><code class="language-powershell"></code></pre>

이제 테스트 파일을 수정하여 저장하면 자동으로 테스트를 수행한다.

# 복수의 파일 테스트 하기
여러개의 테스트 파일이 존재하는 경우 실행하는 옵션은 여러가지가 있다.

### 수동으로 추가하기
```
-- root
    |
    --\ app
         |
         -- test2.js
    |
    -- test.js
```

```
$ mocha test.js app/test2.js
```

### test 폴더 안에 몰아 넣기

```
-- root
    |
    --\ test 
         |
         -- test2.js
         -- test.js
```

```
$ mocha
```

위 명령어는 test 바로 아래에 있는 js 파일들만 테스트를 수행한다. 자식 폴더를 하나 더 만들어 넣어둔 파일은 실행하지 않는다.

### 패턴을 이용하기
몇개의 예제를 통해서 빠르게 원리를 알아보자.

app 폴더 내에 있는 모든 js 파일에 대해서 테스트를 수행한다.

```
-- root
    |
    --\ app 
         |
         -- test2.js
         -- test.js
```

```
$ mocha app/**/*.js
```

위와 같은 경우는 실행하는데 문제가 없겠지만 실제로는 테스트코드가 아닌 소스코드가 섞여 있을 수 있기 때문에 아래와 같이 접미사를 추가한다.

```
$ mocha app/**/*.spec.js
```

```
-- root
    |
    --\ app 
         |
         --\child
              |-- test.spec.js
         -- controller.js
         -- view.js
         -- test2.spec.js
```

폴더의 중첩에 상관없이 테스트를 수행하고. `spec.js`로 끝나는 파일만 테스트를 수행한다.

다음글
이전글