import { PropType } from 'vue';
import { IFormMode } from '../eg-form/_props';

export const props = {
  mode: {
    type: String as PropType<IFormMode>,
    default: 'new',
  },
  form: {
    type: Object,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Boolean, Object, Array],
    default: undefined, // 注意此处为undefined, 不能有默认值, 默认会影响初始化的判断
  },
  type: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: '',
  },
  props: {
    type: Object,
    default: () => {},
  },
  rules: {
    type: Object,
    default: () => undefined, // 注意此处为undefined, 否则会覆盖form层级的
  },
  /** 作用于el-form-item的原生属性 */
  formItemProps: {
    type: Object,
    default: () => {},
  },
  width: {
    type: Number,
    default: 320,
  },
};
