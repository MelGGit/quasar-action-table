import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Pages from "vite-plugin-pages"
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
      template: { transformAssetUrls }
    }),
  quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    Pages(),
    Layouts(),
    Components({
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
