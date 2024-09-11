<template>
  <el-radio-group v-if="type === 'el-radio'" v-model="curVal" v-bind="props">
    <el-radio v-for="(item, inx) in list" :key="'radio_' + inx" :value="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
  <el-checkbox-group v-else-if="type === 'el-checkbox'" v-model="curVal" v-bind="props">
    <el-checkbox v-for="(item, inx) in list" :key="'ckb_' + inx" :value="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
  <el-select v-else-if="type === 'el-select'" v-model="curVal" v-bind="props">
    <el-option
      v-for="(item, inx) in list"
      :key="'select_' + inx"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
  <el-cascader
    v-else-if="type === 'el-cascader'"
    v-model="curVal"
    :options="list"
    v-bind="props"
  ></el-cascader>
  <div v-else></div>
</template>

<script lang="ts">
  export default {
    name: 'ex-options',
  };
</script>
<script setup lang="ts">
  import { computed } from 'vue';
  import { props as _props_ } from './_props';

  const _props = defineProps(_props_);
  const emits = defineEmits(['input']);
  const curVal = computed<any>({
    get() {
      // 不同组件的初始值. 注意null和''都是有意义的, 故仅为undefined时根据组件类型初始化
      if ([undefined].includes(_props.value as any)) {
        if (['el-checkbox', 'el-cascader'].includes(_props.type)) return [];
        if (['el-select'].includes(_props.type) && _props.props.multiple) return [];
        else return '';
      } else {
        return _props.value;
      }
    },
    set(val) {
      emits('input', typeof val === 'undefined' ? '' : val);
    },
  });
</script>
