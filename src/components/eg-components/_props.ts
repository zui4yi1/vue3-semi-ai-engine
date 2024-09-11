/**
 * @summary 元组件component的扩展
 * @description 可传入多个动态组件, 使得vue的动态组件可像react一样玩耍
 * @param {String} type 组件名字
 * @param {Array} components 组件数组, 通过import引入的组件
 * @param {String} value 组件值
 * @param {Object} props 自定义组件的属性
 *
 */
export const props = {
  type: {
    type: String,
    default: '',
  },
  components: {
    type: Array,
    default: () => [],
  },
  value: {
    type: String,
    default: '',
  },
  props: {
    type: Object,
    default: () => {},
  },
};
