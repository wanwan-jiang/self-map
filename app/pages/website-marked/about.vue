<template>
  <AuthTopBar />
  <main class="relative min-h-screen">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-grid pointer-events-none opacity-40"></div>
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div class="max-w-4xl mx-auto px-8 py-20 relative z-10">
      <!-- Hero Title Section -->
      <section class="mb-20">
        <div class="flex items-center gap-3 mb-6">
          <span class="h-px w-12 bg-primary/40"></span>
          <span class="text-primary font-bold tracking-widest text-xs uppercase">SelfMap Identity</span>
        </div>
        <h1 class="font-headline text-6xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6">
          关于我们
        </h1>
        <div class="text-lg max-w-2xl leading-relaxed space-y-4">
          <p class="text-on-surface font-medium">欢迎访问我们的心理学测试平台！</p>
          <!-- <p class="text-on-surface-variant">
            我们致力于为用户提供全面、科学的心理学测试工具，帮助个人深入了解自己，提升自我认知。我们的网站汇集了多种专业的心理学评估模型，涵盖人格、情绪、认知等多个领域，旨在为用户提供个性化、准确的心理学分析和建议。
          </p>
          <p class="text-on-surface-variant">
            我们的团队由经验丰富的心理学专家、数据分析师和技术人员组成，致力于为您提供一个安全、可靠、易于使用的在线平台。无论您是寻求个人成长、职业发展，还是简单的自我了解，我们的测试工具都将帮助您获得宝贵的见解。
          </p> -->
          <p class="text-on-surface-variant">
            我们的使命是让心理学变得更加亲民，让每个人都能够利用心理学的力量，改善自我、提升生活质量。
          </p>
        </div>
      </section>
      <!-- Content Bento-ish Layout -->

      <!-- Footer Note -->
      <div class="mt-20 pt-12 border-t border-outline-variant/15 flex flex-col items-center text-center">
        <div class="w-20 h-20 mb-8 overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
          <img
            class="w-full h-full object-cover"
            data-alt="abstract cosmic dust floating in a deep indigo void with soft violet nebula light textures"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuClG6A33SNE33oDj08EIdqKHz9ErLuz7OtRVoqincG0n7OGCE4AmymLN_XfgrP1Zx6A_B07CdIUtepisKkhCLwtbucBdReW9WzDKUz6ZXGDFRJ1LnXOYwsuqgE5RESgkxFMjs-Aa9X0m-PUf4gIQq_tRqyvK0mpVYAardkGCz15mhMAN-HTukqA84JtiC4WGEcGsYfcJzb9XGW6TKCm7ZaQuSXXYqRe3obigGeieyp_Jp0Y7_pxbGs-nckbH2ahk8HLEWpmhWNDB54s"
          />
        </div>
        <!-- <p class="text-on-surface-variant font-label text-sm italic">
          最后更新：2024年10月24日。如有任何疑问，请联系我们。
        </p> -->
        <div class="mt-8">
          <button
            class="bg-surface-container-highest text-on-surface px-8 py-3 rounded-full font-bold hover:bg-surface-bright transition-all active:scale-95"
            @click="navigateTo('/')"
          >
            回到首页
          </button>
        </div>
      </div>
    </div>
  </main>
  <AuthFooterLinks />
</template>
