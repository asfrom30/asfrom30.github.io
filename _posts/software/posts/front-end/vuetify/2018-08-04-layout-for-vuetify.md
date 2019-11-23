---
layout: post
author: asfrom30
title: Vuetify Layout Master
slug:  
dev-category: 'sw'
dev-tags: ['front-end', 'vue', 'vuetify'] 
categories: [dev, 'software']
tags: []
---

# 들어가기전
시작하기전에 vuetify grid system에 대해서 간단하게 설명하자면

* vuetify의 grid system 역시 1행을 12등분하여 사용한다.
<img src="/assets/posts/2018/08/04/grid-12.png">
* Vuetify의 grid system은 세개의 요소로 구성되어 있다.
  * `v-container` `v-layout` `v-flex`
* `v-container`는 최상단에 하나만 선언해줘도 된다.
* `v-layout`은 1행을 담당한다.(가로로 한줄), 1행은 12등분하여 사용한다.
* `v-flex`는 `v-layout`을 구성하는 요소이고 크기를 선언하여 사용한다.
 * `<v-flex xs3>` 크기 3을 먹는다. (12등분에 크기 3이면 1/4, width:25%와 동일하다)
* `<v-flex>`에 크기를 지정하지 않으면 `<v-flex x12>`와 동일하다
* 좀더 자세히 알고 싶으면 document를 참조하면 좋겠다. [link](https://vuetifyjs.com/en/layout/grid)

# What is row wrap
row wrap은 v-layout에서 사용하는 옵션인다. 다음과 같이 사용한다.

```html
<v-layout row wrap></v-layout>
```

그럼 어떤 효과를 가져오는 것일까?

```html
<v-layout class="border-red" row wrap>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
</v-layout>
```

```html
<v-layout class="border-red">
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
</v-layout>
```

xs3의 합산개수가 12개가 되면 row wrap과 none row wrap의 레이아웃 결과는 동일하다.
<img src="/assets/posts/2018/08/04/row-wrap-vs-none-xs3-4-item.png">

하지만 여기서 v-flex를 하나씩 더 추가하면 전체 크기는 15로 12개를 넘어간다 여기서 row wrap과 none row wrap의 차이가 발생한다.

```html
<v-layout class="border-red" row wrap>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
</v-layout>
```

```html
<v-layout class="border-red">
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
  <v-flex class="item border-blue" xs3></v-flex>
</v-layout>
```

<img src="/assets/posts/2018/08/04/row-wrap-vs-none-xs3-5-item.png">

row wrap은 내부 item의 width를 변경하지 않고 유지하기 위해 100%가 넘어가면 v-layout의 height 값을 키운다. 반대로 none row wrap은 아이템의 크기를 축소시켜 강제로 1행에 모두 담아낸다. 따라서 xs3으로 선언했지만 실제로는 그보다 작은 것이다.

즉 
* none row wrap= `<v-layout></v-layout>` = 내부 아이템이 overflow 되어도 1 행으로 고정
* row wrap = `<v-layout></v-layout row wrap>` 내부 아이템이 overflow 될시 다중행으로 전환


### 어디에 쓸까

개인적인 생각으로는 컨텐츠가 동적으로 플레이팅 되는 경우. 즉 아이템의 개수가 불확실한 경우(게시판 글수, 사진 개수, 리스트 등)에는 row wrap 옵션을 주는게 좋은것 같다. 그리고 아이템의 개수가 항상 확실한 레이아웃의 경우(버튼 배치, 메뉴바 배치) 등은 row wrap 옵션을 사용하지 않는다.

# `<v-layout column></v-layout>`

v-layout에 column 옵션을 주면 둘다 동일하게 xs3은 속성이 필요가 없어지고 수직으로 배치가 된다.
```html
<h1>-. column</h1>
<v-layout class="border-red" column>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
  <v-flex class="row-wrap-item border-blue" xs3></v-flex>
</v-layout>
```

<img src="/assets/posts/2018/08/04/v-layout-column.png">

# Pattern 1

실제로 쓰게 되면 위의 예제들처럼 v-layout -> v-flex 의 구조만 가지게 되지 않는다. v-layout -> v-flex -> ... -> v-layout -> v-flex 자주 체이닝하게 되고 그럴때마다 레이아웃이 망가지면 괜히 짜증이 난다. 몇가지 패턴을 통해 의도한 대로 레이아웃이 나오게 해보자.

```html
<v-flex xs3>
  <v-layout class="border-blue" column>
    <v-flex> Top </v-flex>
    <v-flex> Bottom </v-flex>
  </v-layout>
</v-flex>
<v-flex xs3>
  <v-layout class="border-blue" column>
    <v-flex> Top </v-flex>
    <v-flex> Bottom </v-flex>
  </v-layout>
</v-flex>
```

<img src="/assets/posts/2018/08/04/pattern-1.png">



주의할점은 아래와 같이 v-layout에 xs3 너비를 준다고 해서 작동하지 않는다는 것이다. 반드시 v-flex로 줘야 제대로 레이아웃이 나오고 v-layout은 암묵적으로 100%를 얘기한다.
```html
<v-layout class="border-blue" column xs3>
        <v-flex> Top </v-flex>
        <v-flex> Bottom </v-flex>
      </v-layout>
      <v-layout class="border-blue" column xs3>
        <v-flex> Top </v-flex>
        <v-flex> Bottom </v-flex>
      </v-layout>
```


# Pattern 2
```html
<v-layout class="border-red" justify-space-between>
  <v-flex xs3>
    <v-layout class="border-red" justify-space-between>
      <v-flex class="border-blue" xs4>
        <v-layout class="border-blue" column>
          <v-flex> Left Top </v-flex>
          <v-flex> Left Btm </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="border-blue" xs4>
        <v-layout class="border-blue" column>
          <v-flex> Left Top </v-flex>
          <v-flex> Left Btm </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
  <v-flex xs3>
    <v-layout class="border-blue" column>
      <v-flex> Top </v-flex>
      <v-flex> Bottom </v-flex>
    </v-layout>
  </v-flex>
</v-layout>
```

<img src="/assets/posts/2018/08/04/pattern-2.png">


# 참고

###  v-container 에는 이미 margin 값이 들어가 있다.

```css
@media only screen and (max-width: 959px) .container {
  padding: 16px;
}
```

```html
  <v-container class="border-green">
    <v-layout class="border-red">

    </v-layout>
  </v-container>
```
<img src="/assets/posts/2018/08/04/v-container-margin.png">

# Refs
### Codes
* 해당 코드의 레파지토리는 [link](https://github.com/asfrom30/env-preset-vuetify/tree/2018-08-04-layout-for-vuetify)