<template>
  <div class="ex-detail">
    <template v-for="(scheme, inx1) in schemes" :key="'detail_' + inx1">
      <!--各块的header标题-->
      <template v-if="scheme.head">
        <component
          v-if="typeof scheme.head === 'string'"
          :is="scheme.head"
          v-bind="scheme.headProps"
        />
        <EgComponents
          v-else
          :components="[scheme.head]"
          :type="scheme.head.name"
          :props="scheme.headProps"
        />
      </template>
      <!--各块遍历-->
      <el-descriptions>
        <template v-for="(item, inx2) in scheme.items">
          <el-descriptions-item
            v-show="item.visibleWhen === undefined || item.visibleWhen('detail')"
            v-if="item.renderWhen === undefined || item.renderWhen('detail')"
            :label="item.label"
            :key="'desc_' + inx1 + '_' + inx2"
          >
            <!--自定义组件-->
            <EgComponents
              v-if="item.isCustom"
              :value="form[item.prop]"
              :type="item.type"
              :props="{ ...item.props, mode: 'detail' }"
              :components="item.component ? [item.component] : components"
            />
            <!--带选项的-->
            <template v-else-if="CompsWithItems.includes(item.type)">
              {{ getLabels(item, form[item.prop]) }}
            </template>
            <!--其它普通的可直接展示值的-->
            <template v-else>
              {{ form[item.prop] }}
            </template>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </template>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ex-detail',
  };
</script>

<script setup lang="ts">
  import EgComponents from '../eg-components/index.vue';
  import { ISchemeItem } from '../eg-form/_props';
  import { props } from './_props';

  const _props = defineProps(props);

  const CompsWithItems = ['el-radio', 'el-checkbox', 'el-select', 'el-cascader'];

  /** 获取树形结构的label */
  function _getTreeLabel(list: any[], vals: string[]) {
    const res: string[] = [];
    const curVal = vals.shift();
    const obj = list.find((t) => t.value === curVal);
    if (!obj) return res;
    res.push(obj.label);
    const children = obj.children;
    if (vals.length) {
      const _res = _getTreeLabel(children, vals);
      if (_res.length) {
        res.push(..._res);
      }
    }
    return res;
  }

  /** 获取对应的label */
  function getLabels(item: ISchemeItem, val: any) {
    const { type, prop, dictName, props: { multiple } = {} } = item;
    const list: any[] = _props.dicts[dictName || prop] || [];
    if (type === 'el-radio' || (type === 'el-select' && !multiple)) {
      return list.find((t) => t.value === val)?.label || _props.emptyText;
    } else if (type === 'el-checkbox' || (type === 'el-select' && multiple)) {
      if (!(val instanceof Array)) return val;
      return (
        list
          .filter((t) => val.includes(t.value))
          .map((t) => t.label)
          .join(', ') || _props.emptyText
      );
    } else if (type === 'el-cascader') {
      return _getTreeLabel(list, (val || []).slice(0)).join(',') || _props.emptyText;
    }
    return val || _props.emptyText;
  }
</script>
