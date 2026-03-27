<script setup lang='ts'>
const { form, errors, isSubmitting, submitForm } = useLoginForm()

const submitMessage = ref<string>('')
const showPassword = ref<boolean>(false)

const onSubmit = async (): Promise<void> => {
    const success = await submitForm()
    // submitMessage.value = success ? '登录信息已通过校验，可接入后端登录 API。' : ''
}
</script>

<template>
    <article class='flex flex-col justify-center bg-surface p-5 md:p-6 lg:p-7'>
        <div class='mb-4 lg:hidden'>
            <div class='font-["Manrope"] text-2xl font-black tracking-tighter text-primary'>SelfMap</div>
        </div>

        <div class='mb-4'>
            <h2 class='mb-1 font-["Manrope"] text-xl font-bold lg:text-2xl'>欢迎回来</h2>
            <p class='text-xs text-on-surface-variant lg:text-sm'>登录账户继续你的 AI 认知成长之旅。</p>
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
                        placeholder='输入您的用户名'
                    >
                </div>
                <p v-if='errors.username' class='text-xs text-error'>{{ errors.username }}</p>
            </label>

            <label class='block space-y-1'>
                <span class='ml-1 block text-sm font-semibold text-on-surface-variant'>密码</span>
                <div class='group relative'>
                    <span class='material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant transition-colors group-focus-within:text-primary'>lock</span>
                    <input
                        v-model='form.password'
                        class='w-full rounded-xl border border-transparent bg-surface-container-lowest py-2 pl-12 pr-12 text-sm text-on-surface outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-1 focus:ring-primary'
                        :type='showPassword ? "text" : "password"'
                        placeholder='输入您的密码'
                    >
                    <button
                        class='absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary'
                        type='button'
                        :aria-label='showPassword ? "隐藏密码" : "显示密码"'
                        @click='showPassword = !showPassword'
                    >
                        <span class='material-symbols-outlined text-[20px]'>{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                    </button>
                </div>
                <p v-if='errors.password' class='text-xs text-error'>{{ errors.password }}</p>
            </label>

            <button
                class='mt-2 w-full rounded-full bg-primary py-2.5 text-sm font-bold text-on-primary-container shadow-lg shadow-primary/20 transition-all hover:bg-primary-dim active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'
                type='submit'
                :disabled='isSubmitting'
            >
                {{ isSubmitting ? '登录中...' : '立即登录' }}
            </button>

            <p v-if='submitMessage' class='text-center text-xs text-primary'>{{ submitMessage }}</p>
        </form>

        <div class='mt-4 text-center text-xs text-on-surface-variant'>
            还没有账号？
            <NuxtLink class='font-bold text-primary transition-colors hover:text-primary-dim' to='/register'>立即注册</NuxtLink>
        </div>
    </article>
</template>
