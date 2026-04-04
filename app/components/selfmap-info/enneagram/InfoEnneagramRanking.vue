<template>
  <div class="flex h-full flex-col space-y-6 md:col-span-5">
    <div
      class="flex h-full min-h-[500px] flex-col rounded-lg border border-primary/5 bg-surface-container-high p-6"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-headline text-xl font-bold">人格镜像</h3>
        <span class="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded">TOP 3 TYPE</span>
      </div>
      <div class="space-y-4">
        <!-- Type 5 -->
        <div class="p-4 bg-surface-container-highest rounded-lg flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
              5
            </div>
            <div>
              <div class="text-sm font-bold">理智型</div>
              <div class="text-[10px] text-on-surface-variant">核心驱动: 观察与分析</div>
            </div>
          </div>
          <div class="text-primary font-headline font-bold">92%</div>
        </div>
        <!-- Type 7 -->
        <div class="p-4 bg-surface-container-low/50 rounded-lg flex items-center justify-between opacity-80">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary font-bold">
              7
            </div>
            <div>
              <div class="text-sm font-bold">活跃型</div>
              <div class="text-[10px] text-on-surface-variant">核心驱动: 体验与可能性</div>
            </div>
          </div>
          <div class="text-tertiary font-headline font-bold">78%</div>
        </div>
        <!-- Type 9 -->
        <div class="p-4 bg-surface-container-low/50 rounded-lg flex items-center justify-between opacity-80">
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-bold"
            >
              9
            </div>
            <div>
              <div class="text-sm font-bold">和平型</div>
              <div class="text-[10px] text-on-surface-variant">核心驱动: 内在和谐</div>
            </div>
          </div>
          <div class="text-secondary font-headline font-bold">65%</div>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-outline-variant/15">
        <p class="text-xs leading-relaxed text-on-surface-variant">
          你的主要能量集中在
          <span class="text-primary font-bold">思考中心</span>
          。在面对复杂环境时，你倾向于先退后观察，收集信息，这种理智带来的掌控感是你安全感的来源。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "测评报告 - SelfMap",
  htmlAttrs: {
    lang: "zh-CN",
    class: "dark",
  },
  meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
  bodyAttrs: {
    class: "bg-background text-on-surface font-body selection:bg-primary/30",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;600;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

.editorial-gradient-text {
  background: linear-gradient(135deg, #7858f6 0%, #b2a1ff 100%);
}

.ring-segment {
  transition: transform 0.3s ease;
}

.ring-segment:hover {
  transform: scale(1.02);
  filter: brightness(1.2);
}
</style>
