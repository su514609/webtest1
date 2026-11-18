import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command }) => ({
  // GitHub Pages 项目页地址为 /<repo>/，构建时必须带上子路径前缀，否则资源 404 白屏
  base: command === 'build' ? '/webtest1/' : '/',
  plugins: [
    vue(),
    tailwindcss(),
    viteCompression({
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue-router') || id.includes('pinia') || id.includes('vue')) {
              return 'vue-vendor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
}))
