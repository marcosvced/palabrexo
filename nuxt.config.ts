// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    experimental: {
        renderJsonPayloads: true,
        decorators: true
    },
    vite: {
        esbuild: false,
    },
    modules: ['@pinia/nuxt'],
    css: [
        '~/src/lib/assets/styles/main.css',
    ],
    dir: {
        pages: './src/pages/',
        plugins: './src/lib/plugins'
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
        }
    }
})
