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

  css: ['~/assets/style/main.css'],

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],
  
  app :{
    middleware: ['auth'],
    head :{
      title: 'Eventful Moments',
      meta:[
        {name:'description', content:'An Eventful Moment app where you can you add,uodate and delete all your memoreble moments'}
      ],
      link:[
        {rel: 'preconnect', href:'https://fonts.googleapis.com'},
        {rel: 'preconnect', href:'https://fonts.gstatic.com'},
        {rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'}
      ],
    }
  }
})