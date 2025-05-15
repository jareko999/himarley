export default defineNuxtConfig({
  app: {
    head: {
      title: "We build AI Apps",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Software development agency who builds AI apps for startups and businesses.' },

        // Open Graph (OG) tags
        { property: 'og:title', content: 'We build AI Apps' },
        { property: 'og:description', content: 'Software development agency who builds AI apps for startups and businesses.' },
        { property: 'og:image', content: 'https://webuildaiapps.com/images/twitter-card.png' },
        { property: 'og:url', content: 'https://webuildaiapps.com' },
        { property: 'og:type', content: 'website' },

        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'We build AI Apps' },
        { name: 'twitter:description', content: 'Software development agency who builds AI apps for startups and businesses.' },
        { name: 'twitter:image', content: 'https://webuildaiapps.com/images/twitter-card.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: "/images/favicon.png" }
      ]
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  modules: ['nuxt-gtag'],
  gtag: {
    id: 'G-XXXXXXXXXX'
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    mailersend: {
      apiKey: process.env.MAILERSEND_KEY // Ensure it's in the private section
    },
  },
})