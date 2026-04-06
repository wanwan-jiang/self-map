<template>
  <div class="lg:col-span-5 flex flex-col gap-6">
    <div class="bg-surface-container-highest rounded-lg p-8 border border-outline-variant/15 h-full">
      <div class="flex justify-between items-start mb-6">
        <div
          class="px-3 py-1 rounded-full bg-secondary-container text-secondary text-[10px] font-bold uppercase tracking-tighter"
        >
          AI分析
        </div>
      </div>
      <h2 class="text-3xl font-headline font-bold text-on-surface mb-4">
        {{ sectionHeadline }}
      </h2>
      <p class="text-on-surface-variant mb-8 leading-relaxed whitespace-pre-wrap">
        {{ careerBody }}
      </p>
      <div v-if="highlightSkills.length > 0" class="space-y-4">
        <div
          v-for="(skill, idx) in highlightSkills"
          :key="skill.id"
          class="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low"
        >
          <span
            class="material-symbols-outlined shrink-0"
            :class="idx === 0 ? 'text-primary' : 'text-secondary'"
          >
            {{ idx === 0 ? "auto_awesome" : "verified_user" }}
          </span>
          <div>
            <div class="text-sm font-bold text-on-surface">{{ skill.title }}</div>
            <div class="text-xs text-on-surface-variant">{{ skill.description }}</div>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-on-surface-variant">核心赋能技能将在 AI 生成后显示。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../../../types/selfmapReportType";
import {
  STREAM_TEXT_TIMEOUT_HINT,
  useStreamTextLoadingTimeout,
} from "../../../composables/useStreamTextLoadingTimeout";

/**
 * @description 霍兰德报告侧栏：AI 人物身份标题 + 职业发展建议正文 + 技能亮点（前两则）。
 */
defineOptions({
  name: "InfoPercentageRiasecSection",
});

const props = defineProps<{
  model?: SelfmapReportHeaderModel;
  /** `messageHead` 流式输出，个性化人物身份（约 6 字内） */
  aiIdentityHeadline?: string;
  /** 职业发展建议等正文流式输出 */
  aiCareerText?: string;
  /** 技能列表；取前 2 条作为亮点卡片 */
  aiSkills?: SelfmapSkillModel[];
}>();

/**
 * @description 取 AI 返回首行，去引号与空白，最多展示 6 个字（与提示词一致）。
 */
const sectionHeadline = computed(() => {
  const raw = props.aiIdentityHeadline?.trim();
  if (raw && raw.length > 0) {
    const first =
      raw
        .split(/\r?\n/)
        .map((l) => l.trim())
        .find((l) => l.length > 0) ?? "";
    const stripped = first.replace(/^["'「『]|["'」』]$/g, "").trim();
    const compact = stripped.replace(/\s+/g, "");
    const six = [...compact].slice(0, 6).join("");
    if (six.length > 0) {
      return six;
    }
  }
  return props.model?.title?.trim() || "霍兰德 · AI 解读";
});

const careerTextTimedOut = useStreamTextLoadingTimeout(() => props.aiCareerText);

const careerBody = computed(() => {
  const t = props.aiCareerText?.trim();
  if (t && t.length > 0) {
    return t;
  }
  if (careerTextTimedOut.value) {
    return STREAM_TEXT_TIMEOUT_HINT;
  }
  return "AI分析中......";
});

const highlightSkills = computed(() => (props.aiSkills ?? []).slice(0, 2));
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
</style>
