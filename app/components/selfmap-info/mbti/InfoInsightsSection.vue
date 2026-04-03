<script setup lang="ts">
import type { SelfmapInsightCardModel } from "../../../types/selfmapReportType";
import InfoInsightCard from "../InfoInsightCard.vue";
import type { InsightDisplayItem } from "~/types/selfmapReportType";

const props = withDefaults(
  defineProps<{
    cards?: SelfmapInsightCardModel[] | Record<string, SelfmapInsightCardModel>;
  }>(),
  {
    cards: () => [],
  },
);

const INSIGHT_META_MAP: Record<string, { title: string; icon: string }> = {
  action: { title: "行为模式", icon: "psychology" },
  communication: { title: "沟通优势与挑战", icon: "forum" },
  thinking: { title: "应对压力策略", icon: "health_and_safety" },
};

const normalizedCards = computed<InsightDisplayItem[]>(() => {
  if (Array.isArray(props.cards)) {
    const defaultMeta = Object.values(INSIGHT_META_MAP);
    return props.cards.map((card, index) => ({
      id: `insight-${index}`,
      title: defaultMeta[index]?.title ?? "",
      icon: defaultMeta[index]?.icon ?? "psychology",
      card,
    }));
  }

  const preferredOrder = ["action", "communication", "thinking"];
  const cardsRecord = props.cards as Record<string, SelfmapInsightCardModel>;
  return preferredOrder.reduce<InsightDisplayItem[]>((acc, key) => {
    const card = cardsRecord[key];
    if (!card) {
      return acc;
    }

    acc.push({
      id: key,
      title: INSIGHT_META_MAP[key]?.title ?? "",
      icon: INSIGHT_META_MAP[key]?.icon ?? "psychology",
      card,
    });
    return acc;
  }, []);
});
</script>

<template>
  <div class="md:col-span-7 grid grid-cols-1 gap-6">
    <InfoInsightCard
      v-for="item in normalizedCards"
      :key="item.id"
      :card="item.card"
      :title="item.title"
      :icon="item.icon"
    />
  </div>
</template>
