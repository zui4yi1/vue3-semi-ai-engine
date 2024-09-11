# 半 AI 代码引擎 vue3-semi-ai-engine

这是一个基于 vue3 的半 AI 代码引擎，内置了许多功能强大的引擎组件。通过搭配 “通义灵码”大语言模型(vscode 插件)，即可实现 1 分钟就快速搭建好 demo 页面的效果。

## 引擎组件列表:

以下是 5 个引擎组件及简要说明(**点击组件名可跳到详情**)：

- **[`EgComponents`](#EgComponents)**: `vue` 原生元组件 `component` 的扩展，数组形式，可同时管理多个组件。
- **[`EgCurd`](#EgCurd)**: 引擎式查询组件，集成了查询与列表。与`EgForm`搭配使用，即可实现完整的 `CRUD` 功能，且开发者仅需考虑配置问题，而无须写代码。
- **[`EgForm`](#EgForm)**: 引擎式表单组件，统一管理详情、新增、编辑等表单功能。
- **[`EgDialog`](#EgDialog)**: 引擎式弹窗组件，不论页面内有多少弹窗，都可统一管理显隐。
- **[`EgDrawer`](#EgDialog)**: 引擎式抽屉组件，不论页面内有多少抽屉，都可统一管理显隐。

## 快速开始

- 安装

```
npm i vue3-semi-ai-engine
或
yarn add vue3-semi-ai-engine
```

- main.js 全局组件注册

```
import { createApp } from 'vue';
import vue3SemiAiEngine from 'vue3-semi-ai-engine';

const app = createApp(App);
app.use(vue3SemiAiEngine);
```

## 组件 API

### 1. <span id="user-content-EgComponents"> EgComponents<span>

`vue` 原生元组件 `component` 的扩展，数组形式，可同时管理多个组件

#### 组件属性

```
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
```

#### 组件方法

```
  defineExpose({
    onOpen,
    onClose,
    onCusEvent,
  });
```

**注意：**
子组件内也至少需要实现上述三个方法

#### 组件事件

```
defineEmits(['change']);
```

#### 组件用法

template:

```
<eg-components :type="componentName" :components="[Com1, Com2]" />

```

js:

```
import Com1 from 'XXX1';
import Com2 from 'XXX2';
const componentName = ref<'Com1'|'Com2'>('Com1');
```

**注意：**
组件 Com1 内需要定义组件名 `name:XXX`, 这样才能准确的识别

### 2. <span id="user-content-EgCurd"> EgCurd<span>

引擎式查询组件，集成了查询与列表。与`EgForm`搭配使用，即可实现完整的 `CRUD` 功能，且开发者仅需考虑配置问题，而无须写代码

#### 组件属性

```
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
```

#### 组件方法

```
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
```

#### 组件事件

为避免太多，走统一转发的方式，共四个:

- 由查询表单`eg-form`触发的统一由`onQueryFormEvent`转发
- 由列表`el-table`触发的统一由`onTableEvent`转发
- 由分页`el-pagination`触发的统一由`onPaginationEvent`转发
- 其它所有的自定义事件则由`onCusEvent`转发。

```
defineEmits(['onFormChangeEvent', 'onTableEvent', 'onPaginationEvent', 'onCusEvent']);
```

#### 组件用法

```
<EgCurd
    ref="EgCurdRef"
    :querySchemes="Schemes.QueryScheme"
    :tableSchemes="Schemes.TableScheme"
    :dicts="dicts"
    :queryApi="DemoCurd.getList"
    :egQueryProps="{
    egFormProps: {
        labelWidth: 100,
        contentWidth: 160,
    },
    }"
    :egTableProps="{
    isSelectable: true,
    height: 'calc(100vh - 300px)',
    }"
    @onTableEvent="handleTableEvent"
    @onCusEvent="handleCusEvent"
>
    <template #controls>
    <el-button type="primary" @click="checkAll">全选</el-button>
    <el-button type="primary" @click="handleCusEvent('new')">新增</el-button>
    <el-button
        type="primary"
        :disabled="selectRows.length === 0"
        @click="handleCusEvent('batchDelete')"
    >
        删除已选{{ selectRows.length }}项
    </el-button>
    </template>
</EgCurd>
```

### 3. <span id="user-content-EgForm"> EgForm<span>

引擎式表单组件，统一管理详情、新增、编辑等表单功能。即一个`<EgForm>`即可实现新增、编辑、详情的渲染。

**注意：**
`EgForm`组件的表单值是采用单向数据流形式的, 而不是双向绑定的。如编辑的时候传入的表单值`detail`，在表单修改后，并不会反向修改你传入的`detail`。

引擎类组件都应该采用单向的方式，而不允许反向修改。也因此为避免混淆才使用`detail`作为表单属性的名字，而不是一般的`value`, `data`, `formData`等。

#### 组件属性

```
/** 表单模式 */
export type IFormMode = 'new' | 'edit' | 'detail';

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

```

**上述 schemes 的类型 IScheme 的详情定义是:**

```
/**
 * @param {Component | string} head 表单头部组件, 组件对象或组件的string名称, 如果你的组件已注册为全局组件的话用string名称更方便
 * @param {Object} headProps 表单头部组件的属性
 * @param {ISchemeItem[]} items 表单配置项
 */
export interface IScheme {
  head?: Component | string;
  headProps?: any;
  items: ISchemeItem[];
}
```

**上述 ISchemeItem 的类型定义是:**

```
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


```

#### 组件方法

```
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
```

#### 组件事件

```
// 表单数据变化时触发
defineEmits(['onFormChange'])

// 参数：prop, val, {setPropVal, formData}
emits('onFormChange', prop, val, {
    setPropVal,
    formData: _cloneData(),
});
```

####

#### 组件用法

```
<EgForm
    ref="EgFormRef"
    :mode="mode"
    :schemes="Schemes.FormScheme"
    :rules="Schemes.FormRules || {}"
    :detail="curDetail"
    :dicts="dicts"
    @onFormChange="handleFormChange"
/>
```

### 4. <span id="user-content-EgDialog"> EgDialog (EgDrawer 与之完全相同)<span>

引擎式弹窗组件，不论页面内有多少弹窗，都可统一管理显隐。

#### 组件属性

就一个 components

```
/**
* @param {Array} components 自定义组件列表
*/
defineProps({
    components: {
        type: Array,
        default: () => [],
    },
});
```

#### 组件方法

```
export type IEgDialog = {
  /** 打开弹窗 */
  openDialog: IOpenDialog;
  /** 关闭 */
  close: () => void;
  /** 更新底部按钮 */
  updateFooterBtns: (btns: any[]) => void;
  /** 获取底部按钮 */
  getFooterBtns: () => any[];
  /** 更新底部按钮状态, 即是否disabled, 通过事件名来搜索目标 */
  updateFootBtnStatus: (eventName: string, disabled: boolean) => void;
};
```

其中 IOpenDialog 的定义是：

```
/**
 * 打开弹窗
 * @description 四个参数, 后二个可选
 * @param componentName 组件名
 * @param title 弹窗标题
 * @param componentOptions 自定义组件onOpen接收的参数
 * @param props el-dialog的原生组件属性
 *
 */
export type IOpenDialog = (
  componentName: string,
  title: string,
  componentOptions?: Record<string, any>,
  props?: {
    dialogProps?: Record<string, any>;
    btns?: IDrawerFootButton[];
    width?: number;
  },
) => void;
```

#### 组件事件

无

#### 组件用法

template:

```
<EgDialog ref="EgDialogRef" :components="[TheForm, Com1, Com2, Com3]"  />
```

**注意**
无事件，相应的事件在子组件如 `TheForm` 内定义即可，事件与 ElComponents 的完全相同，即：

```
  defineExpose({
    onOpen, // 打开时初始化TheForm的数据
    onClose, // 关闭时一般用于清空表单数据，避免下次打开时旧数据闪一下
    onCusEvent, // 所有的自定义事件，统一管理
  });
```
