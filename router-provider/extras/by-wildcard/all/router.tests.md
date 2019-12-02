---
layout: router
permalink: /router/tests
needFooter: false
---

<div class="layout--center-focused">
<div markdown="1">
<h1>Text Indentation</h1>
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<h5>h5</h5>

<h1>Inline Code <code>Hightlight</code></h1>
만약에 <code>code</code>

<h1>Unorder List</h1>
- hello
  - hello
- hello
- hello
- hello `asd`

<h1>Order List</h1>
1. hello
  1. hello
  1. hello
  1. helllo
    1. hello
2. hllo

<h1> a Link</h1>

- See more Details [Link](qwerasdf)
- <a href="">HELLO</a>

typeof 연산자는 typeof null 을 “object”라고 판단하는데, 이런 행동은 버그라고 해도 할 말이 없습니다. null 은 당연히 객체가 아니라 원시 값입니다. typeof null 이 “object”라고 판단하는데 이런 행동은 버그라고 해도 할말이 없습니다. [null 은 당연히 객체가 아니라 원시 값입니다](). typeof null 이 “object”를 반환한다는 사실을 이용하는 코드가 너무 많이 생겨서 이제는 돌이킬 수 없게 됐고, 명세에 수록됐으므로 바꿀수도 없습니다.

typeof 는 배열과 배열 아닌 객체도 정확히 구분하지 못합니다. 함수(객체의 특별한 타입)는 정확히 식별하지만, typeof []는 “object”를 반환합니다.

안녕하세요

</div>
</div>
