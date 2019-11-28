---
tag: vue
---

# v-model

### v-model (event flow is child to parent)

- Parent

```html
<template>
  <child v-model="flag"></child>
</template>

<script>
  export default {
    data() {
      return {
        flag: false
      };
    }
  };
</script>
```

- Child

```html
<template>
  <v-btn @click="onClick"></v-btn>
</template>

<script>
  export default {
    methods: {
      onClick() {
        this.$emit("input", true); // parent v-model=flag is changed to true.
      }
    }
  };
</script>
```

### v-model (event flow is parent to child)

- Parent

```html
<template>
  <div>
    <child v-model="flag"></child>
    <button @click="flag = !flag">Parent Button</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: false
      };
    }
  };
</script>
```

- Child

```html
<template>
  <div>{{checked}}</div>
</template>

<script>
  export default {
    model: {
      prop: "checked",
      event: "change"
    },
    props: {
      checked: Boolean
    },
    methods: {}
  };
</script>
```

# `this.$listener`

- Parent

```html
<template>
  <child @minimize="onMinimize"></child>
</template>

<script>
  export default {
    methods: {
      onMinimize() {}
    }
  };
</script>
```

- Child

```html
<template> </template>

<script>
  export default {
    mounted() {
      this.$listener.onMinimize; // Can check @minimize is declared or not.
    }
  };
</script>
```

# v-on

> `v-on:` is equal as `@`. Don't confuse `:`. cf) `v-on:minimize` = `@minimize`. not `minimize`

- Parent

```html
<template>
  <extra-sidepanel @change-screen="setWindowHeight"></extra-sidepanel>
</template>
<script>
  export default {
    methods: {
      setWindowHeight(height) {
        console.log(height);
      }
    }
  };
</script>
```

- Child

```html
<template> </template>

<script>
  export default {
    methods: {
      onChangeScreenSize(height) {
        this.$emit("change-screen", height); // call parent method `setWindowHeight(height)`
      }
    }
  };
</script>
```

# Data Property Which one(Array vs Object)

```html
<template>
  <div>
    <div>{{array}}</div>
    <div>{{obj}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        array: [],
        obj: {}
      };
    },
    mounted() {
      setTimeout(() => {
        this.obj.a = "a"; // won't render. need this.$forceUpdate();
        // this.array.push('a'); // will render
      }, 1000);
    }
  };
</script>

<style></style>
```

# Watch And EventBus.

### Update Object Case

- when `updateLensRangeTime` call.

```js
export default {
  methods: {
    updateLensRangeTime(start_ms, end_ms) {
      this.eventBus.lensRange_ms.end = end_ms;
    }
  },

  watch: {
    "eventBus.lensRange_ms": function(value) {
      console.log("ragne", value); // will call
    },
    "eventBus.lensRange_ms.start": function(value) {
      console.log("start", value); // will call
    },
    "eventBus.lensRange_ms.end": function(value) {
      console.log("end", value); // will call
    }
  }
};
```

### Update Object Property Case

```js
export default {
  methods: {
    updateLensRangeTime(start_ms, end_ms) {
      this.eventBus.lensRange_ms.start = start_ms;
      this.eventBus.lensRange_ms.end = end_ms;
    }
  },

  watch: {
    "eventBus.lensRange_ms": function(value) {
      console.log("ragne", value); // not working.
    },
    "eventBus.lensRange_ms.start": function(value) {
      console.log("start", value); // will call
    },
    "eventBus.lensRange_ms.end": function(value) {
      console.log("end", value); // will call
    }
  }
};
```

# Tempalte Header

- Anti pattern
  > Warning: Below Component share one headers. when dynamic headers needed. It working twice. cf) select, select, male, gender (header)

```js
const headers = [
  {
    text: "Custom Name",
    sortable: true,
    value: "metadata.customName",
    align: "center"
  },
  {
    text: "Gender",
    sortable: true,
    value: "metadata.gender",
    align: "center"
  },
  {
    text: "Age",
    sortable: true,
    value: "metadata.age",
    align: "center"
  }
];

export default {
  data: function() {
    return {
      headers,
      expResults: [],
      flags: {
        showSelect: false,
        onlyOne: false
      }
    };
  }
};
```

- Pattern

```js
const headers = [
  {
    text: "Custom Name",
    sortable: true,
    value: "metadata.customName",
    align: "center"
  },
  {
    text: "Gender",
    sortable: true,
    value: "metadata.gender",
    align: "center"
  },
  {
    text: "Age",
    sortable: true,
    value: "metadata.age",
    align: "center"
  }
];

export default {
  data: function() {
    return {
      headers: JSON.parse(JSON.stringify(headers)),
      expResults: [],
      flags: {
        showSelect: false,
        onlyOne: false
      }
    };
  }
};
```

# AntiPattern

```html
<!-- do not -->
<component v-model="flag" @input="onInput"></component>

<!-- do -->
<component :value="flag" @input="onInput"></component>
```

# access slot property

```js
console.log(this.$scopedSlots);
console.log(this.$slots);
```
