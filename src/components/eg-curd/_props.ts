import { Component, ComputedRef, PropType } from 'vue';
import { IScheme } from '../eg-form/_props';
import { ITableColumn } from '../eg-table/_props';

export interface IEgCurd {
  /** table的句柄, 依此可执行el-table所有的api */
  tableRef: ComputedRef<any>;
  /** 获取列表的表单数据 */
  getTableFormData: () => Promise<Record<string, any>>;

  /** 重置分页并查询 */
  queryList: () => void;
  /** 不重置分页直接查询 */
  queryListWithoutResetPager: () => void;
}

/**
 * 定义组件接收的属性及其类型定义
 *
 * @param {IScheme[]} querySchemes - 查询条件配置项数组
 * @param {ITableColumn[]} tableSchemes - 表格列配置项数组
 * @param {Object} dicts - 字典集
 * @param {Function} queryApi - 查询API方法
 * @param {Function} beforeQuery - 查询前执行的函数
 * @param {Function} beforeRenderData - 渲染数据前执行的函数
 * @param {Function} afterRenderData - 渲染数据后执行的函数
 * @param {Boolean} autoQueryOnMounted - 组件挂载后是否自动查询，默认为 true。
 * @param {Object} dataMap - 数据映射配置，默认为 `{total: 'total', list: 'list'}`。
 * @param {Object} egQueryProps - eg-query组件的属性配置
 * @param {Object} egTableProps - eg-table组件的属性配置
 * @param {Component} controlsCard - 控制区的自定义组件，默认为 undefined, 也可使用插糟来实现
 * @param {Object} controlsCardProps - 控制区的自定义组件的属性
 */
export const props = {
  querySchemes: {
    type: Array as PropType<IScheme[]>,
    default: () => [],
  },
  tableSchemes: {
    type: Array as PropType<ITableColumn[]>,
    default: () => [],
  },
  dicts: {
    type: Object,
    default: () => {},
  },
  queryApi: {
    type: Function,
    default: undefined,
  },
  beforeQuery: {
    type: Function,
    default: undefined,
  },
  beforeRenderData: {
    type: Function,
    default: undefined,
  },
  afterRenderData: {
    type: Function,
    default: undefined,
  },
  autoQueryOnMounted: {
    type: Boolean,
    default: true,
  },
  // 数据映射, 默认total=res.data.total, list=res.data.list
  dataMap: {
    type: Object,
    default: () => ({
      total: 'total',
      list: 'list',
    }),
  },
  egQueryProps: {
    type: Object,
    default: () => ({}),
  },
  egTableProps: {
    type: Object,
    default: () => ({}),
  },
  controlsCard: {
    type: Object as PropType<Component>,
    default: undefined,
  },
  controlsCardProps: {
    type: Object,
    default: {},
  },
};
