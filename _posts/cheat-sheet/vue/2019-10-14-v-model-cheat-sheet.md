---
layout: cheat-sheet
category: cheat-sheet
tag: vue
---

# V-model

## How to access parent value

```html
<!-- Parent.vue -->
<child v-model="someObj"></v-modle>
```

```js
// Child.vue
export default {
  props: {
    value: Object
  },
  created() {
    console.log(this.value); // expect output is someObj (from Parent.vue)
  }
};
```

if you want to customize, [see more details](https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model)

```js
export default {
  model: {
    prop: "checked",
    event: "change"
  }
};
```
