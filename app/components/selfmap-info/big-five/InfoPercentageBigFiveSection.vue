<template>
  <div class="lg:col-span-5 flex flex-col gap-6">
    <div class="bg-surface-container-highest rounded-lg p-8 border border-outline-variant/15 h-full">
      <div class="flex justify-between items-start mb-6">
        <div
          class="px-3 py-1 rounded-full bg-secondary-container text-secondary text-[10px] font-bold uppercase tracking-tighter"
        >
          核心标签
        </div>
        <div class="text-on-surface-variant font-label text-xs">生成时间: 2024.05.20</div>
      </div>
      <h2 class="text-3xl font-headline font-bold text-on-surface mb-4">敏锐的探索者</h2>
      <p class="text-on-surface-variant mb-8 leading-relaxed">
        你的测评结果显示出极高的经验开放性与适中的尽责性。你是一个既能仰望星空，又能脚踏实地的思考者。在复杂环境中，你倾向于通过直觉发现逻辑漏洞。
      </p>
      <div class="space-y-4">
        <div class="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
          <span class="material-symbols-outlined text-primary">auto_awesome</span>
          <div>
            <div class="text-sm font-bold text-on-surface">创新驱动力</div>
            <div class="text-xs text-on-surface-variant">在未知领域拥有 89% 的适应性</div>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low">
          <span class="material-symbols-outlined text-secondary">verified_user</span>
          <div>
            <div class="text-sm font-bold text-on-surface">稳健决策者</div>
            <div class="text-xs text-on-surface-variant">压力环境下的情绪稳定性超过 74% 的同类人</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">经验开放性</h4>
            <span class="text-2xl font-headline font-black">82</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            衡量对新体验的追求及对非传统观念的接受程度。高分者通常富有想象力，喜欢多样性而非常规。
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" style="width: 82%"></div>
        </div>
      </div>
      <div
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">尽责性</h4>
            <span class="text-2xl font-headline font-black">65</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            反映自律、有条理及追求成就的倾向。你在计划性上表现稳健，但在灵活性与规则之间保持着良好的平衡。
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" style="width: 65%"></div>
        </div>
      </div>
      <div
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">外向性</h4>
            <span class="text-2xl font-headline font-black">78</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            关注社交能力和积极情绪的表达。你擅长在群体中获取能量，并能通过沟通快速建立信任感。
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" style="width: 78%"></div>
        </div>
      </div>
      <div
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">亲和性</h4>
            <span class="text-2xl font-headline font-black">54</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            体现同情心与合作意愿。你在合作中保持中立，更看重客观事实而非单纯的人际和谐，具有较强的批判思维。
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" style="width: 54%"></div>
        </div>
      </div>
      <div
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">神经质</h4>
            <span class="text-2xl font-headline font-black">21</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            也称情绪稳定性。低分意味着极强的情绪调节能力，面对高压和突发状况能保持冷静、理智。
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" style="width: 21%"></div>
        </div>
      </div>
    </div> -->
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

.radar-grid {
  stroke: rgba(165, 165, 255, 0.1);
  stroke-width: 1;
}

.neon-glow {
  filter: drop-shadow(0 0 8px rgba(165, 165, 255, 0.6));
}

/* 对应原 HTML bolt 图标的 style="font-variation-settings: &quot;FILL&quot; 1" */
.mso-fill-1 {
  font-variation-settings: "FILL" 1;
}
</style>
