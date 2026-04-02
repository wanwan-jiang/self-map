// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  routeRules: {
    "/login": { ssr: false },
    "/register": { ssr: false },
  },

  //忽略组件注册目录
  components: [
    {
      path: "~/components/common",
      pathPrefix: false,
    },
    {
      path: "~/components/register-login",
      pathPrefix: false,
    },
    {
      path: "~/components/selfmap-info",
      pathPrefix: false,
    },
    {
      path: "~/components/person-test",
      pathPrefix: false,
    },
    {
      path: "~/components",
      ignore: ["**/common/**", "**/register-login/**", "**/selfmap-info/**", "**/person-test/**"],
    },
  ],
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-mongoose", "nuxt-auth-utils"],
  runtimeConfig: {
    qwenApiKey: import.meta.env.QWEN_API_KEY || "",
  },
  css: ["~/assets/css/main.css"],
  mongoose: {
    uri: import.meta.env.NUXT_MONGOOSE_URI,
  },
});
