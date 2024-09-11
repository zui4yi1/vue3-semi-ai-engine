<template>
  <div class="eg-curd">
    <!-- 查询模块-->
    <EgQuery
      ref="queryRef"
      :querySchemes="querySchemes"
      :dicts="dicts"
      @query="queryList"
      @onFormChange="handleFormChange"
      v-bind="egQueryProps"
    />
    <!-- 控制栏模块-->
    <div class="controls-card">
      <slot name="controls">
        <component
          :is="controlsCard"
          v-if="controlsCard"
          v-bind="controlsCardProps || {}"
          @onCusEvent="handleCusEvent"
        />
      </slot>
    </div>
    <!-- 表格模块-->
    <slot name="table">
      <EgTable
        ref="egTableRef"
        :tableSchemes="tableSchemes"
        :dicts="dicts"
        :tableData="tableData"
        v-bind="egTableProps"
        v-model:pageSize="pager.pageSize"
        v-model:pageNum="pager.pageNum"
        :total="total"
        @onCusEvent="handleCusEvent"
        @onTableEvent="handleTableEvent"
        @onPaginationEvent="handlePaginationEvent"
      >
        <template v-if="$slots.cusTable" #cusTable="{ data }">
          <slot name="cusTable" :data="data" />
        </template>
      </EgTable>
    </slot>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'eg-curd',
  };
</script>

<script setup lang="ts">
  import {
    ComponentInternalInstance,
    computed,
    getCurrentInstance,
    onMounted,
    provide,
    ref,
  } from 'vue';
  import EgQuery from '../eg-query/index.vue';
  import EgTable from '../eg-table/index.vue';
  import { props } from './_props';

  const _props = defineProps(props);
  const emit = defineEmits([
    'onFormChangeEvent',
    'onTableEvent',
    'onPaginationEvent',
    'onCusEvent',
  ]);

  const queryRef = ref(null as any);
  const egTableRef = ref({} as any);
  const tableRef = computed(() => egTableRef.value?.tableRef);
  const formRef = computed(() => egTableRef.value?.formRef);

  const curdInstance = getCurrentInstance() || ({} as ComponentInternalInstance);
  provide('curdInstance', curdInstance);

  const tableData = ref<any[]>([]);
  const pager = ref({
    pageSize: 10,
    pageNum: 1,
  });

  const total = ref<number>(0);

  /** 重置分页并查询 */
  function queryList() {
    _resetPager();
    _doQuery();
  }

  /** 不重置分页直接查询 */
  function queryListWithoutResetPager() {
    _doQuery();
  }

  /**
   * 查询列表api
   * @param formData 查询参数
   */
  async function _doQuery() {
    let formData = await queryRef.value.getQueryFormData();
    if (!formData) return;
    if (!(_props.queryApi && _props.queryApi instanceof Function)) {
      // eslint-disable-next-line no-console
      return console.error('queryApi is not a function!');
    }
    if (_props.beforeQuery && _props.beforeQuery instanceof Function) {
      formData = _props.beforeQuery(formData);
    }
    const { pageSize, pageNum } = pager.value;
    const params = Object.assign(formData, { pageSize, pageNum });
    try {
      let res = await _props.queryApi(params);
      if (_props.beforeRenderData && _props.beforeRenderData instanceof Function) {
        res = _props.beforeRenderData(res);
      }
      tableData.value = res.data[_props.dataMap.list];
      total.value = res.data[_props.dataMap.total];
      if (_props.afterRenderData && _props.afterRenderData instanceof Function) {
        res = _props.afterRenderData(res);
      }
    } catch (err) {
      //
    }
  }

  /**
   * 重置分页
   */
  function _resetPager() {
    pager.value = {
      pageSize: 10,
      pageNum: 1,
    };
    total.value = 0;
  }

  /** 统一转发原生el-table的事件 */
  function handleTableEvent(type: string, ...arr: any[]) {
    emit('onTableEvent', type, ...arr);
  }

  function handleFormChange(...arr: any[]) {
    emit('onFormChangeEvent', ...arr);
  }

  /** 统一转发原生el-pagination的事件 */
  function handlePaginationEvent(type: string, ...arr: any[]) {
    emit('onPaginationEvent', type, ...arr);
  }

  /** 统一转发自定义事件 */
  function handleCusEvent(type: string, ...arr: any[]) {
    emit('onCusEvent', type, ...arr);
  }

  /** 获取列表的表单数据 */
  function getTableFormData() {
    return new Promise((resolve) => {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          resolve(formRef.value.getTableFormData());
        }
      });
    });
  }

  onMounted(() => {
    _props.autoQueryOnMounted && queryList();
  });

  defineExpose({
    tableRef,
    getTableFormData,
    queryList,
    queryListWithoutResetPager,
  });
</script>
