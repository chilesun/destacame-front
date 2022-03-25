export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Destaca Bus',
    htmlAttrs: {
      lang: 'es'
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
    '@/assets/sass/main.sass'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/helpers.js',
    '~/plugins/vue-select.js',
    '~/plugins/http.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  // https://google-fonts.nuxtjs.org/options
  googleFonts: {
    families: {
      Roboto: ['400'],
      Montserrat: ['800'] 
    },
    download: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [,
    '@nuxt/http',
    '@nuxtjs/style-resources'
  ],
  http: {
    baseURL: 'http://127.0.0.1:8000/api/',
  },
  styleResources: {
    sass: ['./assets/sass/*.sass']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
