import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'zh-CN',
    messages: {
        'zh-CN': {
            hello: '你好，世界！'
        },
        'en-US': {
            hello: 'Hello, World!'
        }
    }
})

export default i18n