/** 自定义组件增加ts类型 */
import '@vue/runtime-core';

import EgComponents from '@/components/eg-components/index.vue';
import EgCurd from '@/components/eg-curd/index.vue';
import EgDialog from '@/components/eg-dialog/index.vue';
import EgDrawer from '@/components/eg-drawer/index.vue';
import EgForm from '@/components/eg-form/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    EgComponents: typeof EgComponents;
    EgCurd: typeof EgCurd;
    EgDialog: typeof EgDialog;
    EgDrawer: typeof EgDrawer;
    EgForm: typeof EgForm;
  }
}
