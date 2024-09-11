import { PropType } from 'vue';
import { IScheme } from '../eg-form/_props';

/**
 * @summary
 * @description
 * @param {IScheme[]} schemes 表单的每项的配置项
 * @param {Object} form 表单的值
 * @param {Object} dicts 字典集数据
 * @param {Array} components 自定义组件集合
 * @param {String} emptyText 为空时的占位符
 */
export const props = {
  schemes: {
    type: Array as PropType<IScheme[]>,
    default: () => [],
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  dicts: {
    type: Object,
    default: () => ({}),
  },
  components: {
    type: Array,
    default: () => [],
  },
  emptyText: {
    type: String,
    default: '',
  },
};
