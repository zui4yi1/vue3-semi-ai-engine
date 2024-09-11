<template>
  <div class="home-main-body">
    <EgCurd
      ref="EgCurdRef"
      :querySchemes="Schemes.QueryScheme"
      :tableSchemes="Schemes.TableScheme"
      :dicts="dicts"
      :queryApi="DemoCurd.getList"
      :egQueryProps="{
        egFormProps: {
          labelWidth: 100,
          contentWidth: 160,
        },
      }"
      :egTableProps="{
        isSelectable: true,
        height: 'calc(100vh - 300px)',
      }"
      @onTableEvent="handleTableEvent"
      @onCusEvent="handleCusEvent"
    >
      <template #controls>
        <el-button type="primary" @click="checkAll">全选</el-button>
        <el-button type="primary" @click="handleCusEvent('new')">新增</el-button>
        <el-button
          type="primary"
          :disabled="selectRows.length === 0"
          @click="handleCusEvent('batchDelete')"
        >
          删除已选{{ selectRows.length }}项
        </el-button>
      </template>
    </EgCurd>
    <EgDrawer ref="EgDrawerRef" :components="[TheForm]" @onCusEvent="handleCusEvent" />
  </div>
</template>

<script setup lang="ts">
  import * as Schemes from './_schemes';

  import { DrawerCancelBtn } from '@/utils/vue3-ai-engine/constants';
  import { ElConfirm } from '@/utils/vue3-ai-engine/tools';
  import * as DemoCurd from 'demo-curd';
  import { storeToRefs } from 'pinia';
  import { useStoreHook } from './_useStoreHook';
  import TheForm from './components/TheForm.vue';

  const storeHook = useStoreHook();
  const { dicts, EgCurdRef, EgDrawerRef, selectRows } = storeToRefs(storeHook);

  function checkAll() {
    // 通过tableRef可调用el-table的所有api
    EgCurdRef.value.tableRef.toggleAllSelection();
  }

  function handleCusEvent(type: string, ...arr: any[]) {
    const firstParam = arr[0] || {};
    const { id } = firstParam;
    const formParam = { id, type };
    switch (type) {
      case 'delete':
        ElConfirm(`是否删除该项?`).then(() => {
          storeHook.del(id);
        });
        break;
      case 'detail':
        EgDrawerRef.value?.openDrawer('TheForm', '详情', formParam, DrawerCancelBtn);
        break;
      case 'edit':
        EgDrawerRef.value?.openDrawer('TheForm', '编辑', formParam);
        break;
      case 'new':
        EgDrawerRef.value?.openDrawer('TheForm', '新增', { type });
        break;
      case 'batchDelete':
        ElConfirm(`是否批量删除已选${selectRows.value.length}项记录吗?`).then(() => {
          storeHook.batchDelete(selectRows.value.map((item) => item.id));
        });

        break;
      default:
        break;
    }
  }
  function handleTableEvent(type: string, ...arr: any[]) {
    switch (type) {
      case 'selection-change':
        selectRows.value = JSON.parse(JSON.stringify(arr[0]));
        break;
      default:
        break;
    }
  }
</script>
