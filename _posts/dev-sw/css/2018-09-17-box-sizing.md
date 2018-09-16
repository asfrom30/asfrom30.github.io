---
layout: post
title: li tag에서 box-sizing 설정으로 overflow 해결하기
category: [dev, sw]
tags:
dev-category: sw
dev-tags: [css3]
updatedAt: 
---

# 현상

Css reset을 위해 [meyerweb reset css code](https://meyerweb.com/eric/tools/css/reset/)를 사용하면 `<li>` tag들이 indent가 하나도 되어 있지 않다.

indent를 만들어주기 위해서 아래 스타일을 적용하면
```css
li {
  padding-left: 1em;
}
```

list에 indent는 생기지만 브라우저의 x축으로 스크롤이 생기게 된다. 디버그 모드에서 요소검사를 해보면 `<li>` 태그의 width가 100%를 넘기 때문인데 이는 list의 width 100%와 padding-left가 더해졌기 때문이다.

이를 해결하기 위해 기존 width 값을 계산할 때 padding값도 포함한 값으로 변경해주는 속성을 적용해야 한다. 해당 속성은 css3에서 `box-sizing`이며 아래와 같이 속성을 추가한다.

* [Mozilla ref](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)

```css
li {
  padding-left: 1em;
  box-sizing: border-box;
}
```
