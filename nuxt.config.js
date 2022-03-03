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
    './assets/css/tailwind.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/vue-select'
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
    '@nuxtjs/auth',
    '@nuxtjs/apollo'

  ],

  apollo: {
    clientConfigs: {
      default: {
        httpLinkOptions: {
          credentials: 'include'
        },
        httpEndpoint: 'http://jobs.test/graphql',
      }
    }
  },

  auth: {
    strategies: {
      
      local :{
        provider: 'laravel/sanctum',
        endpoints: {
          login: {url: '/api/login', method: 'post', propertyName: false},
          logout: {url: '/api/logout', method: 'post'},
          user: {url: '/api/user', method: 'get', propertyName: false},
        },

        tokenRequired: false,
        tokenType: false
      },
      localStorage: false
    }
  },

  axios: {
    baseURL: 'http://jobs.test',
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
