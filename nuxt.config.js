export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Gamify",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "description",
        name: "description",
        content:
          "This is not an official website. This website was made by a university student for learning purposes only. I do not own any of the articles or images on this website. I do not own any of the content except for the code. Thank you.",
      },
      { name: "keywords", content: "Gamify" },
      {
        hid: "og:title",
        name: "og:title",
        content: "Gamify",
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "Gamify",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "This is not an official website. This website was made by a university student for learning purposes only. I do not own any of the articles or images on this website. I do not own any of the content except for the code. Thank you.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/tailwind.css", "~/assets/css/index.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/dotenv",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    preference: "light",
    classSuffix: "",
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: "0.0.0.0",
    port: 9000,
  },
};
