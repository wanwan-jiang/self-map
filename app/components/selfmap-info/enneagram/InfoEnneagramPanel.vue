<template>
  <section class="md:col-span-7 flex h-full flex-col">
    <div class="big-five-panel p-8 flex h-full min-h-[500px] flex-col justify-center rounded-lg">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">维度分布</h2>
      </div>
      <div class="relative flex-grow flex items-center justify-center overflow-visible min-h-0">
        <!-- Atmospheric Background Glow -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-[#b2a1ff]/10 rounded-full blur-[120px]" />
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-[#50e1f9]/10 rounded-full blur-[120px]" />
        <!-- SVG Ring Chart -->
        <svg class="w-full max-w-md drop-shadow-2xl" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="grad-1" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" style="stop-color: #7858f6; stop-opacity: 1" />
              <stop offset="100%" style="stop-color: #b2a1ff; stop-opacity: 1" />
            </linearGradient>
            <linearGradient id="grad-2" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" style="stop-color: #50e1f9; stop-opacity: 1" />
              <stop offset="100%" style="stop-color: #40d5ee; stop-opacity: 1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur result="coloredBlur" stdDeviation="2.5" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <!-- Core Info Center -->
          <circle cx="200" cy="200" fill="#0d0d1a" r="60" />
          <text
            fill="#aba9bb"
            font-family="Plus Jakarta Sans"
            font-size="14"
            font-weight="bold"
            text-anchor="middle"
            x="200"
            y="195"
          ></text>
          <text
            fill="#b2a1ff"
            font-family="Plus Jakarta Sans"
            font-size="24"
            font-weight="800"
            text-anchor="middle"
            x="200"
            y="220"
          >
            ENNEAGRAM
          </text>
          <!-- Ring Segments (Conceptual Paths) -->
          <!-- S1: Logic — 和平型 -->
          <path
            class="ring-segment"
            d="M200 60 A140 140 0 0 1 294 97"
            fill="none"
            stroke="url(#grad-1)"
            stroke-dasharray="100"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="262" y="52">和平型</text>
          <!-- S2: Empathy — 忠诚型 -->
          <path
            class="ring-segment"
            d="M305 108 A140 140 0 0 1 340 200"
            fill="none"
            opacity="0.9"
            stroke="#ff86c3"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="352" y="148">忠诚型</text>
          <!-- S3: Vision — 成就型 -->
          <path
            class="ring-segment"
            d="M340 215 A140 140 0 0 1 294 303"
            fill="none"
            stroke="url(#grad-2)"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="350" y="278">成就型</text>
          <!-- S4: Discipline — 完美型 -->
          <path
            class="ring-segment"
            d="M280 315 A140 140 0 0 1 200 340"
            fill="none"
            stroke="#7858f6"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="258" y="362">完美型</text>
          <!-- S5: Adaptability — 自我型 -->
          <path
            class="ring-segment"
            d="M185 340 A140 140 0 0 1 106 303"
            fill="none"
            stroke="#50e1f9"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="132" y="362">自我型</text>
          <!-- S6: Courage — 助人型 -->
          <path
            class="ring-segment"
            d="M92 290 A140 140 0 0 1 60 200"
            fill="none"
            stroke="#b2a1ff"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="36" y="268">助人型</text>
          <!-- S7: Intuition — 领袖型 -->
          <path
            class="ring-segment"
            d="M60 185 A140 140 0 0 1 106 97"
            fill="none"
            opacity="0.8"
            stroke="#ff73b7"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="44" y="138">领袖型</text>
          <!-- S8: Focus — 理智型 -->
          <path
            class="ring-segment"
            d="M120 85 A140 140 0 0 1 170 65"
            fill="none"
            stroke="url(#grad-1)"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="128" y="48">理智型</text>
          <!-- S9: Resonance — 活跃型 -->
          <path
            class="ring-segment"
            d="M180 60 A140 140 0 0 1 190 60"
            fill="none"
            stroke="#54e3fc"
            stroke-linecap="round"
            stroke-width="24"
          />
          <text class="enneagram-ring-label" pointer-events="none" text-anchor="middle" x="185" y="44">活跃型</text>

          <text
            fill="#aba9bb"
            font-family="Plus Jakarta Sans"
            font-size="12"
            font-weight="bold"
            text-anchor="middle"
            x="200"
            y="195"
          >
            九型人格
          </text>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: "ExamplePage",
});

useHead({
  title: "性格维度深度解析 - SelfMap",
  htmlAttrs: {
    lang: "en",
    class: "dark",
  },
  meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Manrope:wght@400;500;600&family=Inter:wght@400;500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<style scoped>
.big-five-panel {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}

.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

.editorial-gradient-text {
  background: linear-gradient(135deg, #7858f6 0%, #b2a1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.enneagram-ring-label {
  fill: #aba9bb;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
}

.ring-segment {
  transition: transform 0.3s ease;
}

.ring-segment:hover {
  transform: scale(1.02);
  filter: brightness(1.2);
}
</style>
