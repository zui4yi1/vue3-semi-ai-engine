<template>
  <div class="form-wrapper">
    <EgForm
      ref="EgFormRef"
      :mode="mode"
      :schemes="Schemes.FormScheme"
      :rules="Schemes.FormRules || {}"
      :detail="curDetail"
      :dicts="dicts"
      @onFormChange="handleFormChange"
    />
  </div>
</template>
<script lang="ts">
  export default {
    name: 'TheForm',
  };
</script>

<script setup lang="ts">
  // import { IFormMode, IOnFormChange  } from 'vue3-semi-ai-engine/components/eg-form/_props';
  import { IFormMode, IOnFormChange } from '@/components/eg-form/_props';
  import { storeToRefs } from 'pinia';
  import { ComponentInternalInstance, nextTick, ref } from 'vue';
  import * as Schemes from '../_schemes';
  import { useStoreHook } from '../_useStoreHook';

  const storeHook = useStoreHook();
  const { dicts, curDetail, EgFormRef } = storeToRefs(storeHook);

  const mode = ref<IFormMode>('new');

  /** 打开组件时的勾子 */
  function onOpen(props: any) {
    const { id, type = 'new' } = props;
    mode.value = type;
    nextTick(() => {
      id && storeHook.get(id);
    });
  }
  function onClose() {
    curDetail.value = {};
  }

  /** 自定义事件, 即提交表单这些*/
  async function onCusEvent(eventName: string, layer: ComponentInternalInstance) {
    if (eventName === 'submit') {
      const data = await EgFormRef.value.getForm();
      if (!data) return;
      if (mode.value === 'edit') {
        storeHook.update(data);
      } else {
        storeHook.add(data);
      }
      // 关闭抽屉或弹窗
      layer.exposed?.close?.();
    }
  }

  /** 表单联动 */
  const handleFormChange: IOnFormChange = (prop, val, { setPropVal }) => {
    // 每种prop类型单独写一个if
    if (prop === 'birthday') {
      const age = new Date().getFullYear() - new Date(val).getFullYear() + 1;
      setPropVal('age', age);
    }
  };

  defineExpose({
    onOpen,
    onClose,
    onCusEvent,
  });
</script>
