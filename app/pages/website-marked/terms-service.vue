<!--
  MBTI 测试产品服务条款：定义、服务范围、账户、使用限制、隐私引用、结果免责、知识产权、费用、免责与责任限制、条款修订。
-->
<template>
  <AuthTopBar />
  <main class="relative min-h-screen">
    <div class="absolute inset-0 bg-grid pointer-events-none opacity-40"></div>
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div class="max-w-4xl mx-auto px-8 py-20 relative z-10">
      <section class="mb-20">
        <div class="flex items-center gap-3 mb-6">
          <span class="h-px w-12 bg-primary/40"></span>
          <span class="text-primary font-bold tracking-widest text-xs uppercase">SelfMap Identity</span>
        </div>
        <h1 class="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-6">
          人格测试产品服务条款
        </h1>
        <div class="text-lg max-w-2xl leading-relaxed space-y-4 text-on-surface-variant">
          <p>
            欢迎使用我们的人格测评产品（以下简称「本产品」）。在使用本产品之前，请仔细阅读以下服务条款。一旦您开始使用本产品，即表示您同意遵守本服务条款及我们的
            <NuxtLink class="text-primary underline-offset-2 hover:underline" to="/website-marked/privicy">
              隐私政策
            </NuxtLink>
            。
          </p>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6">
        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">一、定义</h2>
              <ul class="list-disc space-y-3 pl-5 text-on-surface-variant leading-relaxed">
                <li>
                  <span class="font-medium text-on-surface">本产品：</span>
                  指提供人格 性格测试及相关服务的在线平台、应用程序或其他形式的服务。
                </li>
                <li>
                  <span class="font-medium text-on-surface">用户：</span>
                  指使用本产品的个人或组织。
                </li>
                <li>
                  <span class="font-medium text-on-surface">服务提供商：</span>
                  指提供本产品的公司或组织。
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">二、服务内容</h2>
              <ul class="list-disc space-y-3 pl-5 text-on-surface-variant leading-relaxed">
                <li>本产品提供 MBTI 性格测试，帮助用户了解自己的性格类型及相关信息。</li>
                <li>本产品还可能提供其他与 MBTI 测试相关的内容和功能（例如，个性分析报告、性格匹配分析等）。</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">三、用户注册与账户</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>使用本产品时，用户可能需要创建账户。用户应确保提供真实、准确的个人信息，并对账户的安全性负责。</p>
                <p>用户同意不将账户转让给他人，且应对其账户下的所有活动承担全部责任。</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">四、使用限制</h2>
              <p class="text-on-surface-variant leading-relaxed mb-4">
                用户不得以任何非法或不正当的方式使用本产品。包括但不限于：
              </p>
              <ul class="list-disc space-y-2 pl-5 text-on-surface-variant leading-relaxed mb-4">
                <li>破坏或干扰本产品的正常运营；</li>
                <li>上传或传播恶意软件、病毒或其他有害程序；</li>
                <li>利用本产品进行任何非法或侵权活动。</li>
              </ul>
              <p class="text-on-surface-variant leading-relaxed">
                本产品仅供个人使用，用户不得将其用于商业目的，除非事先获得服务提供商的书面许可。
              </p>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">五、隐私政策</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  我们承诺尊重用户的隐私，并保护用户个人数据的安全。请阅读我们的
                  <NuxtLink class="text-primary underline-offset-2 hover:underline" to="/website-marked/privicy">
                    隐私政策
                  </NuxtLink>
                  ，了解我们如何收集、使用和保护您的信息。
                </p>
                <p>
                  用户在使用本产品时，可能需要提供一些个人信息（如姓名、电子邮件地址、测试结果等）。这些信息将用于提供相关服务和改善产品体验。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">六、测试结果和分析报告</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  本产品提供的 MBTI
                  测试结果仅供参考，用户应谨慎解读并自行决定是否采取相关建议。我们不保证测试结果的绝对准确性或全面性。
                </p>
                <p>
                  本产品的分析报告不应被视为专业心理学诊断或治疗的替代品。如果用户有任何心理健康方面的疑虑，建议咨询专业人士。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">七、知识产权</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  本产品及其所有内容（包括但不限于文本、图像、视频、代码等）均为服务提供商或其授权方的财产，受版权法、商标法及其他相关法律保护。
                </p>
                <p>
                  用户不得复制、修改、分发、传送、展示或以其他方式使用本产品的任何内容，除非经过服务提供商的书面许可。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">八、服务费用</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  本产品的某些功能可能需要支付费用。具体收费标准请参考我们的
                  <span class="font-medium text-primary">收费说明</span>
                  或在使用过程中查看相关费用提示。
                </p>
                <p>服务提供商有权随时调整收费标准，并将在调整前通知用户。</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-tertiary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">九、免责声明</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  本产品的测试结果、内容和服务均按「现状」提供。服务提供商不对本产品的准确性、完整性、可用性或可靠性做任何明示或暗示的保证。
                </p>
                <p>服务提供商不对因使用本产品而引起的任何直接、间接、偶然、特殊或后果性损害负责。</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">十、责任限制</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  服务提供商的责任仅限于提供本产品的服务或退款。对于因使用本产品产生的任何其他损害，服务提供商不承担责任。
                </p>
                <p>用户在使用本产品时应自担风险，服务提供商对用户因使用本产品所造成的任何损失或损害不承担责任。</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group bg-surface-container-low p-8 rounded-lg transition-all duration-300 border border-transparent hover:border-primary/20 glow-subtle"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-secondary">info</span>
            </div>
            <div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface">十一、条款修改</h2>
              <div class="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  服务提供商保留随时修改本服务条款的权利。修改后的条款将在本产品中发布，并立即生效。用户继续使用本产品即表示同意修改后的条款。
                </p>
                <p>用户有责任定期查看服务条款，以确保了解最新版本。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 pt-12 border-t border-outline-variant/15 flex flex-col items-center text-center">
        <div class="w-20 h-20 mb-8 overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
          <img
            class="w-full h-full object-cover"
            data-alt="abstract cosmic dust floating in a deep indigo void with soft violet nebula light textures"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuClG6A33SNE33oDj08EIdqKHz9ErLuz7OtRVoqincG0n7OGCE4AmymLN_XfgrP1Zx6A_B07CdIUtepisKkhCLwtbucBdReW9WzDKUz6ZXGDFRJ1LnXOYwsuqgE5RESgkxFMjs-Aa9X0m-PUf4gIQq_tRqyvK0mpVYAardkGCz15mhMAN-HTukqA84JtiC4WGEcGsYfcJzb9XGW6TKCm7ZaQuSXXYqRe3obigGeieyp_Jp0Y7_pxbGs-nckbH2ahk8HLEWpmhWNDB54s"
          />
        </div>
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
