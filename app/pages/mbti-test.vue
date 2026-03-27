<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <header class="w-full bg-slate-950/80 backdrop-blur-xl">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div class="flex items-center gap-8">
          <div class='font-["Manrope"] text-2xl font-black tracking-tighter text-primary'>SelfMap</div>
          <div class="hidden md:flex gap-6">
            <a class="text-[#a5a5ff] border-b-2 border-[#a5a5ff] pb-1 font-medium transition-colors duration-300" href="#">测评</a>
            <a class="text-slate-400 hover:text-slate-100 font-medium transition-colors duration-300" href="#">报告</a>
            <a class="text-slate-400 hover:text-slate-100 font-medium transition-colors duration-300" href="#">发现</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="bg-transparent text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all">登录</button>
          <button class="bg-primary px-6 py-2 rounded-full text-on-primary-container font-bold text-sm hover:opacity-90 active:scale-95 transition-all">注册</button>
        </div>
      </div>
    </header>

    <main class="flex-grow flex flex-col items-center justify-center pt-8 pb-12 px-6">
      <div class="w-full max-w-3xl mb-12">
        <div class="flex justify-between items-end mb-4">
          <div class="flex flex-col">
            <span class="text-on-surface-variant text-sm font-label tracking-widest uppercase mb-1">Current Progress</span>
            <h2 class="text-3xl font-headline font-extrabold text-primary">1 <span class="text-on-surface-variant/40 font-light">/ 60</span></h2>
          </div>
          <span class="text-xs text-on-surface-variant font-medium bg-surface-container-high px-3 py-1 rounded-full">EST. 12 MIN LEFT</span>
        </div>
        <div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div class="h-full bg-primary w-[1.66%] rounded-full shadow-[0_0_15px_rgba(165,165,255,0.4)] transition-all duration-700" />
        </div>
      </div>

      <div class="w-full max-w-3xl flex flex-col gap-10">
        <div class="space-y-4 text-center md:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-dim text-xs font-bold tracking-widest uppercase">
            <span class="material-symbols-outlined text-sm">psychology</span>
            外向型 vs 内向型
          </div>
          <h1 class="text-3xl md:text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight">在社交场合中，你通常是：</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            class="group relative flex flex-col p-8 rounded-lg bg-surface-container-low border border-transparent hover:border-primary/40 hover:bg-surface-container-high transition-all duration-300 text-left items-start overflow-hidden active:scale-[0.98]"
          >
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <span class="text-primary-dim font-headline font-black text-4xl mb-6 group-hover:scale-110 transition-transform">A</span>
            <p class="text-xl font-body font-semibold text-on-surface leading-relaxed z-10">充满活力并主动交谈</p>
            <div class="mt-8 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="text-sm font-bold tracking-tighter">SELECT THIS PATH</span>
              <span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
            </div>
          </button>

          <button
            class="group relative flex flex-col p-8 rounded-lg bg-surface-container-low border border-transparent hover:border-primary/40 hover:bg-surface-container-high transition-all duration-300 text-left items-start overflow-hidden active:scale-[0.98]"
          >
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <span class="text-primary-dim font-headline font-black text-4xl mb-6 group-hover:scale-110 transition-transform">B</span>
            <p class="text-xl font-body font-semibold text-on-surface leading-relaxed z-10">保持安静并倾向于倾听</p>
            <div class="mt-8 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="text-sm font-bold tracking-tighter">SELECT THIS PATH</span>
              <span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
            </div>
          </button>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-outline-variant/15">
          <button class="flex items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors font-semibold group disabled:opacity-30" disabled>
            <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">west</span>
            上一题
          </button>
          <div class="flex items-center gap-4">
            <p class="text-on-surface-variant text-xs font-medium italic hidden md:block">答案将自动保存并生成您的性格地图</p>
            <button class="flex items-center gap-3 bg-surface-container-highest px-8 py-3 rounded-full text-on-surface font-bold hover:bg-primary hover:text-on-primary-container transition-all active:scale-95 group">
              下一题
              <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
            </button>
          </div>
        </div>
      </div>

      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </main>

    <footer class="bg-background w-full py-12 mt-auto border-t border-slate-800/15">
      <div class="flex flex-col items-center gap-6 px-8 w-full max-w-7xl mx-auto">
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-slate-200 font-headline">SelfMap</span>
          <span class="w-1 h-1 bg-primary rounded-full" />
          <span class="text-slate-500 text-sm font-body">探索未知的自己</span>
        </div>
        <div class="flex gap-8">
          <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">关于我们</a>
          <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">隐私政策</a>
          <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">服务条款</a>
          <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">联系我们</a>
        </div>
        <p class="text-primary text-sm font-body tracking-wide">© 2024 SelfMap. 认知光芒，指引成长。</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'SelfMap - MBTI 测试',
  htmlAttrs: {
    lang: 'zh-Hans',
    class: 'dark',
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
    },
  ],
})
</script>
