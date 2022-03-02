export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jobs-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'

  ],

  auth: {
    strategies: {
      
      local :{
        endpoints: {
          login: {url: 'api/login', method: 'post', propertyName: false},
          logout: {url: 'api/logout', method: 'post'},
          user: {url: 'api/user', method: 'get', propertyName: false},
        },

        tokenRequired: false,
        tokenType: false
      },
      localStorage: false
    }
  },

  axios: {
    baseURL: 'http://jobs.test:8000',
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
