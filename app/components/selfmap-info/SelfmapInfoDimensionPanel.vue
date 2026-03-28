<script setup lang="ts">
import type { SelfmapDimensionAxisLabel, SelfmapDimensionLegendItem } from '../../types/selfmapReport'

defineProps<{
    axisLabels: SelfmapDimensionAxisLabel[]
    legend: SelfmapDimensionLegendItem[]
}>()

const dotClass = (tone: SelfmapDimensionLegendItem['dotTone']): string => {
    if (tone === 'primary') return 'bg-primary'
    if (tone === 'secondary') return 'bg-secondary'
    return 'bg-tertiary'
}
</script>

<template>
    <section class="md:col-span-5">
        <SelfmapInfoGlassCard padding-class="p-8 flex flex-col justify-center min-h-[450px]">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-2xl font-bold">维度分布</h2>
                <span class="material-symbols-outlined text-on-surface-variant">info</span>
            </div>
            <div class="relative flex-grow flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full animate-pulse"></div>
                <div
                    class="w-full aspect-square max-w-[300px] relative border border-outline-variant/30 rounded-full flex items-center justify-center"
                >
                    <svg class="w-full h-full transform -rotate-18" viewBox="0 0 100 100">
                        <polygon
                            points="50,10 85,35 75,85 25,85 15,35"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            stroke-width="0.5"
                        ></polygon>
                        <polygon
                            points="50,20 78,40 70,80 30,80 22,40"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            stroke-width="0.5"
                        ></polygon>
                        <polygon
                            points="50,15 82,38 72,78 32,70 20,45"
                            fill="rgba(165,165,255,0.2)"
                            stroke="#a5a5ff"
                            stroke-width="1.5"
                        ></polygon>
                    </svg>
                    <div
                        v-for="item in axisLabels"
                        :key="item.id"
                        class="text-xs font-bold"
                        :class="[item.positionClass, item.textToneClass]"
                    >
                        {{ item.text }}
                    </div>
                </div>
            </div>
            <div class="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div v-for="row in legend" :key="row.id" class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full" :class="dotClass(row.dotTone)"></div>
                    <span class="text-on-surface-variant">{{ row.text }}</span>
                </div>
            </div>
        </SelfmapInfoGlassCard>
    </section>
</template>
