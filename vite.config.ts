import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/charts/',
    plugins: [
        vue(),
        // pages({
        //     exclude: ['**/components/**/*.vue'],
        //     dirs: 'src/components/pages/',
        // })
    ],
    server: {
        hmr: true
    },
    css: {
        preprocessorOptions: {
            stylus: {
                globals: {
                    '$color-g1': '#F3F4FC',
                    '$color-white': '#FFFFFF',
                },
                additionalData: `@import "${resolve(__dirname, 'src/style/base/mixins.styl')}"`,
            },
        },
    },
    resolve: {
        // extensions: ['.js', '.ts', '.vue'],
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src')
            },
            {
                find: 'stores',
                replacement: resolve(__dirname, 'src/stores')
            },
            {
                find: 'style',
                replacement: resolve(__dirname, 'src/style')
            },
            {
                find: 'components',
                replacement: resolve(__dirname, 'src/components')
            }
        ]
    }
})
