<script setup lang="ts">
/**
 * @description SelfMap 注册入口页，承载用户从访问到创建账号的主路径。
 */

useHead({
  title: "SelfMap - 注册",
  htmlAttrs: {
    lang: "zh-CN",
    class: "dark",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});

const showPopUp = ref(false);
const message = ref<string | undefined>(undefined);
</script>

<template>
  <div class="min-h-screen bg-background text-on-surface font-['Plus_Jakarta_Sans'] selection:bg-primary/30">
    <AuthTopBar />
    <main class="relative flex flex-1 items-center justify-center overflow-hidden px-3 pb-3 pt-3 lg:pb-4 lg:pt-4">
      <div
        class="pointer-events-none absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        class="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-secondary/10 blur-[100px]"
      />
      <section
        class="relative z-10 grid w-full max-w-[980px] overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low lg:grid-cols-2"
      >
        <AuthMarketingPanel />
        <AuthRegisterForm
          @update:show="
            showPopUp = $event.show;
            message = $event.message;
          "
        />
      </section>
    </main>
    <AuthFooterLinks />
    <PopUp v-if="showPopUp" @close="showPopUp = false" :register="true" :message="message" />
  </div>
</template>
