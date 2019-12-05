---
layout: post
title: Promise.all() vs Promise.allSettled()
subtitle: 실패까지 모두 수용하는 Promise.all()
category: [dev, sw]
tags:
dev-category: sw
dev-tags: [javascript, es6]
updatedAt:
---

여러개의 `Promise`를 모아서 사용해야할 때 보통 아래와 같은 패턴을 많이 사용하고 있었다.

```js
const p1 = asyncRequest();
const p2 = asyncRequest();
const p3 = asyncRequest();

Promise.all([p1, p2, p3])
  .then(() => console.log("resolved"))
  .catch(() => console.log("rejected"));
```

문제는 p1, p2, p3의 `promise`를 처리하는 경우 셋 중 하나라도 에러가 발생하면 다른 `catch`쪽으로 떨어지게 된다. 예를 더 자세하게 들자면, p1에서 에러가 나면 p2, p3을 제대로 처리했더라도 p2, p3의 응답 값을 알 수 없게 되어버린다.

간혹 클라이언트 측에서 `Promise`체인이 길어지는 경우 이를 한번에 처리하기 위해서 묶어서 요청을 보내지만, 응답 값이 독립적이라면 실패는 실패대로 두고 성공한 결과값이라도 받아서 처리해야 하는 경우가 있다. 이럴 때는 `Promise.all()`이 아닌 `Promise.allSettled()`를 사용해야 한다.

다만 `Promise.allSettled()`는 아직 [`TC39 Stage 4 Draft` 단계](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)이므로 이와 비슷한 라이브러리인 `Q`를 설치해서 사용하도록 하겠다.

```bash
$ npm i q
```

```js
const Q = require("q");

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1:resolve"), 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("p2:rejct"), 1000);
});

Q.allSettled([p1, p2])
  .then(results => console.log(("resolve": results)))
  .catch(err => console.log("rejected", err));
```

`allSetteled`를 사용하게 되면 제어흐름이 catch로 흐르지 않게 되고 `then`으로 빠진다. 심지어 `p1`, `p2`가 모두 `reject`된 경우에도 `then`으로 빼준다. 기대되는 예상값은 아래와 같다.

```js
// expected output
[
  { state: "fulfilled", value: "p1-resolve" },
  { state: "rejected", reason: "p2-reejct" }
];
```

이터레이션을 돌면서 `state`상태에 따라서 적절히 값을 가공하여 사용하면 되겠다.

> `Promise.all()`은 `and`조건 `Promise.allSettled()`는 `or` 조건으로 기억하자!!
