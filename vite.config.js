import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // 部署在 https://<用户名>.github.io/giants-girdle/，所以 base 用仓库名子路径。
  // 如果以后换到自定义域名或 username.github.io 根站点，把这里改成 '/'。
  base: '/giants-girdle/',
  plugins: [vue(), VueDevTools()],
  build: {
    // 单文件接近 2MB 的缩略图会触发默认 500KB 的警告，这里抬高一点，
    // 真正的优化留到后面（压缩图片）再做。
    chunkSizeWarningLimit: 2200,
  },
})
