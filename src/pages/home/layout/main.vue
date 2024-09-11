<template>
  <main class="layout-main">
    <!--动态组件-->
    <el-scrollbar class="layout-main__scrollbar">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as 'string' || 'slide-right'">
          <!--vue3 需要再包一层div, 避免component是多元素与transition冲突-->
          <div style="height: 100%">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </el-scrollbar>
  </main>
</template>
<script setup lang="ts">
  // import { onBeforeRouteUpdate } from 'vue-router';

  // onBeforeRouteUpdate(() => {});
</script>
