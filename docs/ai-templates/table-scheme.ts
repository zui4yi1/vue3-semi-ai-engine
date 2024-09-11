/**
 * 定义四个生成规则，并分别在不同的代码块中展示
 */

/**
 * 定义生成规则一
 * 定义格式1: export const TableScheme: ITableColumn[] = [], 其中:
 * 所有的属性都在类型ITableColumn中
 * prop为英文名, label为中文名, 并且prop都使用英文单数
 * 不要生成ITableColumn没有的属性
 * 为不同的字段，匹配正确的类型
 * 不要生成注释
 * 非字典类，不要生成isDict
 * 如果有component, 则在该代码块的顶部输出: import { markRaw } from 'vue'; 及import TheCusOperation from './components/TheCusOperation.vue'
 * 如果是字典类, 使用string类型的1位数的数字, 作为值
 * 不要再生成ts定义, 就按选中的即可
 * 根据名字，自动判断是否是字典, 如果是则定义属性isDict为true
 * 如果字典需要颜色区分，则按formatter的格式随机生成属性
 * 若没有特殊说明，不要生成这些属性: align, width,showOverflowTooltip,dictName
 * 不要生成序号
 * 不要使用随机函数
 * 没有特殊说明的字段，不要设置formatter
 * 如果有formatter或component，那么showOverflowTooltip设置为false
 * 不要import其它包或第三方工具
 * 定义formatter的格式: (val)=>`<span>${val}</span>`
 * 定义component的格式，使用这种格式"component: markRaw(TheCusOperation)"
 */

/**
 * 定义生成规则二
 * 定义格式：
 * 格式2：export const TableDemoData=[]；
 * 依照格式1的TableScheme按格式2生成假数据，其中：
 * 1. 确保要完整的12条假数据，不要省略；
 * 2. 为每条假数据添加id属性；
 * 3. 如果isDict为true, 说明其是数据字典, 要用编码值表示；
 * 4. 不要生成注释
 */

/**
 * 定义生成规则三
 * 定义格式：
 * 格式3：export const DemoDicts = {prop1:[], prop2:[]}
 * 依照格式1的TableScheme按格式3生成数据字典的假数据，其中：
 * 如果isDict为true，按格式2生成一份对应prop名的字典表，属性包括label和value，每个字典要有2到5个选项，使用中文作为label，使用1位数的字符串类型的数字编码作为value；
 * 不要生成注释
 */

/**
 * 定义生成规则四
 * 定义格式：
 * 格式4：export const DictKeys:string[] = [];
 * 依照格式1的TableScheme按格式4生成数据字典的枚举值key数组
 * 不要生成注释
 */

/**
 * @summary 表格列的配置项
 * @param {String} label 表格标题
 * @param {String} prop 表格列的字段名
 * @param {number} width 表格列的宽度, 默认auto
 * @param {string} align 表格列的对齐方式, 默认center
 * @param {Object} props 表格列的排序
 * @param {boolean} isDict 是否是字典
 * @param {string} dictName 字典对应的字段名, 若未传则取prop的值
 * @param {Component} component 表格列的自定义组件
 * @param {boolean} showOverflowTooltip 是否显示省略号
 */

import { Component } from 'vue';
export interface ITableColumn {
  label: string;
  prop: string;
  width?: number;
  align?: string;
  props?: any;
  formatter?: (val) => string;
  isDict?: boolean;
  dictName?: string;
  component?: Component;
  showOverflowTooltip?: boolean;
}
