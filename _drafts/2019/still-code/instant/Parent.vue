<template>
  <div>
    <div>Enable Left : {{enableLeft}}</div>
    <div>obj : {{obj}}</div>
    <!-- <child v-bind:enableLeft.sync="enableLeft"></child> -->
    <child v-bind.sync="obj"></child>
    <button @click="obj.enableLeft = true">Parent button</button>
  </div>
</template>

<script>
import Child from './Child.vue';
/* eslint-disable  */
export default {
  components: { Child },
  data() {
    return {
      obj: {
        enableLeft: undefined,
      },
      enableLeft: undefined,
    };
  },
  methods: {
    listen(value) {
      console.log(value);
    },
  },
};
/* eslint-enable  */
</script>

<style>
</style>