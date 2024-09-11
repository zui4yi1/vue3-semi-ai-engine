import 'default-passive-events';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

// import Components from '@/components/index'; // 批量注册全局组件
import Engines from '@/components/install.ts'; // 批量注册全局组件

import { initDemoDataBase } from 'demo-database';
initDemoDataBase();

// 修改分页器默认文字
zhCn.el.pagination.total = '共 {total} 条';
zhCn.el.pagination.goto = '跳至';
zhCn.el.pagination.pagesize = '条/页';
zhCn.el.pagination.pageClassifier = '页';

const app = createApp(App);
app.use(createPinia()).use(ElementPlus, { locale: zhCn }).use(Engines).use(router).mount('#app');
