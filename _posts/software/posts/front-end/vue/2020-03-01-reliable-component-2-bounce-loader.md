---
layout: post
title: Reliable Component 2편
subtitle: BounceLoader.vue
category: [dev, sw]
tags: [testing]
dev-category: sw
dev-tags: [storybook, vue]
updatedAt:
assetUrl: /assets/posts/2020-03-01-reliable-component-2-bounce-loader
---

# Introduction

[1편 Settings](/dev/sw/2020/03/01/reliable-component-1-settings.html)의 준비가 다 되었다면

이제 준비가 다 되었으니 처음으로 스토리북을 이용해서 컴포넌트를 만들어볼 차례다.

지금 만드는 컴포넌트의 목표는 아래와 같다.

- 선언측에서 색깔을 선언함으로써, 유연한 컴포넌트 만들기
- 스토리북에 컴포넌트 사용법을 기재함으로써, 누구나 해당 컴포넌트에 대해 어떻게 사용하는지 알 수 있게 하기
- 아래는 실제 구현체이다.

```html
<bounce-loader color="green"></bounce-loader>
<bounce-loader color="red"></bounce-loader>
<bounce-loader color="blue"></bounce-loader>
```

![Image]({{page.assetUrl}}/bounce-loader-green.gif)
![Image]({{page.assetUrl}}/bounce-loader-red.gif)
![Image]({{page.assetUrl}}/bounce-loader-blue.gif)

먼저 Code Pen에서 Bounce Loading Effect가 있는 소스코드를 따온다. 우리 예제에서는 애니메이션을 만드는 것이 관심사가 아니기 때문이다.

