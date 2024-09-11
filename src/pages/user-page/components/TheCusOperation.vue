<template>
  <div>
    <el-button link @click="handleCusEvent('detail')">详情</el-button>
    <el-button link @click="handleCusEvent('edit')">编辑</el-button>
    <el-button link @click="handleCusEvent('delete')">删除</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { toRaw } from 'vue';

  const _props = defineProps({
    row: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => {},
    },
  });
  const emits = defineEmits(['onCusEvent']);
  const handleCusEvent = (type: string) => {
    emits('onCusEvent', type, toRaw(_props.row));
  };
</script>
