---
layout: post
author: asfrom30
title:  "Mocha Test Framework Basic - 2/3"
dev-category: 'sw'
categories: []
tags: []
---

# 테스트 시작전에 전역변수 등록

테스트를 수행하다 보면 여러 파일에서 공통으로 쓰는 config 파일이나 변수명이 필요하기 마련이고 노드모듈을 매번 `require`하는 불편함도 있다.

이런 코드들은 테스트 시작전에 한번에 전역변수로 등록함으로써 사용하면 코드가 더 깔끔해지고 관리하기 쉬워진다.

전역으로 사용하는 아래와 같은 `config.js`가 필요하다고 해보자.

```js
const config = {
  a: 'a',
  b: 'b',
}
```

아래와 같이 적당한(여기서는 `root/app` 에 위치 시켰다.) 곳에 해당 파일을 위치시키고

```
-- root
    |
    --\ app 
         |
         --\child
              |-- test.spec.js
         -- config.js
         -- controller.js
         -- view.js
         -- test2.spec.js
```

`global.{key}`로 전역변수를 등록한다.

```js
// config.js
const config = {
  a: 'a',
  b: 'b',
}

global.config = config;
```

```
$ mocha app/**/*.spec.js --require app/config.js
```

이제 아래와 같이 config를 불러도 전역에 등록된 config가 출력된다.

```js
// test.spec.js
console.log(config);
```

설명을 위해서 `config.js`라는 파일명을 사용했지만 사실은 `mocha.global.js`나 `mocha.config.js`가 더 좋은 파일명이므로 수정해서 다음과 같이 사용하도록 한다.

```
$ mocha app/**/*.spec.js --require app/mocha.config.js
```
