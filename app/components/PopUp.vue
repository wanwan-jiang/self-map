<script setup lang="ts">
import { useRegisterStore } from '../../stores/register'
const registerStore = useRegisterStore()
const { registerSuccess } = storeToRefs(registerStore)
const emit = defineEmits<{
    close: []
}>()

let hideTimer: ReturnType<typeof setTimeout> | null = null
const AUTO_HIDE_MS = 2000

const startHideTimer = (): void => {
    if (hideTimer) {
        clearTimeout(hideTimer)
    }

    hideTimer = setTimeout(() => {
        registerStore.clearRegisterSuccess()
        emit('close')
        hideTimer = null
    }, AUTO_HIDE_MS)
}

watch(
    registerSuccess,
    () => {
        startHideTimer()
    },
    { flush: 'post' },
)

onMounted(() => {
    startHideTimer()
})

onBeforeUnmount(() => {
    if (hideTimer) {
        clearTimeout(hideTimer)
    }
})
</script>

<template>
    <div class="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
<div class="bg-surface/80 backdrop-blur-2xl border border-primary/30 px-8 py-4 rounded-full shadow-[0_0_40px_rgba(88,86,214,0.2)] flex items-center gap-4 animate-in fade-in zoom-in duration-300 pointer-events-auto">
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[24px] font-bold">check_circle</span>
</div>
<div class="flex flex-col" v-if="registerSuccess">
<span class="text-on-surface font-headline font-bold text-lg leading-none">注册成功</span>
<span class="text-on-surface-variant text-xs mt-0.5">正在为您准备探索之旅...</span>
</div>
<div class="flex flex-col" v-else>
<span class="text-on-surface font-headline font-bold text-lg leading-none">注册失败</span>
<span class="text-on-surface-variant text-xs mt-0.5">请稍后重试...</span>
</div>
</div>
</div>
</template>
