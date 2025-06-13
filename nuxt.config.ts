export default defineNuxtConfig({
  app: {
    head: {
      title: "Take my trash - Dump runs for $20",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'On demand trash pickup service serving Bedford, NH' },

        // Open Graph (OG) tags
        { property: 'og:title', content: "Take my trash - Dump runs for $20" },
        { property: 'og:description', content: 'On demand trash pickup service serving Bedford, NH' },
        { property: 'og:image', content: 'https://www.takemytrash.net/images/twitter-card.png' },
        { property: 'og:url', content: 'https://www.takemytrash.net' },
        { property: 'og:type', content: 'website' },

        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: "Take my trash - Dump runs for $20" },
        { name: 'twitter:description', content: 'On demand trash pickup service serving Bedford, NH' },
        { name: 'twitter:image', content: 'https://www.takemytrash.net/images/twitter-card.png' },
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