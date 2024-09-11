import { Component, PropType } from 'vue';

/**
 * @summary
 * @description
 * @param {String} label 表格标题
 * @param {String} prop 表格列的字段名
 * @param {number} width 表格列的宽度, 默认auto
 * @param {string} align 表格列的对齐方式, 默认center
 * @param {Object} props 表格列原生的el-table-column属性
 * @param {boolean} isDict 是否是字典
 * @param {string} dictName 字典对应的字段名, 若未传则取prop的值
 * @param {Component} component 表格列的自定义组件
 * @param {boolean} showOverflowTooltip 是否显示省略号
 */
export interface ITableColumn {
  label: string;
  prop: string;
  type?: 'el-switch' | 'el-select' | 'el-input';
  selectOptions?: { label: string; value: string }[];
  width?: number;
  align?: string;
  props?: any;
  isDict?: boolean;
  dictName?: string;
  rules?: any[];

  component?: Component;
  header?: Component;
  showOverflowTooltip?: boolean;
  formatter?: (val: any, obj: { prop: string; row: any; dictName: string }) => string;
}

/**
 * @summary
 * @description
 * @param {ITableColumn[]} tableSchemes 表格列配置
 * @param {Object} dicts 字典数据
 * @param {Object[]} tableData 表格数据
 * @param {Object[]} tableProps 表格属性, 对应el-table的原生属性
 * @param {number} pageSize 每页显示条数
 * @param {number} pageNum 当前页码
 * @param {number} total 总条数
 * @param {boolean} isSelectable 是否可选择
 * @param {boolean} showIndex 是否显示序号
 * @param {string} emptyText 无值时的占位符
 *
 */
export const props = {
  tableSchemes: {
    type: Array as PropType<ITableColumn[]>,
    default: () => [],
  },
  dicts: {
    type: Object,
    default: () => {},
  },
  height: {
    type: [String, Number],
    default: 550,
  },
  paginationHeight: {
    type: Number,
    default: 36,
  },
  hasPagination: {
    type: Boolean,
    default: true,
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  tableProps: {
    type: Object,
    default: () => {},
  },
  paginationProps: {
    type: Object,
    default: () => {},
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageNum: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },

  isSelectable: {
    type: Boolean,
    default: false,
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  emptyText: {
    type: String,
    default: '',
  },
};
