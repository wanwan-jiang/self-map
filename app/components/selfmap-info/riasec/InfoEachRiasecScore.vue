<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../../types/selfmapReportType";

/**
 * @description 大五人格各维度得分卡片：标题、说明、进度条（与 pages/example 抽离稿样式一致）。
 */
defineOptions({
  name: "InfoEachScore",
});

defineProps<{
  /** 报告页传入；后续可用 stats 驱动各维分数与文案 */
  model?: SelfmapReportHeaderModel;
}>();

interface BigFiveScoreCardItem {
  title: string;
  score: number;
  description: string;
}

const BIG_FIVE_SCORE_CARDS: BigFiveScoreCardItem[] = [
  {
    title: "经验开放性",
    score: 82,
    description: "衡量对新体验的追求及对非传统观念的接受程度。高分者通常富有想象力，喜欢多样性而非常规。",
  },
  {
    title: "尽责性",
    score: 65,
    description: "反映自律、有条理及追求成就的倾向。你在计划性上表现稳健，但在灵活性与规则之间保持着良好的平衡。",
  },
  {
    title: "外向性",
    score: 78,
    description: "关注社交能力和积极情绪的表达。你擅长在群体中获取能量，并能通过沟通快速建立信任感。",
  },
  {
    title: "亲和性",
    score: 54,
    description: "体现同情心与合作意愿。你在合作中保持中立，更看重客观事实而非单纯的人际和谐，具有较强的批判思维。",
  },
  {
    title: "神经质",
    score: 21,
    description: "也称情绪稳定性。低分意味着极强的情绪调节能力，面对高压和突发状况能保持冷静、理智。",
  },
];
</script>

<template>
  <div class="lg:col-span-12 flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div
        v-for="item in BIG_FIVE_SCORE_CARDS"
        :key="item.title"
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors"
      >
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">{{ item.title }}</h4>
            <span class="text-2xl font-headline font-black">{{ item.score }}</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            {{ item.description }}
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" :style="{ width: `${item.score}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>
