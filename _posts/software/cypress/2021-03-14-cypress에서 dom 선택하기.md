---
layout: post
category: [posts, sw]
---

<!-- 어플리케이션 로직에서 `dom` 이 몇개 생성 되었는지 또 값이 제대로 들어 있는지 확인 하기 위해 `cy.get()` 을 호출하게 되는데 이때 반환 값이 `native dom`이 아니기 때문에 `dom api`를 사용할 수 없게 된다. -->

# 서론

엘리베이터 TDD 스터디를 시작하게 되었다. UI 테스팅을 자동화하는 것은 쉽지 않은 일이기 때문에 최소한의 테스트를 준비하고자 하였고 이 과정에서 `cypress`를 사용하게 되었다.

`cypress`에서 제공하는 `api`와 `assertion`으로 충분히 테스트를 해볼 수 있지만 `cy.get()`의 반환 값이 `native dom`이 아니기 때문에 `dom api`를 사용할 수 없게 된다.

TDD를 하는 과정에서 `dom api`에 접근해야 할 일이 생기게 되었고 `cypress`에서 `dom`을 얻을 수 있는 다양한 방법에 대해서 이야기 하고자 한다.

# 1. promise-then 사용하기

[공식 문서](https://docs.cypress.io/faq/questions/using-cypress-faq.html#How-do-I-get-the-native-DOM-reference-of-an-element-found-using-Cypress)에서는 아래와 같이 권장하고 있다.

```ts
cy.get(".elevator").then(($el) => {
  console.log($el);
});
```

## promise-then의 단점

테스트 코드는 쉽게 더러워진다. 그렇기에 테스트 코드에도 일정 수준이상의 클린코드가 요구 된다. 하지만 요구되는 방향은 어플리케이션 로직과는 다르다. 개인적으로 테스트코드는 재사용성보다 가독성에 중심을 두고 작성하고 있다.

`promise-then` 문법은 가독성이 많이 떨어진다. 다음으로 이어지는 로직이 계속해서 `indent`를 요구하기 때문에 한눈에 들어오지 않는다. 따라서 `promise-then`은 특별한 이유가 없는 이상 `async-await`로 변경하면 좋겠다.

# 2. async-await 사용하기

그럼 위 1번을 `async-await`로 변경하면 아래와 같다.

```ts
it("assert", async () => {
  const $el = await cy.get(".elevator");
});
```

## async-await의 단점

위 코드는 잘동작하지만 아래와 같은 `eslint` 에러가 발생시킨다. cypress에서 `warning` 또한 발생시킨다.

```text
Type of 'await' operand must either be a valid promise or must not contain a callable 'then' member.ts(1320)
```

`eslint`에러가 발생하는 이유는 `cy.get()`의 반환 타입이 `Promise<T>` 가 아니라 `Chainable<JQuery<E>>`이기 때문이다. 이와 같은 이유로 에디터에서 `intellisense`는 기대할 수 없는 상황이다.

`SO`에도 해당 api를 `await` 가능하게 변경 해달라고 요청이 왔지만 아직 수정되지 않은 모양이다. [StackOverflow Issue](https://github.com/cypress-io/cypress/issues/1417)

# 3. 라이브러리 사용하기 (cypress-promise)

2018년에도 이슈가 올라왔음에도 아직 지원하지 않고 있지만, 누군가 `Wrapper`를 만들었기 해당 래퍼를 사용하면 더 좋겠다.

- https://www.npmjs.com/package/cypress-promise

해당 라이브러리를 사용하면 좋은점은 `eslint` 에러도 깔끔하고 반환 값이 `dom`이기 때문에(정확히는 jquery dom) 에디터에서 `intellisense`의 지원도 기대해 볼만하다.

```ts
import promisify from "cypress-promise";

it("make wrapper", async () => {
  const foo = await promisify(cy.wrap("foo"));
});
```
