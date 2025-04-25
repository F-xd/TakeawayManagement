import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  // 这里是配置路径别名
  resolve: {
    alias: {
      '@': '/src',
      '@axios':'/src/utils/axios.js'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://8.137.157.16:9002',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')
      }
    }
  }

})
