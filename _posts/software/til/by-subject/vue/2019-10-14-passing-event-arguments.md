---
title: Vue Template
category: til
layout: post
tag: [by-subject, vue]
---

# Passing Event Argumnets

- https://stackoverflow.com/questions/40956671/passing-event-and-argument-to-v-on-in-vue-js

```html
<input @input="myHandler('foo', 'bar', ...arguments)" />
```