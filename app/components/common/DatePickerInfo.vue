<template>
  <div>
    <div class="flex items-center gap-4">
      <div class="relative group/time">
        <button
          class="flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-outline-variant/30 rounded-full hover:border-primary hover:shadow-[0_0_20px_rgba(88,86,214,0.5)] transition-all duration-300"
        >
          <span class="material-symbols-outlined text-[18px] text-primary-dim">calendar_today</span>
          <span class="text-sm text-slate-300">最近 7 天</span>
          <span
            class="material-symbols-outlined text-[18px] text-slate-500 group-hover/time:rotate-180 transition-transform duration-300"
          >
            expand_more
          </span>
        </button>
        <!-- Time Dropdown Menu -->
        <div
          class="absolute right-0 mt-2 w-40 opacity-0 invisible group-hover/time:opacity-100 group-hover/time:visible transition-all duration-300 transform origin-top-right group-hover/time:translate-y-0 translate-y-2 group-hover/time:scale-100 scale-95 z-50"
        >
          <div
            class="bg-slate-950/95 backdrop-blur-2xl border border-primary/50 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(88,86,214,0.3)] overflow-hidden"
          >
            <div class="p-1">
              <a
                class="block px-3 py-2 text-sm text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                href="#"
              >
                最近 24 小时
              </a>
              <a class="block px-3 py-2 text-sm text-primary bg-primary/5 rounded-lg transition-colors" href="#">
                最近 7 天
              </a>
              <a
                class="block px-3 py-2 text-sm text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                href="#"
              >
                最近 30 天
              </a>
              <a
                class="block px-3 py-2 text-sm text-slate-300 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors border-t border-outline-variant/10 mt-1 pt-2"
                href="#"
              >
                全部时间
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
