<template>
  <footer class="mt-auto w-full border-t border-slate-800/20 bg-background py-12">
    <div class="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-8">
      <div class="font-[&quot;Manrope&quot;] text-lg font-bold text-slate-200">SelfMap</div>
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
        <NuxtLink class="text-sm text-slate-500 transition-colors hover:text-slate-300" to="/website-marked/about">
          关于我们
        </NuxtLink>
        <NuxtLink class="text-sm text-slate-500 transition-colors hover:text-slate-300" to="/website-marked/privicy">
          隐私政策
        </NuxtLink>
        <NuxtLink
          class="text-sm text-slate-500 transition-colors hover:text-slate-300"
          to="/website-marked/disclaimerClause"
        >
          免责声明
        </NuxtLink>
        <NuxtLink class="text-sm text-slate-500 transition-colors hover:text-slate-300" to="/website-marked/contact">
          联系我们
        </NuxtLink>
      </div>
      <div class="text-center text-sm text-slate-500">© 2024 SelfMap. 认知光芒，指引成长。</div>
    </div>
  </footer>
</template>
