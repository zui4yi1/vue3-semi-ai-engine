<template>
  <el-container class="home-layout">
    <el-header height="60px">
      <Header />
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '66px' : '240px'">
        <NavMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-main>
        <Breadcrumb />
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Breadcrumb from './layout/breadcrumb.vue';
  import Header from './layout/header.vue';
  import Main from './layout/main.vue';
  import NavMenu from './layout/nav-menu.vue';

  import { ref } from 'vue';

  const isCollapse = ref(false);
</script>
