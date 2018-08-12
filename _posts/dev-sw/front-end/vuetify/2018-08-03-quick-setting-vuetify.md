---
layout: post
author: asfrom30
title: 빠르게 vuetify 시작하기
slug: quick-setting-vuetify 
dev-category: 'sw'
dev-tags: ['front-end', 'vue', 'vuetify', 'setting']
categories: [dev, software]
tags: ['none']
---

# Manual 설치
### npm 명령어

{: .command-line data-prompt="c:sandbox"}
```powershell
vue create {your app name}
```

{: .command-line data-prompt="c:sandbox"}
```cmd
vue add vuetify
```

{: .command-line data-prompt="c:sandbox"}
```cmd
npm run serve
```
### Reset CSS
* 브라우저마다 default css 세팅값이 다르므로 이를 모두 초기화 시키는 코드를 추가한다. [link](https://meyerweb.com/eric/tools/css/reset/)

```css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

# Preset
위 내용을 모두 설정해도 레파지토리에서 받아서 프로젝트를 시작해도 된다. [link](https://github.com/asfrom30/env-preset-vuetify.git)
