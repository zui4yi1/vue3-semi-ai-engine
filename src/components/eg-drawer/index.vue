<template>
  <ex-drawer
    ref="drawerRef"
    :title="title"
    v-bind="drawerProps"
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
  </ex-drawer>
</template>

<script lang="ts">
  export default {
    name: 'eg-drawer',
  };
</script>

<script setup lang="ts">
  import { ComponentInternalInstance, getCurrentInstance, nextTick, ref } from 'vue';
  import ExDrawer from '../../components/ex-drawer/index.vue';
  import { defaultBtns } from './_constant';
  import { IOpenDrawer } from './_props';

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
  const drawerRef = ref(null as any);
  const curInstance = (getCurrentInstance() || {}) as ComponentInternalInstance;

  const opener = ref(null as any);
  const title = ref('');
  const componentName = ref('');
  const drawerProps = ref({} as any);

  /**
   * 重置抽屉参数
   */
  function resetProps() {
    title.value = '';
    componentName.value = '';
    drawerProps.value = {};
  }

  /**
   * 打开抽屉
   * @param {String} _componentName 组件名称
   * @param {String} _title 弹窗标题
   * @param {Object} _componentOptions 组件参数
   * @param {Object} _dialogProps 抽屉参数
   */
  const openDrawer: IOpenDrawer = (
    _componentName,
    _title = '',
    _componentOptions = {},
    _drawerProps = {
      btns: defaultBtns,
    },
  ) => {
    opener.value = curInstance.parent;
    title.value = _title;
    componentName.value = _componentName;
    drawerProps.value = _drawerProps;
    drawerRef.value?.openDrawer();
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
    drawerRef.value?.close();
  }

  function hanldeClose() {
    nextTick(() => {
      componentsRef.value?.onClose();
    });
  }

  function updateFooterBtns(btns: any[]) {
    drawerProps.value = { ...drawerProps.value, btns };
  }
  function getFooterBtns() {
    return drawerProps.value.btns;
  }
  function updateFootBtnStatus(eventName: string, disabled: boolean) {
    const btn = drawerProps.value.btns.find((item: any) => item.event === eventName);
    if (!btn) return;
    const props = btn.props || {};
    btn.props = { ...props, disabled };
  }

  defineExpose({
    openDrawer,
    close,
    updateFooterBtns,
    getFooterBtns,
    updateFootBtnStatus,
  });
</script>
