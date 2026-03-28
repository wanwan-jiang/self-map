<script setup lang="ts">
interface Props {
  paddingClass?: string;
}

withDefaults(defineProps<Props>(), {
  paddingClass: "p-6",
});
</script>

<template>
  <div class="glass-card rounded-lg" :class="paddingClass">
    <slot />
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}
</style>
