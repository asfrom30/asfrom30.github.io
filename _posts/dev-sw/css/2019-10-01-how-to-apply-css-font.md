---
layout: post
title: Css Font를 적용하는 방법
category: [dev, sw]
tags:
dev-category: sw
dev-tags: [css3]
updatedAt:
---

# 1. html에서 바로 적용한다.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet" type="text/css" />
    ...
  </head>

  <body></body>
</html>
```

# 2. Style Sheet에 삽입한다.

```css
/* app.css */
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
```

# 3. Webpack을 사용하는 경우

```js
// webpack.config.js
rules: [
      ...
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      ...
    ],
```

```css
/* app.css */
@font-face {
  font-family: 'Open Sans';
  /* app.css에서 상대경로인 font를 지정해야 한다 */
  src: url('../fonts/OpenSans-Regular.ttf');
}
```
