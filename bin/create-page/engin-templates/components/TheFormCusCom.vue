<template>
  <span v-if="mode === 'detail'">{{ curVal }}</span>
  <el-input v-else v-model="curVal" />
</template>

<script lang="ts">
  /** 表单自定义组件 */
  export default {
    name: 'TheFormCusCom',
  };
</script>

<script setup lang="ts">
  import { computed } from 'vue';

  const _props = defineProps({
    value: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'new',
    },
  });
  const emits = defineEmits(['change']);

  const curVal = computed({
    get() {
      return _props.value;
    },
    set(val: any) {
      emits('change', val);
    },
  });
</script>
