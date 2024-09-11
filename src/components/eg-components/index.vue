<template>
  <component
    v-if="DynamicComponent"
    ref="componentRef"
    :is="DynamicComponent"
    v-bind="props"
    :value="curVal"
    @change="handleChange"
  />
</template>

<script lang="ts">
  const ComponentName = 'eg-components';
  export default {
    name: ComponentName,
  };
</script>

<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue';
  import { props as _props_ } from './_props';

  const _props = defineProps(_props_);
  const emits = defineEmits(['change']);

  const componentRef = ref(null as any);

  const curVal = computed(() => _props.value);
  function handleChange(val: any) {
    emits('change', val);
  }

  /** 匹配动态组件 */
  const DynamicComponent = computed(() => {
    return _props.components.find((item: any) => item.name === _props.type);
  });

  /** 打开时的勾子, 一般用于传递onOpen事件 */
  function onOpen(parent: any, opener: any) {
    if (componentRef.value?.onOpen instanceof Function) {
      nextTick(() => {
        componentRef.value.onOpen(parent, opener);
      });
    }
  }

  /** 关闭时的勾子, 一般用于传递onClose事件 */
  function onClose(parent: any, opener: any) {
    if (componentRef.value?.onClose instanceof Function) {
      nextTick(() => {
        componentRef.value.onClose(parent, opener);
      });
    }
  }

  /** 自定义事件 */
  function onCusEvent(event: string, parent: any, opener: any) {
    nextTick(() => {
      componentRef.value?.onCusEvent?.(event, parent, opener);
    });
  }

  defineExpose({
    onOpen,
    onClose,
    onCusEvent,
  });
</script>
