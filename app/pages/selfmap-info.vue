<script setup lang='ts'>
/**
 * @description SelfMap 结果分析信息页，按提供 HTML 模板重构。
 */
useHead({
    title: 'SelfMap - 性格报告',
    htmlAttrs: {
        lang: 'zh-CN',
        class: 'dark'
    },
    link: [
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        }
    ]
})
</script>

<template>
    <div class='min-h-screen flex flex-col'>
        <AuthTopBar />

        <main class='flex-grow pt-8 pb-20 px-6 max-w-7xl mx-auto w-full'>
            <header class='mb-16 relative'>
                <div class='absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]'></div>
                <div class='flex flex-col md:flex-row justify-between items-end gap-8 relative z-10'>
                    <div class='max-w-2xl'>
                        <span class='inline-block py-1 px-4 rounded-full bg-secondary-container/30 text-secondary text-sm font-medium mb-4'>MBTI 专业深度解析</span>
                        <h1 class='text-5xl md:text-7xl font-extrabold tracking-tight mb-4'>
                            你的性格类型是：<span class='text-primary text-glow'>ENFJ - 主人公</span>
                        </h1>
                        <p class='text-on-surface-variant text-lg leading-relaxed'>
                            富有魅力、鼓舞人心的领导者。你天生具有感召力，能够敏锐地洞察他人的潜能，并引导团队走向共同的愿景。
                        </p>
                    </div>
                    <div class='flex gap-4'>
                        <button class='flex items-center gap-2 px-6 py-3 bg-surface-container-high rounded-full border border-outline-variant/20 hover:bg-surface-container-highest transition-all group'>
                            <span class='material-symbols-outlined text-primary group-hover:scale-110 transition-transform'>refresh</span>
                            <span>重新测试</span>
                        </button>
                        <!-- <button class='flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-full font-bold hover:shadow-[0_0_30px_rgba(165,165,255,0.4)] transition-all'>
                            <span class='material-symbols-outlined icon-filled'>download</span>
                            <span>下载详细报告</span>
                        </button> -->
                    </div>
                </div>
            </header>

            <div class='grid grid-cols-1 md:grid-cols-12 gap-6'>
                <section class='md:col-span-5 glass-card rounded-lg p-8 flex flex-col justify-center min-h-[450px]'>
                    <div class='flex justify-between items-center mb-8'>
                        <h2 class='text-2xl font-bold'>维度分布</h2>
                        <span class='material-symbols-outlined text-on-surface-variant'>info</span>
                    </div>
                    <div class='relative flex-grow flex items-center justify-center'>
                        <div class='absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full animate-pulse'></div>
                        <div class='w-full aspect-square max-w-[300px] relative border border-outline-variant/30 rounded-full flex items-center justify-center'>
                            <svg class='w-full h-full transform -rotate-18' viewBox='0 0 100 100'>
                                <polygon points='50,10 85,35 75,85 25,85 15,35' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'></polygon>
                                <polygon points='50,20 78,40 70,80 30,80 22,40' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'></polygon>
                                <polygon points='50,15 82,38 72,78 32,70 20,45' fill='rgba(165,165,255,0.2)' stroke='#a5a5ff' stroke-width='1.5'></polygon>
                            </svg>
                            <div class='absolute -top-4 text-xs font-bold text-primary'>外向 (E) 85%</div>
                            <div class='absolute -right-8 top-1/3 text-xs font-bold text-secondary'>直觉 (N) 72%</div>
                            <div class='absolute -bottom-4 right-1/4 text-xs font-bold text-tertiary'>情感 (F) 90%</div>
                            <div class='absolute -bottom-4 left-1/4 text-xs font-bold text-on-surface'>判断 (J) 65%</div>
                        </div>
                    </div>
                    <div class='mt-8 grid grid-cols-2 gap-4 text-sm'>
                        <div class='flex items-center gap-2'>
                            <div class='w-2 h-2 rounded-full bg-primary'></div>
                            <span class='text-on-surface-variant'>能量来源: 外向为主</span>
                        </div>
                        <div class='flex items-center gap-2'>
                            <div class='w-2 h-2 rounded-full bg-secondary'></div>
                            <span class='text-on-surface-variant'>信息处理: 宏观直觉</span>
                        </div>
                    </div>
                </section>

                <div class='md:col-span-7 grid grid-cols-1 gap-6'>
                    <article class='glass-card rounded-lg p-6 flex gap-6 hover:bg-surface-container-highest/40 transition-all cursor-default'>
                        <div class='w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center'>
                            <span class='material-symbols-outlined text-primary text-3xl'>psychology</span>
                        </div>
                        <div>
                            <h3 class='text-xl font-bold mb-2'>行为模式 (Behavior Patterns)</h3>
                            <p class='text-on-surface-variant leading-relaxed'>倾向于在群体中担任自然领导者，能够预测团队需求并提前布局。在做决策时，首要考虑对人的影响而非冷冰冰的数据，追求和谐与长远发展。</p>
                        </div>
                    </article>

                    <article class='glass-card rounded-lg p-6 flex gap-6 hover:bg-surface-container-highest/40 transition-all cursor-default'>
                        <div class='w-14 h-14 shrink-0 rounded-2xl bg-secondary/10 flex items-center justify-center'>
                            <span class='material-symbols-outlined text-secondary text-3xl'>forum</span>
                        </div>
                        <div>
                            <h3 class='text-xl font-bold mb-2'>沟通优势与挑战</h3>
                            <p class='text-on-surface-variant leading-relaxed mb-3'>你极具同理心，能够通过言语极大地激励他人。然而，为了维持和谐，你可能在面对冲突时表现得过于委婉，甚至回避必要的负面反馈。</p>
                            <div class='flex gap-2'>
                                <span class='text-xs px-2 py-1 rounded bg-surface-container-high border border-outline-variant/10 text-secondary'>高情商</span>
                                <span class='text-xs px-2 py-1 rounded bg-surface-container-high border border-outline-variant/10 text-secondary'>冲突回避倾向</span>
                            </div>
                        </div>
                    </article>

                    <article class='glass-card rounded-lg p-6 flex gap-6 hover:bg-surface-container-highest/40 transition-all cursor-default'>
                        <div class='w-14 h-14 shrink-0 rounded-2xl bg-tertiary/10 flex items-center justify-center'>
                            <span class='material-symbols-outlined text-tertiary text-3xl'>bolt</span>
                        </div>
                        <div>
                            <h3 class='text-xl font-bold mb-2'>应对压力策略</h3>
                            <p class='text-on-surface-variant leading-relaxed'>在压力下，你容易过度承担他人的情绪。建议建立清晰的情绪边界，并通过独处或冥想来重拾内在的直觉判断，避免陷入“必须拯救所有人”的焦虑中。</p>
                        </div>
                    </article>
                </div>
            </div>

            <section class='mt-12'>
                <h2 class='text-3xl font-extrabold mb-8 flex items-center gap-3'>
                    <span class='material-symbols-outlined text-primary text-4xl'>rocket_launch</span>
                    AI 职业导航建议
                </h2>
                <div class='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div class='lg:col-span-2 glass-card rounded-lg overflow-hidden flex flex-col md:flex-row'>
                        <div class='md:w-1/3 relative h-64 md:h-auto'>
                            <img
                                class='absolute inset-0 w-full h-full object-cover'
                                src='https://lh3.googleusercontent.com/aida-public/AB6AXuABM2HZpXoA6M085fPEIEIZOZsWGZk3S2vqwGDtKNLqYF1tcBBaP1uXf3zQIv2KN56CnXKxn1PV2icdlbf3NuG-7Wh0d_ic-K1kPTFHZQDSv2L3K8nFFBFa0_IBLNPIPv7yKvuLZNmNej02drIS60uJ_DaqJ2gDazOri9QCzmdMxdI44YN29DfVet69Gwc8NF-dgAKV4TVNL_UGC6AbqAKaYPMxeHrBpTflT6nzywPARUlPXhtvpfGLKkK0Fu5BYRnUl3imAUjkCRhY'
                                alt='Career workspace'
                            >
                            <div class='absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-highest/10 md:to-transparent'></div>
                        </div>
                        <div class='p-8 flex-grow'>
                            <h3 class='text-xl font-bold mb-6 text-primary'>职业路径建议 (Career Paths)</h3>
                            <div class='space-y-6'>
                                <div class='flex justify-between items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors'>
                                    <div>
                                        <div class='font-bold'>企业高管 / 团队负责人</div>
                                        <div class='text-sm text-on-surface-variant'>利用天生的领导力与战略眼光</div>
                                    </div>
                                    <span class='material-symbols-outlined text-primary'>trending_up</span>
                                </div>
                                <div class='flex justify-between items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors'>
                                    <div>
                                        <div class='font-bold'>心理咨询 / 人力资源</div>
                                        <div class='text-sm text-on-surface-variant'>深度连接他人的情感与成长潜能</div>
                                    </div>
                                    <span class='material-symbols-outlined text-primary'>favorite</span>
                                </div>
                                <div class='flex justify-between items-center p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors'>
                                    <div>
                                        <div class='font-bold'>公关 / 媒体传播</div>
                                        <div class='text-sm text-on-surface-variant'>发挥卓越的感召力与故事讲述能力</div>
                                    </div>
                                    <span class='material-symbols-outlined text-primary'>campaign</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class='glass-card rounded-lg p-8'>
                        <h3 class='text-xl font-bold mb-6 text-secondary'>核心赋能技能 (Key Skills)</h3>
                        <ul class='space-y-6'>
                            <li class='flex items-start gap-3'>
                                <div class='mt-1 w-5 h-5 rounded bg-primary-dim/20 flex items-center justify-center'>
                                    <span class='material-symbols-outlined text-[16px] text-primary icon-filled'>check</span>
                                </div>
                                <div>
                                    <span class='block font-bold'>战略型沟通</span>
                                    <span class='text-sm text-on-surface-variant leading-tight'>不仅传递信息，更要传递愿景与共鸣。</span>
                                </div>
                            </li>
                            <li class='flex items-start gap-3'>
                                <div class='mt-1 w-5 h-5 rounded bg-primary-dim/20 flex items-center justify-center'>
                                    <span class='material-symbols-outlined text-[16px] text-primary icon-filled'>check</span>
                                </div>
                                <div>
                                    <span class='block font-bold'>冲突解决与调解</span>
                                    <span class='text-sm text-on-surface-variant leading-tight'>将你的同理心转化为可落地的双赢方案。</span>
                                </div>
                            </li>
                            <li class='flex items-start gap-3'>
                                <div class='mt-1 w-5 h-5 rounded bg-primary-dim/20 flex items-center justify-center'>
                                    <span class='material-symbols-outlined text-[16px] text-primary icon-filled'>check</span>
                                </div>
                                <div>
                                    <span class='block font-bold'>跨职能协作</span>
                                    <span class='text-sm text-on-surface-variant leading-tight'>利用你的直觉识别并链接不同领域的资源。</span>
                                </div>
                            </li>
                        </ul>
                        <div class='mt-10 p-4 rounded-2xl bg-secondary-container/20 border border-secondary/20'>
                            <p class='text-xs text-secondary-fixed-dim italic'>"你的最大力量在于你赋予他人的力量。保持对人性的信仰，同时学会在逻辑与情感间平衡。"</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class='w-full py-12 mt-auto bg-[#0a0e14] border-t border-slate-800/15'>
            <div class='flex flex-col items-center gap-6 px-8 w-full'>
                <div class='text-lg font-bold text-slate-200'>SelfMap</div>
                <div class='flex flex-wrap justify-center gap-8'>
                    <a class='text-slate-500 hover:text-slate-300 transition-colors' href='#'>关于我们</a>
                    <a class='text-slate-500 hover:text-slate-300 transition-colors' href='#'>隐私政策</a>
                    <a class='text-slate-500 hover:text-slate-300 transition-colors' href='#'>服务条款</a>
                    <a class='text-slate-500 hover:text-slate-300 transition-colors' href='#'>联系我们</a>
                </div>
                <div class='text-slate-500 font-["Plus_Jakarta_Sans"] text-sm'>© 2024 SelfMap. 认知光芒，指引成长。</div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
:global(.material-symbols-outlined) {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.glass-card {
    background: rgba(32, 38, 47, 0.4);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(68, 72, 79, 0.15);
}

.text-glow {
    text-shadow: 0 0 20px rgba(165, 165, 255, 0.3);
}

:global(body) {
    background-color: #0a0e14;
    color: #f1f3fc;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

h1,
h2,
h3 {
    font-family: 'Manrope', sans-serif;
}

.icon-filled {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
