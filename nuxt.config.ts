export default defineNuxtConfig({
  app: {
    head: {
      title: "Cash'd AI - Understand your money",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Software development agency who builds AI apps for startups and businesses.' },

        // Open Graph (OG) tags
        { property: 'og:title', content: "Cash'd AI - Understand your money" },
        { property: 'og:description', content: 'Software development agency who builds AI apps for startups and businesses.' },
        { property: 'og:image', content: 'https://cashd.ai/images/twitter-card.png' },
        { property: 'og:url', content: 'https://cashd.ai' },
        { property: 'og:type', content: 'website' },

        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: "Cash'd AI - Understand your money" },
        { name: 'twitter:description', content: 'Software development agency who builds AI apps for startups and businesses.' },
        { name: 'twitter:image', content: 'https://cashd.ai/images/twitter-card.png' },
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