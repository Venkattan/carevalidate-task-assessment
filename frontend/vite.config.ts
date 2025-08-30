import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      // Alias React to prevent Apollo Client from trying to load it
      'react': 'vue',
      'react-dom': 'vue',
    },
    dedupe: ['vue'],
  },
  define: {
    // This helps resolve React-related issues in Apollo Client
    global: 'globalThis',
    // Prevent React-specific code from running
    'process.env.NODE_ENV': '"development"',
    // Fix CommonJS module issues
    module: 'undefined',
    'module.exports': '{}',
  },
  optimizeDeps: {
    exclude: [],
    include: ['graphql', 'graphql-ws', '@vue/apollo-composable', '@apollo/client/core'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying for subscriptions
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
