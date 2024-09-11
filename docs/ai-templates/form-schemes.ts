import { Component } from 'vue';

/**
 * 定义生成规则:
 * 请按这个格式生成代码: export const _formBlock1: ISchemeItem[] = [], 其中：
 * prop为英文名, label为中文名, 并且prop都使用英文单数
 * 可以指定type的值，如果没有指定则默认是element-plus的组件，如el-input
 * 不要生成ISchemeItem没有的属性
 * 为不同的字段，匹配正确的类型
 * 非必选属性如果没有特殊声明, 都不要生成
 * 如果是字典类，不要生成dictName属性
 * 如果是必填，生成rules, 不要有默认的trigger属性
 * type为el-date-picker时，日期格式format和valueFormat的值都为YYYY-MM-DD
 * type为el-select时，若多选则multiple属性要在props内, 如果不是多选, 则不要生成props属性
 * type如果是checkbox类型的, 则type为el-checkbox而不是el-checkbox-group, 并且不要生成props属性
 * 如果是number类型的，则type为el-input，而不是el-input-number
 * 当需要判断是否显示时, 设置visibleWhen的值
 * 当需要判断是否渲染时, 设置renderWhen的值
 * 不要生成formItemProps属性
 * 不要生成注释
 * 不要生成ts类型定义
 */

/**
 * 表单的模式, 默认form
 * @summary form-表单模式, search-查询模式, detail-详情模式
 * @description form和search都是表单模式, 区别是search不校验且取值时自动过滤空值
 */
export type IFormMode = 'form' | 'search' | 'detail';

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
