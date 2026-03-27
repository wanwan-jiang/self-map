<script setup lang='ts'>
const { form, errors, isSubmitting, submitForm } = useRegisterForm()

const submitMessage = ref<string>('')

const onSubmit = async (): Promise<void> => {
    const success = await submitForm()
    submitMessage.value = success ? '注册信息已通过校验，可接入后端注册 API。' : ''
}
</script>

<template>
    <article class='flex flex-col justify-center bg-surface p-5 md:p-6 lg:p-7'>
        <div class='mb-4 lg:hidden'>
            <div class='font-["Manrope"] text-2xl font-black tracking-tighter text-primary'>SelfMap</div>
        </div>

        <div class='mb-4'>
            <h2 class='mb-1 font-["Manrope"] text-xl font-bold lg:text-2xl'>开启您的探索</h2>
            <p class='text-xs text-on-surface-variant lg:text-sm'>创建一个账户以开始您的 AI 认知测评。</p>
        </div>

        <form class='space-y-3' @submit.prevent='onSubmit'>
            <label class='block space-y-1'>
                <span class='ml-1 block text-sm font-semibold text-on-surface-variant'>用户名</span>
                <div class='group relative'>
                    <span class='material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant transition-colors group-focus-within:text-primary'>person</span>
                    <input
                        v-model='form.username'
                        class='w-full rounded-xl border border-transparent bg-surface-container-lowest py-2 pl-12 pr-4 text-sm text-on-surface outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-1 focus:ring-primary'
                        type='text'
                        placeholder='输入您的唯一昵称'
                    >
                </div>
                <p v-if='errors.username' class='text-xs text-error'>{{ errors.username }}</p>
            </label>

            <label class='block space-y-1'>
                <span class='ml-1 block text-sm font-semibold text-on-surface-variant'>电子邮件</span>
                <div class='group relative'>
                    <span class='material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant transition-colors group-focus-within:text-primary'>mail</span>
                    <input
                        v-model='form.email'
                        class='w-full rounded-xl border border-transparent bg-surface-container-lowest py-2 pl-12 pr-4 text-sm text-on-surface outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-1 focus:ring-primary'
                        type='email'
                        placeholder='name@example.com'
                    >
                </div>
                <p v-if='errors.email' class='text-xs text-error'>{{ errors.email }}</p>
            </label>

            <label class='block space-y-1'>
                <span class='ml-1 block text-sm font-semibold text-on-surface-variant'>密码</span>
                <div class='group relative'>
                    <span class='material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant transition-colors group-focus-within:text-primary'>lock</span>
                    <input
                        v-model='form.password'
                        class='w-full rounded-xl border border-transparent bg-surface-container-lowest py-2 pl-12 pr-4 text-sm text-on-surface outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-1 focus:ring-primary'
                        type='password'
                        placeholder='••••••••'
                    >
                </div>
                <p v-if='errors.password' class='text-xs text-error'>{{ errors.password }}</p>
            </label>

            <label class='block space-y-1'>
                <span class='ml-1 block text-sm font-semibold text-on-surface-variant'>确认密码</span>
                <div class='group relative'>
                    <span class='material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant transition-colors group-focus-within:text-primary'>verified_user</span>
                    <input
                        v-model='form.confirmPassword'
                        class='w-full rounded-xl border border-transparent bg-surface-container-lowest py-2 pl-12 pr-4 text-sm text-on-surface outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-1 focus:ring-primary'
                        type='password'
                        placeholder='••••••••'
                    >
                </div>
                <p v-if='errors.confirmPassword' class='text-xs text-error'>{{ errors.confirmPassword }}</p>
            </label>

            <label class='flex items-start gap-3 pt-1'>
                <input
                    v-model='form.agreeTerms'
                    class='mt-1 cursor-pointer rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary'
                    type='checkbox'
                >
                <span class='text-xs leading-relaxed text-on-surface-variant'>
                    我同意 <a class='text-primary hover:underline' href='#'>服务条款</a> 和 <a class='text-primary hover:underline' href='#'>隐私政策</a>，并了解我的数据将用于生成个性化报告。
                </span>
            </label>
            <p v-if='errors.agreeTerms' class='text-xs text-error'>{{ errors.agreeTerms }}</p>

            <button
                class='mt-2 w-full rounded-full bg-primary py-2.5 text-sm font-bold text-on-primary-container shadow-lg shadow-primary/20 transition-all hover:bg-primary-dim active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'
                type='submit'
                :disabled='isSubmitting'
            >
                {{ isSubmitting ? '注册中...' : '立即注册' }}
            </button>

            <p v-if='submitMessage' class='text-center text-xs text-primary'>{{ submitMessage }}</p>

        </form>

        <div class='mt-4 text-center text-xs text-on-surface-variant'>
            已有账号？
            <NuxtLink class='font-bold text-primary transition-colors hover:text-primary-dim' to='/login'>立即登录</NuxtLink>
        </div>
    </article>
</template>
