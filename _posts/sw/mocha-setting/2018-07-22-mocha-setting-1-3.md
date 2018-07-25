---
layout: post
author: asfrom30
title:  "Mocha Test Framework Basic - 1/3"
categories: []
tags: []
---

세개의 포스팅에 걸쳐서 mocha framework를 사용하는 법을 정리해 보았다. 첫번째는 커맨드 쉘로 모카를 실행하는 방법을 얘기할 것이고. 두번째는 전역에서 쓸 변수나 config 파일을 등록하는 방법. 세번째는 npm script로 만들고 재사용을 위해서 파일(mocha.opt)로 mocha 설정을 저장하는 법으로 나누어 설명하겠다.

# 두줄의 명령어로 mocha 실행

두줄의 명령어로 mocha test frame work를 구성해보자. 먼저 `mocha`가 global하게 설치되어 있는지 확인한다.

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha --version
```
제대로 설치가 되었다면 바로 테스트코드를 작성한다. 루트 폴더에 test.js를 만든다.


```powershell
- sandbox 
     |
     └ test.js
```

{: .line-numbers}
```js
// test.js
describe('file is in the root folder', () => {
  it('load success', () => {
  })
});
```

작성한 코드를 바로 돌려보자.

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha test.js
```

테스트를 수행하고 녹색불이 뜨는 것을 확인할 수 있다.

# 수정, 저장시 자동으로 갱신하는 옵션 추가

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha -w test.js
```

이제 테스트 파일을 수정하여 저장하면 자동으로 테스트를 수행한다.

# 복수의 파일 테스트 하기
여러개의 테스트 파일이 존재하는 경우 실행하는 옵션은 여러가지가 있다.

### 수동으로 추가하기
```powershell
- root 
   |
   └ app
   |  |
   |  └ test2.js
   └ test.js
```

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha test.js app/test2.js
```

### test 폴더 안에 몰아 넣기
폴더가 app에서 test로 바뀌었음에 유의한다.

```powershell
- root 
   |
   └ test
      |
      └ test2.js
      └ test.js
```

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha
```
위 명령어는 test 바로 아래에 있는 js 파일들만 테스트를 수행한다. 자식 폴더를 하나 더 만들어 넣어둔 파일은 실행하지 않는다.

### 패턴을 이용하기
몇개의 예제를 통해서 빠르게 패턴을 알아보자.

app 폴더 내에 있는 모든 js 파일에 대해서 테스트를 수행한다.

```powershell
- root 
   |
   └ app
      |
      └ test2.js
      └ test.js
```

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha app/**/*.js
```

위와 같은 패턴을 사용하면 테스트 코드만 폴더에 넣어두었다면 문제가 없겠지만, 구현코드와 테스트코드가 섞여 있는 경우 모두 실행해버리게 된다. 따라서 아래와 같이 접미사를 붙이고, 패턴에서 접미사를 구분하도록 한다. 아래 예제에서는 접미사로 `.spec.js`로 사용하였다.
```powershell
- root 
   |
   └ app
      |
      └ feature
      |    └ test.js
      |    └ test.spec.js
      └ test2.js
      └ test2.spec.js
```

{: .command-line data-prompt="c:sandbox"}
```powershell
mocha app/**/*.spec.js
```

폴더의 중첩에 상관없이 테스트를 수행하고. `spec.js`로 끝나는 파일만 테스트를 수행한다.

다음글
이전글