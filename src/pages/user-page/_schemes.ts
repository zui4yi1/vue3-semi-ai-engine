import { IScheme, ISchemeItem } from '@/components/eg-form/_props';
import { ITableColumn } from '@/components/eg-table/_props';
// import { IScheme, ISchemeItem } from 'vue3-semi-ai-engine/components/eg-form/_props';
// import { ITableColumn } from 'vue3-semi-ai-engine/components/eg-table/_props';

/** 查询模块的配置 */
export const QueryScheme: IScheme[] = [
  {
    items: [
      {
        type: 'el-input',
        prop: 'username',
        label: '姓名',
      },
      {
        type: 'el-select',
        prop: 'gender',
        label: '性别',
      },
      {
        type: 'el-date-picker',
        prop: 'birthday',
        label: '出生日期',
        props: {
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
        },
      },
    ],
  },
];

/** 列表模块的配置 */
import { markRaw } from 'vue';
import TheCusOperation from './components/TheCusOperation.vue';

export const TableScheme: ITableColumn[] = [
  {
    label: '姓名',
    prop: 'username',
  },
  {
    label: '分数',
    prop: 'score',
    formatter: (val) =>
      `<span style="color: ${val >= 90 ? 'green' : val >= 60 ? 'orange' : 'red'}">${val}</span>`,
    showOverflowTooltip: false,
  },
  {
    label: '性别',
    prop: 'gender',
    isDict: true,
    showOverflowTooltip: false,
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '爱好',
    prop: 'hobby',
    isDict: true,
    showOverflowTooltip: false,
  },
  {
    label: '特长',
    prop: 'skill',
    isDict: true,
    showOverflowTooltip: false,
  },
  {
    label: '出生日期',
    prop: 'birthday',
  },
  {
    label: '操作',
    prop: 'action',
    component: markRaw(TheCusOperation),
    width: 160,
    showOverflowTooltip: false,
  },
];

/** 表单配置1 */
export const _formBlock1: ISchemeItem[] = [
  {
    type: 'label',
    prop: 'id',
    label: 'ID',
    renderWhen: (mode) => ['edit', 'detail'].includes(mode),
  },
  {
    type: 'el-input',
    prop: 'username',
    label: '姓名',
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    type: 'el-select',
    prop: 'gender',
    label: '性别',
    rules: [{ required: true, message: '请选择性别' }],
  },
  {
    type: 'el-input',
    prop: 'score',
    label: '分数',
  },
  {
    type: 'el-date-picker',
    prop: 'birthday',
    label: '出生日期',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    type: 'el-input',
    prop: 'age',
    label: '年龄',
    props: {
      disabled: true,
    },
    visibleWhen: (_, form = {}) => form.age > 25,
  },
  {
    type: 'el-select',
    prop: 'hobby',
    label: '爱好',
    props: {
      multiple: true,
    },
  },
  {
    type: 'el-checkbox',
    prop: 'skill',
    label: '特长',
  },
];
/** 表单模块的配置, 支持数组, 因为表单可分块显示但注意仍是在一个el-form内 */
export const FormScheme: IScheme[] = [
  {
    items: _formBlock1,
  },
];

/** 表单的验证规则, 也可在表单的配置中定义 */
export const FormRules: Record<string, any[]> = {};
