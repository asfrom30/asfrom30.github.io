<template>
  <div>
    <button @click="onClick">Button : {{enableLeft}}</button>
  </div>
</template>

<script>
/* eslint-disable  */
export default {
  props: {
    enableLeft: Boolean,
  },
  data() {
    return {
      temp: undefined,
    };
  },
  methods: {
    onClick() {
      this.$emit('update:enableLeft', false);
    },
  },
};
/* eslint-enable  */
</script>

<style>
</style>