import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages"
import Layouts from 'vite-plugin-vue-layouts'
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
  ]
})
