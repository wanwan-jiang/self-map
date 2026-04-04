<script setup lang="ts">
import type { SelfmapCareerPathModel, SelfmapSkillModel } from "../../types/selfmapReportType";

defineProps<{
  imageUrl: string;
  imageAlt: string;
  skills: SelfmapSkillModel[];
  // quote: string;
  // paths: SelfmapCareerPathModel[];
  resultQwenMbti?: string;
}>();
</script>

<template>
  <div class="lg:col-span-12 flex flex-col gap-12">
    <section class="mt-12">
      <h2 class="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-4xl">rocket_launch</span>
        AI 职业导航建议
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 glass-card rounded-lg overflow-hidden flex flex-col md:flex-row">
          <div class="relative h-64 md:h-72 md:w-72 md:shrink-0 lg:h-80 lg:w-80">
            <img class="absolute inset-0 w-full h-full object-cover" :src="imageUrl" :alt="imageAlt" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-highest/10 md:to-transparent"
            ></div>
          </div>
          <div class="p-8 flex-grow">
            <h3 class="text-xl font-bold mb-6 text-primary">职业路径建议</h3>
            <div class="text-sm text-on-surface-variant whitespace-pre-wrap">{{ resultQwenMbti }}</div>
            <!-- <div class="space-y-6">
            <div
              v-for="path in paths"
              :key="path.id"
              class="flex justify-between items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors"
            >
              <div>
                <div class="font-bold">{{ path.title }}</div>
                <div class="text-sm text-on-surface-variant">{{ path.description }}</div>
              </div>
              <span class="material-symbols-outlined text-primary">{{ path.icon }}</span>
            </div>
          </div> -->
          </div>
        </div>

        <div class="glass-card rounded-lg p-8">
          <h3 class="text-xl font-bold mb-6 text-secondary">核心赋能技能</h3>
          <ul class="space-y-6">
            <li v-for="skill in skills" :key="skill.id" class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded bg-primary-dim/20 flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px] text-primary icon-filled">check</span>
              </div>
              <div>
                <span class="block font-bold">{{ skill.title }}</span>
                <span class="text-sm text-on-surface-variant leading-tight">{{ skill.description }}</span>
              </div>
            </li>
          </ul>
          <!-- <div class="mt-10 p-4 rounded-2xl bg-secondary-container/20 border border-secondary/20">
          <p class="text-xs text-secondary-fixed-dim italic">"{{ quote }}"</p>
        </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}

.icon-filled {
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
</style>
