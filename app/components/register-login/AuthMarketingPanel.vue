<script setup lang="ts">
import type { AvatarItem } from "~/types/questionType";

const avatarList: AvatarItem[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNWHttxn_tIFJ9uZcCOOlXPfXwaUvVuAXcZP0N7sEsO1i5RF5_iupuo4vH5BfoUYs2w5uMzvltodygGxCL_f3t3Q1ECmc1eoCpcy9RstoYJ7l8PKCSryu_-5JcWvzGDf3RwR0pI0e7_oGCP-Iwd9uBlX0IahB4UAz8yGKfCFRUAEiEC3W7NiRXYzt8AOy3Ct9JX39crk2OLfm5jGIgth_ZtcbMokGIKgrWQ0WxCoSk_fYuuUhmd7tNsjE-W-QG7BrIMe0TFe0OIHl-",
    alt: "Portrait of a young professional woman",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xNQwlET6z_eNX42JsVL-XYZyBJVoKs_RQ0-o5X8AKfjj0Fhu2IO3GMWAn4_C_CgPNn2kRe-y-h6AClSjiZVyICOo4StKWR0EBPKx4w8mOJ26so8NMS4i2Ge-1nh7VIMRp7pcAltZHD0kBi2Y4L5KE94RFhGl7eiem99LggI98BLpe0Te6Q1jm4Ta9q7AcuLAxfjIIwb3wbbUMkPA9y745E4j92hwB9SSoOV5ztVkPu6CGwMRs6y2KoA-0iQWQrlMWHHDfJESyWs",
    alt: "Portrait of a creative man with beard",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAicn50oWOw4yR6yH3Z82TzT22EvPIgRXJ3I5m0a82SJoVXo7C1LOsZDxByhSw-4r-66UogImDS8r09MnQSbZGfBbZbcMkIXJvMSB7HXulfXIve6frsr0iDEUhf4wvc7A3TfJZIVGKEO62gdyS2B73K-v41-ekC3028gYJ9hYBfwaDzStfY36rqY77svPWAVwEGUpxzbb-C681MFm9ihcah_FElGIDyAwUzslJtoKYm7-sQRtw1ixVWw0-GWWKizB3YIUXaQrjbGU1n",
    alt: "Close up of a smiling woman with glasses",
  },
];
</script>

<template>
  <aside class="hidden flex-col justify-between bg-surface-container-high p-8 xl:p-10 lg:flex">
    <div class="space-y-4">
      <div
        class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary"
      >
        Next-Gen Cognitive Tool
      </div>
      <h1
        class="font-[&quot;Manrope&quot;] text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl [text-shadow:0_0_20px_rgba(165,165,255,0.3)]"
      >
        AI 赋能
        <br />
        <span class="text-primary">个人成长</span>
      </h1>
      <p class="max-w-md text-sm leading-relaxed text-on-surface-variant xl:text-base">
        探索你的认知边界。SelfMap 利用先进的 AI 模型与 MBTI 理论，为你绘制独一无二的心理成长地图，开启深度自我认知之旅。
      </p>
    </div>

    <div class="mt-5">
      <div
        class="relative mx-auto aspect-square w-[92%] overflow-hidden rounded-2xl border border-outline-variant/10 shadow-2xl"
      >
        <img
          class="h-full w-full object-cover opacity-80"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKEZy2uIfn0PGFbByM7wcjTVvrBmFFngxuboYtIa8OVLCdpEhZzvEKhh3W1JQJ8sIoZqUKiCtMYUU9m4sE2xOHHAmgl9kXD2n9ilAW9Kz7gWDM6PmrhrI-eGFAfNTrHLMIPEZphiNPQTOjjd50NulIyK6ODIijq1tRRGD3Dc9CK71VN42RcXDvSvwUYVI9v-Dklh65C0dBTme3E36nia3oh1gblxgtEKmCulvn2PvWwp2VVdfBoJznDp6P8KFf-0HHljHmSQAZbske"
          alt="Modern abstract neural paths"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent" />
      </div>

      <div class="mt-5 flex items-center gap-3">
        <div class="flex -space-x-3">
          <div
            v-for="avatar in avatarList"
            :key="avatar.src"
            class="h-10 w-10 overflow-hidden rounded-full border-2 border-surface-container-high bg-slate-800"
          >
            <img class="h-full w-full object-cover" :src="avatar.src" :alt="avatar.alt" />
          </div>
        </div>
        <span class="text-xs font-medium text-on-surface-variant xl:text">在此开启发现之旅</span>
      </div>
    </div>
  </aside>
</template>
