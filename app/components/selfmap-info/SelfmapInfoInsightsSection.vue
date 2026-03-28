<script setup lang="ts">
import type { SelfmapInsightCardModel } from '../../types/selfmapReport'

defineProps<{
    cards: SelfmapInsightCardModel[]
}>()
</script>

<template>
    <div class="md:col-span-7 grid grid-cols-1 gap-6">
        <SelfmapInfoInsightCard v-for="item in cards" :key="item.id" :card="item" />
    </div>
</template>
