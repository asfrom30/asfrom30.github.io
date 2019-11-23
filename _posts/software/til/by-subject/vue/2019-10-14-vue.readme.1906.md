- this.\$attrs

# Custom component Style methodology

```html
<!-- Parent Component -->
<tg-button class="confirm">confirm</tg-button>
```

will render

```html
<button class="tg__button confirm"></button>
```

```html
<!-- tg-button -->
<template>
  <button class="tg__button" type="button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<style>
  .tg__button {
    min-width: 120px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgb(212, 212, 212);
    border-width: 0;
    border-radius: 3px;
    color: black;
  }
  .confirm {
    color: #fff;
    background: linear-gradient(to bottom, #6cb3fa, #067dff);
    border-width: 0;
    border-radius: 3px;
  }
</style>
```

### Other example `disabled` attribute

```html
<!-- Parent Component -->
<tg-button disabled>disabled</tg-button>
```

will render

```html
<button class="tg__button" disabled="disabled"></button>
```

and

```js
created() {
  console.log(this.$attrs) // will print {disabled: ""}
}
```

### You can use this way for better

```html
<tg-button class="confirm" :disabled="false">disabled</tg-button> <tg-button class="confirm" :disabled="true">disabled</tg-button>
```

# TrickyPart

### About Attribute

```html
<tg-button disabled>disabled</tg-button>
<tg-button class="confirm" :disabled="false">disabled</tg-button>
<tg-button class="confirm" :disabled="true">disabled</tg-button>
```

will render

```html
<button class="tg__button" disabled="disabled"></button> // disabled <button class="tg__button"></button> // disabled=false
<button class="tg__button" disabled="disabled"></button> // disabled=true
```

### `querySelector()` with `v-dialog`

```html
<v-dialog v-model="dialog" persistent max-width="400">
  <v-text-field id="code-textfield" ref="doyoon"></v-text-field>
</v-dialog>
```

```js
// not working.
// this.$el.querySelector() is not working in Vuetify. Content and Dialog is separated.
// Dialog is declared at header. It is not part of Content(this.$el)`
this.$nextTick(() => {
  this.$el.querySelector('input').focus();
});

// working (not recommend)
this.$nextTick(() => {
  const el = document.querySelector('#code-textfield');
  console.log(el);
  if (el) el.focus();
});

// working (good)
this.$nextTick(() => {
  this.$refs.doyoon.focus();
});
```
