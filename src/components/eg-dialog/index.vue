<template>
  <ex-dialog
    ref="dialogRef"
    :title="title"
    v-bind="exDialogProps"
    @onCusEvent="handleCusEvent"
    @onClose="hanldeClose"
  >
    <!--header插糟-->
    <template #header="{ close, titleId, titleClass }" v-if="$slots.header">
      <slot name="header" :close="close" :title-id="titleId" :title-class="titleClass" />
    </template>
    <!--body-->
    <eg-components ref="componentsRef" :type="componentName" :components="components" />
    <!--footer插糟-->
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </ex-dialog>
</template>

<script lang="ts">
  export default {
    name: 'eg-dialog',
  };
</script>

<script setup lang="ts">
  import { ComponentInternalInstance, getCurrentInstance, nextTick, ref } from 'vue';
  import ExDialog from '../../components/ex-dialog/index.vue';
  import { defaultBtns } from './_constant';
  import { IOpenDialog } from './_props';

  /**
   * @param {Array} components 自定义组件列表
   */
  defineProps({
    components: {
      type: Array,
      default: () => [],
    },
  });

  const componentsRef = ref(null as any);
  const dialogRef = ref(null as any);
  const curInstance = (getCurrentInstance() || {}) as ComponentInternalInstance;

  const opener = ref(null as any);
  const title = ref('');
  const componentName = ref('');
  const exDialogProps = ref({} as any);

  /**
   * 重置弹窗参数
   */
  function resetProps() {
    title.value = '';
    componentName.value = '';
    exDialogProps.value = {};
  }

  /**
   * 打开弹窗
   * @param {String} _componentName 组件名称
   * @param {String} _title 弹窗标题
   * @param {Object} _componentOptions 组件参数
   * @param {Object} _dialogProps 弹窗参数
   */
  const openDialog: IOpenDialog = (
    _componentName,
    _title = '',
    _componentOptions = {},
    _dialogProps = {
      btns: defaultBtns,
    },
  ) => {
    opener.value = curInstance.parent;
    title.value = _title;
    componentName.value = _componentName;
    exDialogProps.value = _dialogProps;
    dialogRef.value?.openDialog();
    nextTick(() => {
      componentsRef.value?.onOpen(_componentOptions, curInstance, opener.value);
    });
  };

  /**
   * 自定义事件
   * @param {String} event 事件名称
   */
  function handleCusEvent(event: string) {
    componentsRef.value?.onCusEvent(event, curInstance, opener.value);
  }

  function close() {
    resetProps();
    dialogRef.value?.close();
  }

  function hanldeClose() {
    nextTick(() => {
      componentsRef.value?.onClose();
    });
  }

  function updateFooterBtns(btns: any[]) {
    exDialogProps.value = { ...exDialogProps.value, btns };
  }
  function getFooterBtns() {
    return exDialogProps.value.btns;
  }
  function updateFootBtnStatus(eventName: string, disabled: boolean) {
    const btn = exDialogProps.value.btns.find((item: any) => item.event === eventName);
    if (!btn) return;
    const props = btn.props || {};
    btn.props = { ...props, disabled };
  }

  defineExpose({
    openDialog,
    close,
    updateFooterBtns,
    getFooterBtns,
    updateFootBtnStatus,
  });
</script>
