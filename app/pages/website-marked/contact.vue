<!--
  联系我们：展示官方联系方式、社交媒体与客服时间，并提供留言表单（提交为前端示意，后续可对接服务端）。
-->
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
          联系我们
        </h1>
        <div class="text-lg max-w-2xl leading-relaxed space-y-4">
          <p class="text-on-surface-variant">
            我们非常重视您的反馈和建议。如果您有任何问题、意见或需要帮助的地方，欢迎随时与我们联系！我们将尽快为您提供帮助。
          </p>
        </div>
      </section>
      <!-- Content Bento-ish Layout -->
      <!-- <div class="grid grid-cols-1 gap-6">
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">mail</span>
            </div>
            <div class="min-w-0 flex-1">
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">联系方式</h2>
              <dl class="space-y-3 text-on-surface-variant leading-relaxed">
                <div>
                  <dt class="font-medium text-on-surface">电子邮件</dt>
                  <dd>
                    <a
                      class="text-primary underline-offset-2 hover:underline"
                      href="mailto:support@example.com"
                      rel="noopener noreferrer"
                    >
                      support@example.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt class="font-medium text-on-surface">电话</dt>
                  <dd>
                    <a class="text-primary underline-offset-2 hover:underline" href="tel:+861234567890">
                      +86 123 456 7890
                    </a>
                  </dd>
                </div>
                <div>
                  <dt class="font-medium text-on-surface">办公地址</dt>
                  <dd>北京市朝阳区 XX 街道 XX 号，XX 大厦 101 室</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">share</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">社交媒体</h2>
              <ul class="list-disc pl-5 space-y-2 text-on-surface-variant leading-relaxed">
                <li>微博：@我们的微博账号</li>
                <li>微信公众号：搜索「我们的公众号」并关注</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary">schedule</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">客服支持时间</h2>
              <p class="text-on-surface-variant leading-relaxed">
                周一至周五：9:00 AM - 6:00 PM（节假日除外）
              </p>
            </div>
          </div>
        </div>
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">edit_note</span>
            </div>
            <div class="min-w-0 flex-1 w-full">
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">留言</h2>
              <p class="text-on-surface-variant leading-relaxed mb-6">
                如有任何疑问，您也可以填写下方的联系方式表单，我们将尽快回复您。
              </p>
              <form class="space-y-4" @submit.prevent="onContactFormSubmit">
                <div>
                  <label class="block text-sm font-medium text-on-surface mb-1" for="contact-name">姓名</label>
                  <input
                    id="contact-name"
                    v-model="contactForm.name"
                    class="w-full rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    maxlength="80"
                    name="name"
                    placeholder="如何称呼您"
                    type="text"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-on-surface mb-1" for="contact-email">电子邮箱</label>
                  <input
                    id="contact-email"
                    v-model="contactForm.email"
                    class="w-full rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    maxlength="120"
                    name="email"
                    placeholder="便于我们回复您"
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-on-surface mb-1" for="contact-message">留言内容</label>
                  <textarea
                    id="contact-message"
                    v-model="contactForm.message"
                    class="min-h-[140px] w-full resize-y rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    maxlength="2000"
                    name="message"
                    placeholder="请简要描述您的问题或建议"
                    required
                  ></textarea>
                </div>
                <button
                  class="w-full rounded-full bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:opacity-90 active:scale-[0.98] sm:w-auto"
                  type="submit"
                >
                  提交
                </button>
                <p
                  v-if="contactFormSent"
                  class="text-sm font-medium text-primary"
                  role="status"
                >
                  感谢您的留言，我们会尽快与您联系。
                </p>
              </form>
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
    -->
  </main>
  <AuthFooterLinks />
</template>

<script setup lang="ts">
interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

const contactForm = reactive<ContactFormState>({
  name: "",
  email: "",
  message: "",
});

const contactFormSent = ref(false);

/**
 * @description 前端占位提交：展示成功提示；正式环境应调用服务端接口或邮件服务。
 */
function onContactFormSubmit(): void {
  contactFormSent.value = true;
}
</script>
