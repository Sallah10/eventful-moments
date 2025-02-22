// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devServer: {
    port: 5000, // Change to another port if needed
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss']
})