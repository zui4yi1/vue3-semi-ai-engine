import { Component } from 'vue';

/**
 * 定义生成规则:
 * 定义格式一: export const QueryScheme: IScheme[] = [ { items:[] } ]
 * 按格式一生成数据, 其中：
 * 生成的数据都在items内
 * prop为英文名, label为中文名, 并且prop都使用英文单数
 * type是element-plus的表单的组件名，如el-input
 * type为el-input时仅仅只要生成type, prop和label这三个属性，除非有特殊说明要生成props属性
 * type为el-date-picker时，日期格式format和valueFormat的值都为YYYY-MM-DD
 * type为el-select时，若多选则multiple属性要在props内, 如果不是多选, 则不要生成props属性
 * 不要生成注释
 * 不要生成ts类型定义
 */

/**
 * 定义了一个表单方案项的接口，用于描述表单的各个字段配置
 *
 * @property {string} type - 字段类型，如文本框、下拉框等
 * @property {string} prop - 字段的属性名称
 * @property {any} [props] - 作用于组件如el-input的原生属性，如placeholder, disabled等
 * @property {string} [label] - 字段的标签名称，用于显示在表单界面上
 * @property {any[]} [rules] - 字段的验证规则数组
 * @property {any} [formItemProps] - FormItem的额外属性，用于精细化控制表单项的显示和行为
 * @property {boolean} [isCustom] - 标识该字段是否为自定义组件
 * @property {string} [dictName] - 字典名称，当字段需要从预定义的选项中取值时使用，若不传则使用prop作为选项
 * @property {any} [component] - 该字段对应的组件，允许自定义组件
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
