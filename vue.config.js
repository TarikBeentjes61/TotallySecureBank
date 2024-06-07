const { defineConfig } = require('@vue/cli-service')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicPath: '/TotallySecureBank/',
  plugins: [vue()],
})
