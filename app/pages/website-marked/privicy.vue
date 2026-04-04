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
          隐私政策
        </h1>
        <p class="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          我们非常重视您的隐私，并致力于保护您的个人信息安全。在您使用我们的网站和服务时，我们承诺仅在必要的范围内收集、使用、存储和保护您的个人信息。通过访问或使用本网站，您同意以下隐私政策：
        </p>
      </section>
      <!-- Content Bento-ish Layout -->
      <div class="grid grid-cols-1 gap-6">
        <!-- 1. 信息收集 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">1. 信息收集</h2>
              <p class="text-on-surface-variant leading-relaxed mb-4">我们可能会收集以下类型的信息：</p>
              <ul class="list-disc pl-5 space-y-3 text-on-surface-variant leading-relaxed">
                <li>
                  <span class="font-medium text-on-surface">个人身份信息：</span>
                  如您的姓名、电子邮件地址等，当您创建账户或填写测试时提供。
                </li>
                <li>
                  <span class="font-medium text-on-surface">测试结果：</span>
                  我们会收集并存储您所参加的心理学测试的结果。
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 2. 信息使用 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">2. 信息使用</h2>
              <p class="text-on-surface-variant leading-relaxed mb-4">我们收集的信息将用于以下目的：</p>
              <ul class="list-disc pl-5 space-y-3 text-on-surface-variant leading-relaxed">
                <li>为您提供个性化的心理学测试体验。</li>
                <li>发送有关我们服务的更新或重要通知。</li>
                <li>改进我们网站的功能和服务。</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 3. 信息保护 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">3. 信息保护</h2>
              <p class="text-on-surface-variant leading-relaxed">
                我们采用加密技术和安全协议来保护您的信息免受未经授权的访问、篡改或泄露。
              </p>
            </div>
          </div>
        </div>
        <!-- 4. 第三方共享 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">4. 第三方共享</h2>
              <p class="text-on-surface-variant leading-relaxed">
                我们不会将您的个人信息出售或分享给未经授权的第三方。
              </p>
            </div>
          </div>
        </div>
        <!-- 5. 数据保留 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">5. 数据保留</h2>
              <p class="text-on-surface-variant leading-relaxed">
                我们会根据需要保留您的数据，以提供持续的服务或遵守法律要求。您可以随时请求删除您的账户和数据。
              </p>
            </div>
          </div>
        </div>
        <!-- 6. 您的权利 -->
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">6. 您的权利</h2>
              <p class="text-on-surface-variant leading-relaxed">
                您有权访问、更正或删除您个人的任何信息。若您对我们如何处理您的个人信息有任何疑问，或希望行使您的权利，请联系我们。
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
