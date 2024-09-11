<template>
  <div class="layout-breadcrumb flex-inline">
    <transition name="breadcrumb" mode="out-in">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, inx) in breadcrumbs" :key="item.path">
          <span
            class="layout-breadcrumb__text"
            :class="{ 'is-last': inx === breadcrumbs.length - 1 }"
          >
            {{ item.name }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { onBeforeRouteUpdate, useRouter } from 'vue-router';

  import { ArrowRight } from '@element-plus/icons-vue';

  import { useRoute } from 'vue-router';

  /** 面包屑列表 */
  const breadcrumbs = ref([] as IMenu[]);

  function setBreadCrumb(path: string) {
    const { options } = useRouter();
    const menus = options.routes[1].children || [];
    breadcrumbs.value = menus.filter((t) => t.path === path);
  }

  onBeforeMount(() => {
    const { path } = useRoute();
    setBreadCrumb(path);
  });

  onBeforeRouteUpdate(({ path }) => {
    setBreadCrumb(path);
  });
</script>
