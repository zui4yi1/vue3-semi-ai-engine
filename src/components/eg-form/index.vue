<template>
  <div style="height: 100%">
    <!-- 暂时使用vshow的方式控制显隐, 因为切换时EgFormItem会触发, 不好控制, 后续转到form-item内-->
    <!--表单模式-->
    <el-form
      v-show="mode !== 'detail'"
      inline
      ref="formRef"
      :model="form"
      :label-width="labelWidth"
      :validate-on-rule-change="false"
      :rules="rules"
      style="height: 100%"
      v-bind="formProps"
    >
      <template v-for="(scheme, inx1) in schemes">
        <!--各块的header标题-->
        <template v-if="scheme.head">
          <component
            :key="'head_' + inx1"
            v-if="typeof scheme.head === 'string'"
            :is="scheme.head"
            v-bind="scheme.headProps"
          />
          <EgComponents
            v-else
            :key="'head2_' + inx1"
            :components="[scheme.head]"
            :type="scheme.head.name"
            :props="scheme.headProps"
          />
        </template>

        <!--表单项遍历-->
        <template v-for="(item, inx2) in scheme.items">
          <EgFormItem
            v-show="item.visibleWhen === undefined || item.visibleWhen(mode, form, authInfo)"
            v-if="item.renderWhen === undefined || item.renderWhen(mode)"
            :mode="mode"
            :form="form"
            :key="'form_item_' + inx1 + '_' + inx2"
            :label="item.label"
            :value="detail[item.prop]"
            :type="item.type"
            :prop="item.prop"
            :props="item.props || {}"
            :rules="item.rules"
            :formItemProps="item.formItemProps"
            :width="labelWidth + contentWidth"
          >
            <template v-if="form[item.prop] !== undefined">
              <template v-if="item.type === 'label'">
                {{ form[item.prop] }}
              </template>
              <!--自定义组件-->
              <EgComponents
                v-else-if="item.isCustom"
                :type="item.type"
                :props="{ ...item.props, mode: 'form' }"
                :components="item.component ? [item.component] : components"
                :value="form[item.prop]"
                @change="handleChange(item.prop, $event)"
              />
              <!--带选项的组件-->
              <ExOptions
                v-else-if="CompsWithItems.includes(item.type)"
                :value="form[item.prop]"
                :type="item.type"
                :props="_defaultPropsCompsWithItems(item.props)"
                :list="dicts[item.dictName || item.prop] || []"
                @input="handleChange(item.prop, $event)"
              />
              <!--仅有value的原生ele组件, 且事件为input-->
              <component
                v-else-if="CompsWithInput.includes(item.type)"
                :is="item.type"
                v-model="form[item.prop]"
                v-bind="_defaultPropsCompsWithInput(item.props)"
                :style="{ width: contentWidth + 'px' }"
                @input="handleChange(item.prop, $event)"
              />
              <!--仅有value的原生ele组件, 且事件为change-->
              <component
                v-else
                :is="item.type"
                v-model="form[item.prop]"
                v-bind="_defaultProps(item.props)"
                :style="{ width: contentWidth + 'px' }"
                @change="handleChange(item.prop, $event)"
              />
            </template>
          </EgFormItem>
        </template>
      </template>
      <slot name="append">
        <component :is="appendComponent" v-if="appendComponent" />
      </slot>
      <slot />
    </el-form>
    <!--详情模式-->
    <ExDetail
      v-show="mode === 'detail'"
      :schemes="schemes"
      :form="form"
      :dicts="dicts"
      :labelWidth="labelWidth"
      :components="components"
      :emptyText="emptyText"
    />
  </div>
</template>

<script lang="ts">
  const ComponentName = 'eg-form';
  export default {
    name: ComponentName,
  };
</script>

