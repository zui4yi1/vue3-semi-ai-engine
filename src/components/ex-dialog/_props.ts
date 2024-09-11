import { Component, PropType } from 'vue';

/**
 * 除了name和event之外, 其他属性都是el-button的属性
 * @param name 按钮名称
 * @param event 按钮对应的事件
 * @param type 即按钮的类型,如primary
 * @param icon 按钮的icon组件, 根据el-button的属性其为具体的组件, 而不是字符串
 * @param {Object} props 其它el-button的属性
 */
export interface IDialogFootButton {
  name: string;
  event: string;
  type?: string;
  icon?: Component;
  props?: any;
}

/**
 * @summary
 * @description
 * @param {String} title 弹窗标题
 * @param {String, Number} width 弹窗宽度, 默认820
 * @param {Array} btns 弹窗底部footer区域的按钮, 默认有一个取消
 * @param {Object} dialogProps 弹窗原生el-dialog的属性
 *
 */
export const props = {
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '820px',
  },

  btns: {
    type: Array as PropType<IDialogFootButton[]>,
    default: () => [
      {
        name: '提交',
        event: 'submit',
        type: 'primary',
      },
      {
        name: '取消',
        event: 'cancel',
      },
    ],
  },

  dialogProps: {
    type: Object,
    default: () => {},
  },
};
