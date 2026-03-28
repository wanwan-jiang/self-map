// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    /**
     * common、register-login 下组件使用文件名注册（AuthTopBar、PopUp、AuthLoginForm 等），
     * 避免 CommonXxx / RegisterLoginXxx 与页面模板不一致。
     */
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
            path: "~/components",
            ignore: ["**/common/**", "**/register-login/**"],
        },
    ],
    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  // tailwindcss: {
  //     cssPath: '~/assets/css/main.css',
  //     exposeConfig: true,
  //   },
});
