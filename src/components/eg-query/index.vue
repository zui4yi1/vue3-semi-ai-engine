<template>
  <div class="search-card">
    <eg-form
      ref="EgFormRef"
      mode="new"
      :schemes="querySchemes"
      :dicts="dicts"
      v-bind="egFormProps"
      @onFormChange="handleFormChange"
    >
      <template #append>
        <el-form-item label-width="0">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button plain @click="handleReset">重置</el-button>
        </el-form-item>
      </template>
    </eg-form>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'eg-query',
  };
</script>

<script setup lang="ts">
  import { ref } from 'vue';
  import { IEgForm } from '../eg-form/_props';
  import EgForm from '../eg-form/index.vue';
  import { props } from './_props';

  defineProps(props);
  const emits = defineEmits(['query', 'onFormChange']);

  const EgFormRef = ref({} as IEgForm);

  async function handleQuery() {
    emits('query');
  }

  function handleFormChange(...arr: any[]) {
    emits('onFormChange', ...arr);
  }

  async function getQueryFormData() {
    const formData = await EgFormRef.value?.getFormFilterEmpty();
    return formData;
  }

  function handleReset() {
    EgFormRef.value?.reset();
    handleQuery();
  }

  defineExpose({
    getQueryFormData,
  });
</script>
