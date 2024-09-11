<template>
  <el-form
    inline
    ref="formRef"
    :model="formData"
    :label-width="0"
    :validate-on-rule-change="false"
    style="height: 100%"
  >
    <div
      class="table-card"
      :style="{ height: typeof height === 'string' ? height : height + 'px' }"
    >
      <div v-if="$slots.cusTable" class="table-card-cus-table">
        <div v-for="(item, index) in tableData" :key="index" class="table-card-cus-table-item">
          <slot name="cusTable" :data="item" @onCusEvent="handleCusEvent" />
        </div>
      </div>
      <el-table
        v-else
        ref="tableRef"
        :data="tableData"
        stripe
        :height="`calc(100% - ${paginationHeight}px)`"
        v-bind="tableProps"
        @select="(...arr: any[]) => handleTableEvent('select', ...arr)"
        @select-all="(...arr: any[]) => handleTableEvent('select-all', ...arr)"
        @selection-change="(...arr: any[]) => handleTableEvent('selection-change', ...arr)"
        @cell-click="(...arr: any[]) => handleTableEvent('cell-click', ...arr)"
        @row-click="(...arr: any[]) => handleTableEvent('row-click', ...arr)"
        @sort-change="(...arr: any[]) => handleTableEvent('sort-change', ...arr)"
        @filter-change="(...arr: any[]) => handleTableEvent('filter-change', ...arr)"
        @header-click="(...arr: any[]) => handleTableEvent('header-click', ...arr)"
        @current-change="(...arr: any[]) => handleTableEvent('current-change', ...arr)"
        @expand-change="(...arr: any[]) => handleTableEvent('expand-change', ...arr)"
      >
        <el-table-column v-if="isSelectable" type="selection" align="center" width="60" />
        <el-table-column v-if="showIndex" type="index" align="center" label="序号" width="80">
          <template #default="{ $index }">
            {{ _getRowInx($index) }}
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, inx) in tableSchemes"
          :key="'column' + inx"
          :show-overflow-tooltip="item.showOverflowTooltip !== false && !item.formatter"
          :width="item.width || 'auto'"
          :align="item.align || 'center'"
          :label="item.label"
          :prop="item.prop"
          v-bind="item.props || {}"
        >
          <template #header v-if="item.header">
            <component :is="item.header" @onCusEvent="handleCusEvent" />
          </template>
          <template #default="{ row, $index }">
            <!--优先级: 字典->自定义组件->默认直接展示-->
            <template v-if="item.isDict && !item.formatter">
              {{ getDictName(item.dictName || item.prop, row[item.prop]) }}
            </template>
            <template v-else-if="item.component">
              <component
                :is="item.component"
                :value="row[item.prop]"
                :prop="item.prop"
                :row="row"
                :options="{
                  dictName: item.isDict
                    ? getDictName(item.dictName || item.prop, row[item.prop])
                    : '',
                }"
                @onCusEvent="handleCusEvent"
              />
            </template>
            <template v-else-if="item.formatter">
              <div
                v-html="
                  item.formatter(row[item.prop], {
                    prop: item.prop,
                    row,
                    dictName: item.isDict
                      ? getDictName(item.dictName || item.prop, row[item.prop])
                      : '',
                  })
                "
              ></div>
            </template>
            <template v-else-if="['el-select', 'el-input', 'el-switch'].includes(item.type || '')">
              <el-form-item
                label=""
                :prop="`list.${$index}.${item.prop}`"
                :rules="item.rules || []"
                v-bind="props"
              >
                <template v-if="item.type === 'el-input'">
                  <el-input
                    v-model="row[item.prop]"
                    v-bind="item.props || {}"
                    clearable
                    @change="handleCusEvent('input', item.prop, row, $event)"
                  />
                </template>
                <template v-else-if="item.type === 'el-switch'">
                  <el-switch
                    v-model="row[item.prop]"
                    v-bind="item.props || {}"
                    @change="handleCusEvent('switch', item.prop, row, $event)"
                  />
                </template>
                <template v-else-if="item.type === 'el-select'">
                  <el-select
                    v-model="row[item.prop]"
                    v-bind="item.props || {}"
                    @change="handleCusEvent('select', item.prop, row, $event)"
                  >
                    <el-option
                      v-for="(opt, inx2) in item.selectOptions || []"
                      :key="'select_' + inx2"
                      :label="opt.label"
                      :value="opt.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-form-item>
            </template>

            <template v-else>
              {{ row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="hasPagination"
        :total="total"
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="paginationProps"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-form>
</template>

<script lang="ts">
  export default {
    name: 'eg-table',
  };
</script>

<script setup lang="ts">
  import { ComponentInternalInstance, computed, inject, nextTick, ref } from 'vue';
  import { props } from './_props';

  const _props = defineProps(props);
  const emits = defineEmits([
    'update:pageSize',
    'update:pageNum',
    'onTableEvent',
    'onPaginationEvent',
    'onCusEvent',
  ]);

  const curdInstance = inject('curdInstance', {} as ComponentInternalInstance);
  const tableRef = ref(null as any);
  const formRef = ref(null as any);

  const formData = computed(() => {
    const list = _props.tableData as any[];
    return { list };
  });
  function _getRowInx(inx: number) {
    const { pageNum, pageSize } = _props;
    return (pageNum - 1) * pageSize + inx + 1;
  }

  function getDictName(dictName: string, val: any) {
    const list: any[] = _props.dicts[dictName] || [];
    if (!list.length) return val;
    if (['', undefined, null].includes(val)) return _props.emptyText;
    if (val instanceof Array || val.includes(',')) {
      const arr: string[] = val instanceof Array ? val : val.split(',');
      return list
        .filter((t) => arr.some((key) => `${key}` === `${t.value}`))
        .map((t) => t.label)
        .join(',');
    } else {
      return list.find((t) => `${t.value}` === `${val}`)?.label || val;
    }
  }

  function handleSizeChange(pageSize: number) {
    emits('update:pageSize', pageSize);
    emits('onPaginationEvent', 'size-change', pageSize);
    nextTick(() => {
      curdInstance?.exposed?.queryListWithoutResetPager();
    });
  }

  function handleCurrentChange(pageNum: number) {
    emits('update:pageNum', pageNum);
    emits('onPaginationEvent', 'current-change', pageNum);
    nextTick(() => {
      curdInstance?.exposed?.queryListWithoutResetPager();
    });
  }

  /** el-table原生事件的统一接口 */
  function handleTableEvent(type: string, ...arr: any[]) {
    emits('onTableEvent', type, ...arr);
  }

  /** 自定义事件的统一接口 */
  function handleCusEvent(type: string, ...arr: any[]) {
    emits('onCusEvent', type, ...arr);
  }

  defineExpose({
    tableRef,
    formRef,
    getDictName,
    handleSizeChange,
    handleCurrentChange,
    handleTableEvent,
    handleCusEvent,
  });
</script>
