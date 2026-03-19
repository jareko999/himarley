export default defineNuxtConfig({
  app: {
    head: {
      title: "Jarek Ostrowski",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A timeline of my life — from 1988 to today.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: "/favicon.ico" }
      ]
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  modules: ['nuxt-gtag'],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})