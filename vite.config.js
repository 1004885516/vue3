import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': '/src',
  },
  define: {
    'process.env': {
      VUE_APP_REQUEST_URL: 'http://172.31.11.246:7001'
    }
  }
})
