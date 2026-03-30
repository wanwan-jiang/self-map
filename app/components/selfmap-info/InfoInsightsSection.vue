<script setup lang="ts">
import type { SelfmapInsightCardModel } from "../../types/selfmapReportType";
import InfoInsightCard from "./InfoInsightCard.vue";

defineProps<{
  cards: SelfmapInsightCardModel[];
}>();
const titleArrs = ["行为模式", "沟通优势与挑战", "应对压力策略"];
</script>

<template>
  <div class="md:col-span-7 grid grid-cols-1 gap-6">
    <InfoInsightCard v-for="(item, index) in cards" :key="item.id" :card="item" :title="titleArrs[index] || ''" />
  </div>
</template>
