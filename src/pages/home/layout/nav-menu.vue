<template>
  <el-scrollbar class="layout-nav-menu">
    <el-menu router :collapse="isCollapse" :default-active="defaultActive">
      <template v-for="menu in menus" :key="menu.id">
        <!--单个菜单-->
        <el-menu-item :index="menu.path">
          <template #title>
            <span>{{ menu.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

  const menus = ref<IMenu[]>([]);

  defineProps({
    isCollapse: Boolean,
  });

  /** 当前选中菜单 */
  const defaultActive = ref('');

  onBeforeMount(() => {
    const { path } = useRoute();
    const { options } = useRouter();
    menus.value = options.routes[1].children || [];
    // 初始选中菜单
    defaultActive.value = path;
  });
  onBeforeRouteUpdate(({ path }) => {
    // 监听路由变化, 设置选中菜单
    defaultActive.value = path;
  });
</script>
