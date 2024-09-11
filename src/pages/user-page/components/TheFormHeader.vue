<template>
  <div class="TheFormHeader">
    {{ title }}
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TheFormHeader',
  };
</script>

<script lang="ts" setup>
  defineProps({
    title: {
      type: String,
      default: '',
    },
  });
</script>
<style scoped>
  .TheFormHeader {
    height: 40px;
    font-weight: bold;
  }
</style>
