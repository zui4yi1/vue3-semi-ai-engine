import EgComponents from './eg-components/index.vue';
import EgCurd from './eg-curd/index.vue';
import EgDialog from './eg-dialog/index.vue';
import EgDrawer from './eg-drawer/index.vue';
import EgFormItem from './eg-form-item/index.vue';
import EgForm from './eg-form/index.vue';
import EgQuery from './eg-query/index.vue';
import EgTable from './eg-table/index.vue';

const commonComponents: Record<string, any> = {
  EgComponents,
  EgCurd,
  EgDialog,
  EgDrawer,
  EgForm,
  EgFormItem,
  EgQuery,
  EgTable,
};

export default {
  install(Vue: { component: (arg0: string, arg1: any) => void }) {
    Object.keys(commonComponents).forEach((key) => {
      Vue.component(key, commonComponents[key]);
    });
  },
};
