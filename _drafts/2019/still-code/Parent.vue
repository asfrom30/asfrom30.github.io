<template>
  <div>
    <div>Check reactivity</div>
    <child v-model="colors"></child>
    <button @click="onClickRgb1">set</button>
    <button @click="onClickRgb2">set</button>
  </div>
</template>

<script>
import Child from './Child.vue';
export default {
  components: {
    Child,
  },
  data() {
    return {
      colors: {
        r: 10,
        g: 10,
        b: 10,
      },
    };
  },
  methods: {
    onClickRgb1() {
      this.colors.r = 20;
    },
    onClickRgb2() {
      this.$set(this.colors, 'r', 40);
    },
  },
};
</script>

<style>
</style>