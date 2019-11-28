---
tag: vue
---

# Attribute Pattern.

```html
// Parent Componet
<custom-component resizable></custom-component>

// Custom Component
<template> </template>

<script>
  export default {
    mounted() {
      this.$attrs.resizable; // ""
    }
  };
</script>
```

# V-for Pattern

###

```html
<!-- windowBootstraps is array -->
<div
  v-for="({uuid, initPos, zIndex} = bootstrap, index) in windowBootstraps"
  :key="index"
  :id="uuid"
></div>
```

# Find `Ref` includes specific `Attribute`

```html
<div v-for="({uuid, initPos, zIndex} = bootstrap) in windowBootstraps">
  <tg-window
    ref="TgWindows"
    :windowEventBus="windowEventBus"
    :data-window-id="uuid"
    @minimize="onMinimize(uuid, $event)"
  ></tg-window>
</div>
```

```js
export default {
  methods: {
    findRef(uuid) {
      const i = this.$refs.TgWindows.findIndex(obj => {
        return obj.$attrs["data-window-id"] === uuid;
      });
      if (i === -1) return alert("can`t find ref");

      const ref = this.$refs.TgWindows[i];
    }
  }
};
```

# Global Variable

```js
// Global
new Vue({
  data: {
    sharedStyle
  }
});

// Each Component
export default {
  // this.$root.sharedStyle,
};
```

# Global Variable Shared Style

```js
new Vue({
  data: {
    sharedStyle: {
      mainTitle: "font-weight-bold elevation-14 main-content__title",
      subTitle: "display-1 font-weight-bold"
    }
  }
});

export default {
  data() {
    return {
      sharedStyle: this.$root.sharedStyle
    };
  }
};
```
