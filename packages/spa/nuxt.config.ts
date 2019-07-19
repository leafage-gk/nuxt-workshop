const environment = process.env.NODE_ENV || 'development'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envSet = require(`./config/env.${environment}`)

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        rel: 'stylesheet',
      },
    ],
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    ],
    title: 'Nuxt Workshop',
  },

  env: envSet,

  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#fff'},

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/filters', '~/plugins/inject'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/moment',
      {
        defaultLocale: 'ja',
        locales: ['ja'],
      },
    ],
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
  ],

  vuetify: {
    // Vuetify options
    theme: {
      primary: '#e91e63',
      secondary: '#9c27b0',
      accent: '#8bc34a',
      error: '#f44336',
      warning: '#ffc107',
      info: '#00bcd4',
      success: '#009688',
    },
  },

  /*
   ** Build configuration
   */
  build: {
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl'],
      },
    },
  },

  generate: {
    dir: '../firebase/public/spa',
  },

  // router: {
  //   middleware: 'authenticated',
  // },
}
