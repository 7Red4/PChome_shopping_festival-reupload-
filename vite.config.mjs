import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages 專案頁面掛在 /<repo>/ 底下
  base: command === 'build' ? '/PChome_shopping_festival-reupload-/' : '/',
  server: {
    host: '0.0.0.0',
    port: 3002
  },
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
    }
  }
}));
