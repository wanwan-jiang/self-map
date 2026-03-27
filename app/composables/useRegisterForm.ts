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
    submitForm: () => Promise<object | boolean>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

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

        if (!PASSWORD_PATTERN.test(form.value.password)) {
            nextErrors.password = '密码需包含英文和数字，且至少 8 位'
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

    const submitForm = async (): Promise<object | boolean> => {
        if (!validate()) {
            return false
        }

        isSubmitting.value = true
        try {
            const result = await new Promise<object>((resolve) => setTimeout(() => resolve({data:{success:true}}), 600))
            return result
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
