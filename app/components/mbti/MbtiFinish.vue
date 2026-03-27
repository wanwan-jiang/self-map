<template>
  <div
    class="bg-background text-on-background font-body selection:bg-primary/30 antialiased overflow-x-hidden min-h-screen flex flex-col"
  >
    <main class="flex-grow flex flex-col items-center justify-center relative px-6 py-8 md:py-12">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[460px] h-[460px] cosmic-glow rounded-full" />
        <div class="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div class="relative z-10 w-full max-w-2xl flex flex-col items-center text-center -mt-4 md:-mt-6">
        <div class="relative mb-8 group">
          <div
            class="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"
          />
          <div class="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
            <div class="absolute inset-0 opacity-40">
              <svg class="w-full h-full animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color: rgb(165, 165, 255); stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: rgb(167, 144, 254); stop-opacity: 0" />
                  </radialGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#grad1)"
                  stroke-width="0.5"
                  stroke-dasharray="4 2"
                />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#a5a5ff" stroke-width="0.2" opacity="0.3" />
                <circle cx="60" cy="70" r="3" fill="#a5a5ff" />
                <circle cx="140" cy="80" r="2" fill="#a790fe" />
                <circle cx="100" cy="40" r="4" fill="#a5a5ff" />
                <circle cx="80" cy="140" r="2.5" fill="#fd8bcc" />
                <circle cx="130" cy="150" r="3" fill="#a5a5ff" />
                <path
                  d="M60 70 L100 40 L140 80 L130 150 L80 140 Z"
                  fill="none"
                  stroke="#a5a5ff"
                  stroke-width="0.5"
                  opacity="0.4"
                />
              </svg>
            </div>
            <div
              class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_50px_rgba(165,165,255,0.35)]"
            >
              <span class="material-symbols-outlined text-on-primary text-5xl md:text-6xl fill-symbol">psychology</span>
            </div>
          </div>
        </div>

        <div class="space-y-6 max-w-xl -mt-4 md:-mt-6">
          <h1 class="font-headline font-extrabold text-4xl md:text-6xl tracking-tight text-on-background">
            测评已完成
          </h1>
          <p class="text-on-surface-variant text-lg md:text-xl leading-relaxed">
            AI 正在对您的测试结果进行深度建模，
            <br class="hidden md:block" />
            开启您的自我探索之旅。
          </p>
        </div>

        <div class="mt-6 flex flex-col items-center gap-6 w-full">
          <NuxtLink
            to="/selfmap-info"
            class="group relative px-12 py-5 w-full max-w-xs rounded-full bg-primary-container text-on-primary-container font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(150,149,255,0.3)]"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              查看报告
              <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </NuxtLink>
          <a
            class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide py-2 border-b border-transparent hover:border-primary/30"
            href="#"
          >
            重新测评
          </a>
        </div>
      </div>
    </main>

    <nav
      class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#0f141a]/80 backdrop-blur-xl z-50 rounded-t-[2.5rem] shadow-[0_-8px_32px_rgba(165,165,255,0.06)]"
    >
      <a
        class="flex flex-col items-center justify-center text-[#f1f3fc]/40 hover:text-[#a5a5ff] transition-all active:scale-90"
        href="#"
      >
        <span class="material-symbols-outlined text-2xl">explore</span>
        <span class="text-[10px] font-medium mt-1">探索</span>
      </a>
      <a
        class="flex flex-col items-center justify-center bg-[#9695ff]/10 text-[#a5a5ff] rounded-full px-5 py-1.5 transition-all active:scale-90"
        href="#"
      >
        <span class="material-symbols-outlined text-2xl fill-symbol">psychology</span>
        <span class="text-[10px] font-medium mt-1">测试</span>
      </a>
      <a
        class="flex flex-col items-center justify-center text-[#f1f3fc]/40 hover:text-[#a5a5ff] transition-all active:scale-90"
        href="#"
      >
        <span class="material-symbols-outlined text-2xl">assessment</span>
        <span class="text-[10px] font-medium mt-1">报告</span>
      </a>
      <a
        class="flex flex-col items-center justify-center text-[#f1f3fc]/40 hover:text-[#a5a5ff] transition-all active:scale-90"
        href="#"
      >
        <span class="material-symbols-outlined text-2xl">person</span>
        <span class="text-[10px] font-medium mt-1">我的</span>
      </a>
    </nav>
    <div class="h-24 md:hidden" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "SelfMap AI - 测评完成",
  htmlAttrs: {
    lang: "zh-CN",
    class: "dark",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<style scoped>
.cosmic-glow {
  background: radial-gradient(circle at center, rgba(165, 165, 255, 0.15) 0%, rgba(10, 14, 20, 0) 70%);
}

.glass-panel {
  backdrop-filter: blur(24px);
  background: rgba(15, 20, 26, 0.6);
}

.fill-symbol {
  font-variation-settings: "FILL" 1;
}
</style>