<script setup lang="ts">
  import { FormInstance } from 'element-plus';
  import { cloneDeep, isEqual, isObject, transform } from 'lodash-es';
  import { provide, ref, toRef } from 'vue';
  import EgComponents from '../eg-components/index.vue';
  import EgFormItem from '../eg-form-item/index.vue';
  import ExDetail from '../ex-detail/index.vue';
  import ExOptions from '../ex-options/index.vue';
  import { IScheme, ISchemeItem, props } from './_props';

  /** 带选项的组件 */
  const CompsWithItems = ['el-radio', 'el-checkbox', 'el-select', 'el-cascader'];
  /** 带输入的组件 */
  const CompsWithInput = ['el-input'];

  /** 带下拉框的组件默认props */
  const DefaultPropsCompsWithItems = {
    placeholder: '请选择',
    clearable: true,
  };

  /** 带输入的组件默认props */
  const DefaultPropsCompsWithInput = {
    placeholder: '请输入',
    clearable: true,
  };

  const DefaultProps = {
    placeholder: '请选择',
    clearable: true,
  };

  /** 表单的初始值, 重置时取此值 */
  const initValues = ref({} as any);
  /** 表单值 */
  const form = ref({} as any);

  const formRef = ref<FormInstance>();

  defineProps(props);
  const emits = defineEmits(['onFormChange']);

  /** 初始化表单值、并缓存初始值 */
  function initFormVal(prop: string, val: any) {
    form.value[prop] = val;
    initValues.value[prop] = val;
  }

  provide('initFormVal', initFormVal);

  /** 表单值克隆 */
  function _cloneData() {
    return cloneDeep(form.value);
  }

  function _defaultPropsCompsWithItems(props: any) {
    return Object.assign({}, DefaultPropsCompsWithItems, props || {});
  }

  function _defaultPropsCompsWithInput(props: any) {
    return Object.assign({}, DefaultPropsCompsWithInput, props || {});
  }
  function _defaultProps(props: any) {
    return Object.assign({}, DefaultProps, props || {});
  }

  function reset() {
    form.value = getInitVal();
    clearValidate();
  }

  function clearValidate() {
    setTimeout(() => {
      formRef.value?.clearValidate();
    }, 300);
  }

  /** 校验并获取表单值 */
  function getForm() {
    return new Promise((resolve) => {
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          resolve(_cloneData());
        } else {
          resolve(false);
        }
      });
    });
  }

  /** 校验并获取表单值(过滤空值, 可用于查询模块) */
  function getFormFilterEmpty() {
    return new Promise((resolve) => {
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          const data = _cloneData();
          const keys = Object.keys(data);
          keys.forEach((k) => {
            if ([undefined, null, ''].includes(data[k]) || `${data[k]}` === `${[]}`) delete data[k];
          });
          resolve(data);
        }
      });
    });
  }

  /** 表单值改变时触发 */
  function handleChange(prop: string, val: any) {
    form.value = { ...form.value, [prop]: val };
    emits('onFormChange', prop, val, {
      setPropVal,
      formData: _cloneData(),
    });
  }

  /** 设置表单值 */
  function setPropVal(prop: string, val: any) {
    handleChange(prop, val);
  }

  /** 获取初始表单值 */
  function getInitVal() {
    return cloneDeep(initValues.value);
  }

  /** 获取表单值引用 */
  function getPropRef(prop: string) {
    return toRef(form.value, prop);
  }

  /** 对比对象差异 */
  function _difference(object: any, base: any) {
    function changes(object: any, base: any) {
      return transform(object, function (result: any, value: any, key: string) {
        if (!isEqual(value, base[key])) {
          result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
        }
      });
    }
    return changes(object, base);
  }

  /**
   * 对比初始表单, 用于对比表单是否有变化
   * @description 注意初始表单即detail
   */
  function getCompare() {
    const changes = _difference(form.value, initValues.value);
    const changeKeys = Object.keys(changes);
    return {
      isChange: changeKeys.length > 0,
      changeKeys, // 变化的字段
      form: _cloneData(),
      originForm: getInitVal(),
    };
  }

  /** 查找scheme中的某项 */
  function findSchemeItem(scheme: IScheme[], prop: string): ISchemeItem | null {
    let target: ISchemeItem | null = null;
    scheme.some((t) => {
      const tmp = t.items.some((k) => {
        if (k.prop === prop) {
          target = k;
          return true;
        }
        return false;
      });
      return tmp;
    });
    return target;
  }

  defineExpose({
    formRef,
    reset,
    getForm,
    getFormFilterEmpty,
    getCompare,
    setPropVal,
    getInitVal,
    getPropRef,
    findSchemeItem,
    clearValidate,
  });
</script>
