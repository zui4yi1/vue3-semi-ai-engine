import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
const resolve = (dir: string) => path.join(__dirname, dir);

export default defineConfig({
  plugins: [vue()],
  envPrefix: 'VUE_APP',
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  server: {
    // 配置前端服务地址和端口
    //服务器主机名
    host: '0.0.0.0',
    //端口号
    port: 5000,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: false,
    proxy: {
      '/api': {
        target: 'http://172.19.2.37:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '/api'),
      },
    },
  },
});
