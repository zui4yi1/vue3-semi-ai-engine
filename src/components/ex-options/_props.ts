import { PropType } from 'vue';

/**
 * @summary
 * @description
 * @param {String} type 组件类型
 * @param {String, Number, Array} value 组件值
 * @param {Object} props 组件属性
 * @param {Array} list 组件的选项列表
 *
 */
export const props = {
  type: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Array],
    default: '',
  },
  props: {
    type: Object,
    default: () => {},
  },
  list: {
    type: Array as PropType<{ label: string; value: string }[]>,
    default: () => [],
  },
};
