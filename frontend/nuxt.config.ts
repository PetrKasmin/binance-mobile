export default defineNuxtConfig({
    ssr: false,
    dev: process.env.NODE_ENV !== 'production',
    appConfig: {
        env: {
            url: process.env.BASE_URL ?? 'http://localhost:3000',
            api: process.env.API_URL ?? 'http://localhost:1000',
        },
    },
    css: ['vuetify/lib/styles/main.sass'],
    modules: [
        '@pinia/nuxt',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})