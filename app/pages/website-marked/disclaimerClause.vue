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
          免责声明
        </h1>
        <p class="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          在使用 The Cognitive Luminous (SelfMap)
          平台服务前，请仔细阅读以下条款。本声明旨在明确我们服务的性质及其法律边界，确保您的探索之旅透明且安全。
        </p>
      </section>
      <!-- Content Bento-ish Layout -->
      <div class="grid grid-cols-1 gap-6">
        <!-- Section 1 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary" data-icon="psychology">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-[#f1f3fc]">1. 测试结果的准确性</h2>
              <p class="text-on-surface-variant leading-relaxed mb-4">
                我们提供的心理学测试（包括 MBTI
                衍生评估、人工智能辅助的人格分析等）仅供参考。这些评估是基于现有心理学理论和数据模型的自动化工具。
              </p>
              <p class="text-primary/80 font-medium">
                注意：测试结果不应作为专业心理评估、诊断或治疗的唯一依据。如果您有严重的心理健康需求，请咨询专业的心理医生或执业执照咨询师。
              </p>
            </div>
          </div>
        </div>
        <!-- Section 2 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary" data-icon="info">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-[#f1f3fc]">2. 网站内容</h2>
              <p class="text-on-surface-variant leading-relaxed">
                本网站内容（包括但不限于文字、图像、理论解释和 AI
                生成的洞察）的目的仅限于提供一般性信息，不构成任何形式的医疗、心理、法律、职业或财务建议。我们力求确保内容的及时性，但不保证所有信息的绝对准确性或完整性。
              </p>
            </div>
          </div>
        </div>
        <!-- Section 3 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary" data-icon="gavel">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-[#f1f3fc]">3. 责任限制</h2>
              <p class="text-on-surface-variant leading-relaxed">
                在法律允许的最大范围内，我们对于因使用或无法使用本网站服务所导致的任何直接、间接、偶然、特殊、惩罚性或后续损失（包括但不限于利润损失、数据丢失、心理波动或人际关系变动）不承担责任，即使我们已被告知发生此类损失的可能性。
              </p>
            </div>
          </div>
        </div>
        <!-- Section 4 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary" data-icon="gavel">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-[#f1f3fc]">4. 第三方网站链接</h2>
              <p class="text-on-surface-variant leading-relaxed">
                本网站可能包含指向第三方网站或资源的链接。这些链接仅为方便用户提供。我们无法控制此类网站的内容，对其内容的合法性、准确性或安全性不承担责任。
              </p>
            </div>
          </div>
        </div>
        <!-- Section 5 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary" data-icon="gavel">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-[#f1f3fc]">5. 服务变更和终止</h2>
              <p class="text-on-surface-variant leading-relaxed">
                我们保留随时更改、优化、暂停或永久终止本网站全部或部分服务的权利，恕不另行通知。我们不对因服务变更对您造成的任何影响承担补偿责任。
              </p>
            </div>
          </div>
        </div>
      </div>
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
