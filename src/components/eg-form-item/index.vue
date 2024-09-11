<template>
  <el-form-item
    v-if="mode !== 'detail'"
    :label="label"
    :prop="prop"
    :rules="rules"
    v-bind="formItemProps"
    :style="{ width: `${width}px` }"
  >
    <slot />
  </el-form-item>
  <i v-else />
</template>

<script lang="ts">
  export default {
    name: 'eg-form-item',
  };
</script>
<script setup lang="ts">
  import { inject, onBeforeUnmount, watch } from 'vue';
  import { props as _props_ } from './_props';
  const _props = defineProps(_props_);

  const initFormVal: any = inject('initFormVal');

  /** 监听初始值的变化 */
  watch(
    () => [_props.value],
    ([val]) => {
      const defaultVal = getInitValue(val, _props.type);
      initFormVal(_props.prop, defaultVal);
    },
    {
      immediate: true,
    },
  );

  onBeforeUnmount(() => {
    delete _props.form[_props.prop];
  });

  function getInitValue(val: any, type: string) {
    if ([undefined].includes(val)) {
      if (type === 'el-switch') {
        return false;
      } else if (['el-checkbox', 'el-cascader'].includes(type)) {
        return [];
      } else if (['el-select'].includes(type) && _props.props.multiple) {
        return [];
      }
      return '';
    } else {
      return val;
    }
  }
</script>
