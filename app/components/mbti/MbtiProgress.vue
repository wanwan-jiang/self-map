<script setup lang='ts'>
interface Props {
    current: number
    total: number
    progressPercent: number
    estimatedMinutesLeft: number
}

defineProps<Props>()
</script>

<template>
    <div class='w-full max-w-3xl mb-12'>
        <div class='flex justify-between items-end mb-4'>
            <div class='flex flex-col'>
                <span class='text-on-surface-variant text-sm font-label tracking-widest uppercase mb-1'>Current Progress</span>
                <h2 class='text-3xl font-headline font-extrabold text-primary'>
                    {{ current }}
                    <span class='text-on-surface-variant/40 font-light'>/ {{ total }}</span>
                </h2>
            </div>
            <span class='text-xs text-on-surface-variant font-medium bg-surface-container-high px-3 py-1 rounded-full'>
                EST. {{ estimatedMinutesLeft }} MIN LEFT
            </span>
        </div>
        <div class='h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden'>
            <div
                class='h-full bg-primary rounded-full shadow-[0_0_15px_rgba(165,165,255,0.4)] transition-all duration-700'
                :style="{ width: `${progressPercent}%` }"
            />
        </div>
    </div>
</template>