[https://codepen.io/danielmorosan/pen/XmYBVx](https://codepen.io/danielmorosan/pen/XmYBVx)

이 코드를 참조해서 색깔이 변경되는 Loader를 만들어 볼 것이다.

# BounceLoader.vue

먼저 `BounceLoader.vue` 라는 파일을 만든다. 그리고 위 코드펜의 html, css 부분을 그대로 가져온다. 그렇다면 우리의 컴포넌트는 아래와 같은 모양을 가질 것이다.

```html
<!-- BounceLoader.vue -->

<template>
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #333;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
</style>

스토리북에서 해당 BounceLoader를 표현해보자. // 3-BounceLoader.stories.js import BounceLoader from
'../src/components/BounceLoader.vue'; export default { title: 'Bounce Loader', }; export const Default = () => ({
components: { BounceLoader }, template: `<bounce-loader></bounce-loader>`, });
```

아래와 같이 스토리북에서 아주 잘 표현되는 걸 알 수 있다.

![Image]({{page.assetUrl}}/story-book.png)
![Image]({{page.assetUrl}}/bounce-loader-black.gif)

# 유연한 컴포넌트

아직까지 우리의 컴포넌트는 짙은 회색만 표현 할 수 있다. 여기서 색깔을 바꾸려면 어떻게 해야할까?

유심히 보면 css의 `.spinner > div` 측 속성을 보면 `background-color: #333`으로 고정되어 있음을 알 수 있다. 이 색깔을 변경하면 BounceLoader의 색깔이 변경된다.

하지만 우리가 원하는 컴포넌트는 이것이 아니다. 왜냐하면 해당 BounceLoader의 색깔을 각각 지정해주고 싶은데, 만일 위와 같은 방식으로 변경하게 되면 모두 똑같은 색깔을 띄기 때문이다. 1번 BounceLoader는 빨간색, 2번 BounceLoader는 파란색 상황에 따라 유연하게 색깔을 지정하게 만들고 싶다.

그러려면 #333으로 선언된 저 색깔은 이제 해당 컴포넌트에서 결정하는 것이 아니라 선언하는 측에서 결정해줄 것이다.

즉 `BounceLoader.vue` 에 있는 #333 값은 삭제되고 `<bounce-loader color="#333"></bounce-loader>` 이런식으로 작성할때 넣어 줄 것이다.

# 색깔 입히기

따라서 해당 Component의 `template` `script` `style` 코드를 다음과 같이 변경한다.

```diff
<template>
  <div class="spinner">
+    <div class="bounce1" :style="{ 'background-color': color }"></div>
+    <div class="bounce2" :style="{ 'background-color': color }"></div>
+    <div class="bounce3" :style="{ 'background-color': color }"></div>
  </div>
</template>

...

.spinner > div {
  width: 18px;
  height: 18px;
-  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

...

<script>
+ export default {
+  props: {
+    color: String
+  }
+ };
</script>
```

# 스토리 확인

- 스토리북에 다음과 같은 코드를 추가하면

```js
export const ColorRed = () => ({
  components: { BounceLoader },
  template: `<bounce-loader color="red"></bounce-loader>`,
});

export const ColorGreen = () => ({
  components: { BounceLoader },
  template: `<bounce-loader color="green"></bounce-loader>`,
});

export const ColorBlue = () => ({
  components: { BounceLoader },
  template: `<bounce-loader color="blue"></bounce-loader>`,
});
```

- 다음과 같이 결과가 나온다.

![Image]({{page.assetUrl}}/story-book--color-red.png)
![Image]({{page.assetUrl}}/bounce-loader-red.gif)
![Image]({{page.assetUrl}}/bounce-loader-green.gif)
![Image]({{page.assetUrl}}/bounce-loader-blue.gif)

# 모든 소스코드는 다음과 같다.

```html
// BounceLoader.vue

<template>
  <div class="spinner">
    <div class="bounce1" :style="{ 'background-color': color }"></div>
    <div class="bounce2" :style="{ 'background-color': color }"></div>
    <div class="bounce3" :style="{ 'background-color': color }"></div>
  </div>
</template>

<script>
  export default {
    props: {
      color: String,
    },
  };
</script>

<style scoped>
  /*Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */
  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: rgb(0, 0, 0);

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
</style>
```

```js
// 3-BounceLoader.stories.js

import BounceLoader from '../src/components/BounceLoader.vue';

export default {
  title: 'Bounce Loader',
};

export const Default = () => ({
  components: { BounceLoader },
  template: `<bounce-loader></bounce-loader>`,
});

export const ColorRed = () => ({
  components: { BounceLoader },
  template: `<bounce-loader color="red"></bounce-loader>`,
});

export const ColorGreen = () => ({
  components: { BounceLoader },
  template: `<bounce-loader color="green"></bounce-loader>`,
});

export const ColorBlue = () => ({
  components: { BounceLoader },
  template: `<bounce-loader color="blue"></bounce-loader>`,
});
```

# 왜 스토리북이야?

여기까지 읽었으면 그냥 개발하면되지 왜 스토리북을 사용해야 하는거지? 라는 생각이 들 수 있을 것 같다.

스토리북을 사용한 개발 방식의 장점은 다음과 같다.

- 컴포넌트의 한계와 책임을 쉽게 알 수 있다는 점이다.
  - 우리가 만든 컴포넌트는 rgb color를 지원할까? 그렇다면 그냥 한번 호출해보자. `<bounce-loader color="rgb(180, 180, 180)"></bounce-loader>`
- 컴포넌트 규격에 대해서 쉽게 알 수 있다.
  - 해당 컴포넌트를 어떻게 호출해야 되는지 소스코드 여기저기를 돌아다니면서 볼 필요가 없다. 모든 속성과 호출방식은 스토리북에 나와 있으며, 값을 쉽게 바꾸면서 어떤 방식으로 동작하는지 쉽게 알 수 있다.
  - 또 현재는 color에 대한 attribute 하나만 사용했지만 attribute의 개수가 많아지고 이벤트도 바인딩 하게 되면 Component의 규격이 복잡해진다. 만약 스토리북으로 작성하지 않았다면 해당 Component의 규격은 안의 코드를 봐야 파악이 될 수 있다.
- 속성값을 시각적으로 확인하고 한 곳에서 확인할 수 있다.
- 위에서 확인한 모든 것들을 남길 수 있다. 즉 Component를 만들면 혼자 테스팅하고 끝내는 것이 아니라 다른 사람도 알 기 쉽게 문서로 만들게 되는 장점이 있다.
- 이외에도 해당 컴포넌트의 정의나 호출하는 방법에 대해서 고민해보게 되는 장점이 있다.

다음 시간에는 이벤트를 바인딩하는 개발을 스토리북위에서 해보도록 하겠다.
