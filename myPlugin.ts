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