# 新版本 `vite` 拦截开发服务器，并将服务替换成 `express`

`vite 版本 4.2+`

```ts
// vite.config.ts
import myPlugin from './myPlugin'
export default defineConfig({
    // ....
    plugins: [
        myPlugin()
    ]
```

[vite configureserver 参考文档](https://cn.vitejs.dev/guide/api-plugin.html#configureserver)

```ts
// myPlugin.ts
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

export default function myPlugin () {
    return {
        name: 'my-plugin',
        configureServer (server) {

            const app = express()

            app.use(cors({
                credentials: true,
                origin: true
            }))

            app.use(bodyParser.urlencoded({
                extended: false
            }))

            app.use(cookieParser())

            server.middlewares.use(app)

            app.use('/login', () => {
                // login
            })
        }
    }
}
```