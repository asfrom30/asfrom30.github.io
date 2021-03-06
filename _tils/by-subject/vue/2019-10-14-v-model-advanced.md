---
tag: vue
---

# Advanced

## `v-on="events"` instead of `v-on:click="onClick"`

- when onCheckedChange would undefined.
  - usually it is inter communicate component
  - `parent` <-> `this component` <-> `child`
- why
  - direct biding `v-on:onCheck` would undefined error.
  - when `onCheckedChange` would undefined.
  - like `<inter-communication-component></inter-communication-component>`

```html
<!-- Parent -->
<template>
  <div>
    <inter-communication-component @onCheckedChange="onTrigger"></inter-communication-component>
  </div>
</template>

<script>
  export default {
    methods: {
      onTrigger() {
        // this method will execute. when child component onClick
      }
    }
  };
</script>

<!-- Inter Communication Component -->
<template>
  <div>
    <child v-on="events"></child>
  </div>
</template>

<script>
  export default {
    created() {
      // <parent @onCheckedChange></parent>
      if (this.$listeners.onCheckedChange) {
        this.events.onCheck = this.$listeners.onCheckedChange;
      }
    }
  };
</script>

<!-- Child Component -->
<template>
  <div>
    <button @click="onClick"></button>
  </div>
</template>

<script>
  export default {
    created() {
      if (this.$listeners.onCheck) {
        // something todo.(cf. button rendering.)
      }
    },
    methods: {
      onClick() {
        this.$emit("onCheck");
        this.$emit("on-check");
      }
    }
  };
</script>
```
