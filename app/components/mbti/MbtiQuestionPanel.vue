<script setup lang="ts">
import type { MbtiQuestion } from "../../types/mbtiType";

interface Props {
  question: MbtiQuestion;
  selectedOptionId?: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  hasSelectedCurrent: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [payload: { id: string; value: number }];
  prev: [];
  next: [];
  submit: [];
}>();

const isActiveOption = (optionId: string): boolean => props.selectedOptionId === optionId;
</script>

<template>
  <div class="w-full max-w-3xl flex flex-col gap-10">
    <div class="space-y-4 text-center md:text-left">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-dim text-xs font-bold tracking-widest uppercase"
      >
        <span class="material-symbols-outlined text-sm">psychology</span>
        {{ question.dimension }}
      </div>
      <h1 class="text-3xl md:text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight">
        {{ question.title }}
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        v-for="option in question.options"
        :key="option.id"
        class="group relative flex flex-col p-8 rounded-lg bg-surface-container-low border transition-all duration-300 text-left items-start overflow-hidden active:scale-[0.98]"
        :class="
          isActiveOption(option.id)
            ? 'border-primary/70 bg-surface-container-high'
            : 'border-transparent hover:border-primary/40 hover:bg-surface-container-high'
        "
        type="button"
        @click="emit('select', { id: option.id, value: option.value })"
      >
        <div
          class="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"
        />
        <span
          class="text-primary-dim font-headline font-black text-4xl mb-6 group-hover:scale-110 transition-transform"
        >
          {{ option.label }}
        </span>
        <p class="text-xl font-body font-semibold text-on-surface leading-relaxed z-10">{{ option.text }}</p>
        <div
          class="mt-8 flex items-center gap-2 text-primary transition-opacity"
          :class="isActiveOption(option.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
        >
          <span class="text-sm font-bold tracking-tighter">SELECT THIS PATH</span>
          <span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
        </div>
      </button>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-outline-variant/15">
      <button
        class="flex items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors font-semibold group disabled:opacity-30"
        type="button"
        :disabled="!canGoPrev"
        @click="emit('prev')"
      >
        <span class="material-symbols-outlined group-hover:-translate-x-1 transition-transform">west</span>
        上一题
      </button>
      <div class="flex items-center gap-4">
        <p class="text-on-surface-variant text-xs font-medium italic hidden md:block">
          答案将自动保存并生成您的性格地图
        </p>
        <button
          class="flex items-center gap-3 bg-surface-container-highest px-8 py-3 rounded-full text-on-surface font-bold hover:bg-primary hover:text-on-primary-container transition-all active:scale-95 group disabled:opacity-30 disabled:cursor-not-allowed"
          type="button"
          :disabled="!hasSelectedCurrent || (!isLastQuestion && !canGoNext)"
          @click="isLastQuestion ? emit('submit') : emit('next')"
        >
          {{ isLastQuestion ? "提交" : "下一题" }}
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
        </button>
      </div>
    </div>
  </div>
</template>
