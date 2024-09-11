import { FormInstance } from 'element-plus';
import { Component, PropType, Ref } from 'vue';

/** 表单模式 */
export type IFormMode = 'new' | 'edit' | 'detail';

/** eg-form实例暴露的方法, 可接收表单值的泛型 */
export interface IEgForm<T = any> {
  /** form的ref句柄 */
  formRef: FormInstance;
  /** 重置到detail的值 */
  reset: () => void;
  /** 获取表单值, 会先自动校验 */
  getForm: () => Promise<T>;
  /** 获取表单值, 会先自动校验, 并过滤掉空值, 可用于查询条件里的表单 */
  getFormFilterEmpty: () => Promise<T>;
  /** 获取表单与初始值的对比 */
  getCompare: () => {
    isChange: boolean;
    changeKeys: string[];
    form: T;
    originForm: T;
  };
  /** 设置表单项的值 */
  setPropVal: (prop: string, val: any) => void;
  /** 获取初始值 */
  getInitVal: () => T;
  /** 获取表单某项的ref句柄, 响应式的, 需要采用computed的方式获取 */
  getPropRef: (prop: string) => Ref<any>;
  /** 查找scheme中的某项, 可用于复用schemes */
  findSchemeItem: (scheme: IScheme[], prop: string) => ISchemeItem | null;
  /** 清除页面上的校验信息 */
  clearValidate: () => void;
}

/**
 * 定义了一个表单方案项的接口，用于描述表单的各个字段配置
 *
 * @property {string} type - 字段类型，如文本框、下拉框等
 * @property {string} prop - 字段的属性名称
 * @property {any} [props] - 作用于组件如el-input的原生属性，如placeholder, disabled等
 * @property {string} [label] - 字段的标签名称，用于显示在表单界面上
 * @property {any[]} [rules] - 字段的验证规则数组
 * @property {any} [formItemProps] - 作用于el-form-item上的属性
 * @property {boolean} [isCustom] - 标识该字段是否为自定义组件
 * @property {string} [dictName] - 字典名称，当字段需要从预定义的选项中取值时使用，若不传则使用prop作为选项
 * @property {any} [component] - 该字段对应的组件，允许自定义组件
 * @property {(mode: IFormMode) => boolean} [renderWhen] - 动态控制字段是否渲染的条件判断函数, 如果不渲染则formData内也没有此字段
 * @property {(mode: IFormMode, form: any) => boolean} [visibleWhen] - 动态控制字段可见性的条件判断函数，与when功能类似，但多了一个参数form, 用于控制可见性
 */
export interface ISchemeItem {
  type: string;
  prop: string;
  props?: any;
  label?: string;
  rules?: any[];
  formItemProps?: any;
  isCustom?: boolean;
  dictName?: string;
  component?: Component;
  renderWhen?: (mode: IFormMode) => boolean;
  visibleWhen?: (mode: IFormMode, form: any) => boolean;
}

/**
 * @summary
 * @description
 * @param {Component | string} head 表单头部组件, 组件对象或组件的string名称, 如果你的组件已注册为全局组件的话用string名称更方便
 * @param {Object} headProps 表单头部组件的属性
 * @param {ISchemeItem[]} items 表单配置项
 */
export interface IScheme {
  head?: Component | string;
  headProps?: any;
  items: ISchemeItem[];
}

/** form的change事件类型 */
export type IOnFormChange = (
  prop: string,
  value: any,
  { formData, setPropVal }: { formData: any; setPropVal: (prop: string, value: any) => void },
) => void;

/**
 * 定义组件的属性及其默认值
 *
 * @property {String} mode {@link IFormMode} - 模式标识，用于区分表单或展示模式
 * @property {Array} schemes - 方案数组, 定义有哪些表单项
 * @property {Object} detail - 表单数据, 特意用detail作为名称, 表示单向数据流, 而不是双向绑定的
 * @property {Object} dicts - 字典集, 所有字典的集合
 * @property {Object} rules - 验证规则对象
 * @property {Number} labelWidth - 标签宽度，默认为120像素
 * @property {Number} contentWidth - 内容区域宽度，默认为200像素
 * @property {Array} components - 自定义组件集合, form-item为isCustom时可使用
 * @property {Object} formProps - 表单的属性, 作用于原生组件el-form
 * @property {String} emptyText - 当内容为空时显示的文本, mode为detail时生效
 * @property {Object|String} appendComponent - 在表单底部追加的组件或组件名称，比如可在表单底部增加描述性的的说明文字
 */
export const props = {
  mode: {
    type: String as PropType<IFormMode>,
    default: 'new',
  },
  schemes: {
    type: Array as PropType<IScheme[]>,
    default: () => [],
  },
  detail: {
    type: Object,
    default: () => ({}),
  },
  dicts: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: Number,
    default: 120,
  },
  contentWidth: {
    type: Number,
    default: 200,
  },
  components: {
    type: Array as PropType<Component[]>,
    default: () => [],
  },
  formProps: {
    type: Object,
    default: () => ({}),
  },
  // 为空时的占位符
  emptyText: {
    type: String,
    default: '',
  },
  // 尾部扩展组件
  appendComponent: {
    type: [Object, String],
    default: undefined,
  },
};
