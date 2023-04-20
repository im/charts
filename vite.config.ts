import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        pages({
            exclude: ['**/components/**/*.vue'],
            dirs: 'src/components/pages/',
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.vue'],
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
                find: 'components',
                replacement: resolve(__dirname, 'src/components')
            }
        ]
    }
})
