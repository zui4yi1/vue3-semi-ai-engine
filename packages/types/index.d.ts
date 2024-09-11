/** 自定义组件增加ts类型 */
import '@vue/runtime-core';

import EgComponents from '../components/eg-components/index.vue';
import EgCurd from '../components/eg-curd/index.vue';
import EgDialog from '../components/eg-dialog/index.vue';
import EgDrawer from '../components/eg-drawer/index.vue';
import EgFormItem from '../components/eg-form-item/index.vue';
import EgForm from '../components/eg-form/index.vue';
import EgQuery from '../components/eg-query/index.vue';
import EgTable from '../components/eg-table/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    EgComponents: typeof EgComponents;
    EgCurd: typeof EgCurd;
    EgDialog: typeof EgDialog;
    EgDrawer: typeof EgDrawer;
    EgForm: typeof EgForm;
    EgFormItem: typeof EgFormItem;
    EgQuery: typeof EgQuery;
    EgTable: typeof EgTable;
  }
}
