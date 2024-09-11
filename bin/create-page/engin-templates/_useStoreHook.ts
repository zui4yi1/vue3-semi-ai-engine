import { IEgCurd } from '@/components/eg-curd/_props';
import { IEgDrawer } from '@/components/eg-drawer/_props';
import { IEgForm } from '@/components/eg-form/_props';

// import { IEgCurd } from 'vue3-semi-ai-engine/components/eg-curd/_props';
// import { IEgDrawer } from 'vue3-semi-ai-engine/components/eg-drawer/_props';
// import { IEgForm } from 'vue3-semi-ai-engine/components/eg-form/_props';

import * as DemoCurd from 'demo-curd';
import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import * as Constants from './_constants';
import * as DemoData from './_demoData';

export const useStoreHook = defineStore('useXXXStoreHook', () => {
  const dicts = ref<IDicts>({});

  /** 增删查改一般就用到这三个ref */
  const EgCurdRef = ref({} as IEgCurd);
  const EgDrawerRef = ref({} as IEgDrawer);
  const EgFormRef = ref({} as IEgForm);

  const curDetail = ref({} as Record<string, any>);
  const selectRows = ref([] as Record<string, any>[]);

  async function del(id: string) {
    await DemoCurd.deleteItem(id);
    EgCurdRef.value?.queryListWithoutResetPager?.();
  }

  async function get(id: string) {
    const res = await DemoCurd.getItem(id);
    curDetail.value = res.data;
  }

  async function add(data: Record<string, any>) {
    await DemoCurd.addItem(data);
    EgCurdRef.value?.queryList?.();
  }

  async function update(data: Record<string, any>) {
    await DemoCurd.updateItem(data);
    EgCurdRef.value?.queryListWithoutResetPager?.();
  }

  async function batchDelete(ids: string[]) {
    await DemoCurd.batchDelete(ids);
    EgCurdRef.value?.queryListWithoutResetPager?.();
  }

  /** 初始化demo数据 */
  function initDemoData() {
    DemoCurd.setList(DemoData.TableDemoData);
    DemoCurd.setDict(DemoData.DemoDicts);
  }
  onBeforeMount(async () => {
    initDemoData();
    DemoCurd.getDicts(Constants.DictKeys).then(({ data }: { data: IDicts }) => {
      dicts.value = data;
    });
  });
  return {
    EgCurdRef,
    EgFormRef,
    EgDrawerRef,

    dicts,
    curDetail,
    selectRows,

    update,
    add,
    del,
    get,
    batchDelete,
  };
});
