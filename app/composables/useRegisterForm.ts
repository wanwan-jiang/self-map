interface RegisterFormState {
    username: string
    email: string
    password: string
    confirmPassword: string
    agreeTerms: boolean
}

interface RegisterFormErrors {
    username?: string
    email?: string
    password?: string
    confirmPassword?: string
    agreeTerms?: string
}

interface UseRegisterFormReturn {
    form: Ref<RegisterFormState>
    errors: Ref<RegisterFormErrors>
    isSubmitting: Ref<boolean>
    submitForm: () => Promise<boolean>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useRegisterForm = (): UseRegisterFormReturn => {
    const form = ref<RegisterFormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    })

    const errors = ref<RegisterFormErrors>({})
    const isSubmitting = ref<boolean>(false)

    const validate = (): boolean => {
        const nextErrors: RegisterFormErrors = {}

        if (!form.value.username.trim()) {
            nextErrors.username = '请输入用户名'
        }

        if (!EMAIL_PATTERN.test(form.value.email.trim())) {
            nextErrors.email = '请输入有效邮箱地址'
        }

        if (form.value.password.length < 8) {
            nextErrors.password = '密码至少 8 位'
        }

        if (form.value.confirmPassword !== form.value.password) {
            nextErrors.confirmPassword = '两次密码输入不一致'
        }

        if (!form.value.agreeTerms) {
            nextErrors.agreeTerms = '请先同意服务条款和隐私政策'
        }

        errors.value = nextErrors
        return Object.keys(nextErrors).length === 0
    }

    const submitForm = async (): Promise<boolean> => {
        if (!validate()) {
            return false
        }

        isSubmitting.value = true
        try {
            await new Promise((resolve) => setTimeout(resolve, 600))
            return true
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        form,
        errors,
        isSubmitting,
        submitForm
    }
}
