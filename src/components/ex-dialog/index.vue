<template>
  <el-dialog
    class="ex-dialog"
    :title="title"
    :width="width"
    v-model="open"
    :wrapper-closable="false"
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
    v-bind="dialogProps"
    @close="close"
  >
    <!-- header -->
    <template #header="{ close, titleId, titleClass }" v-if="$slots.header">
      <slot name="header" :close="close" :title-id="titleId" :title-class="titleClass" />
    </template>
    <!-- body -->
    <div class="custom-body">
      <slot />
    </div>
    <!-- footer -->
    <template #footer>
      <slot name="footer">
        <div v-if="btns.length" class="custom-foot">
          <el-button
            v-for="(btn, index) in btns"
            :key="'btn' + index"
            :type="btn.type"
            :icon="btn.icon || null"
            v-bind="btn.props || {}"
            @click="handleCusEvent(btn)"
          >
            {{ btn.name }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  export default {
    name: 'ex-dialog',
  };
</script>

<script setup lang="ts">
  import { ref } from 'vue';
  import { IDialogFootButton, props as _props_ } from './_props';

  defineProps(_props_);

  const emits = defineEmits(['onCusEvent', 'onClose']);
  const open = ref(false);

  function openDialog() {
    open.value = true;
  }

  function close() {
    // 避免重复触发
    if (!open.value) return;
    open.value = false;
    emits('onClose');
  }

  /** 转发自定义事件, 除了cancel其它都转发 */
  function handleCusEvent(btn: IDialogFootButton) {
    if (btn.event === 'cancel') {
      close();
    } else {
      emits('onCusEvent', btn.event);
    }
  }

  defineExpose({
    openDialog,
    close,
  });
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
