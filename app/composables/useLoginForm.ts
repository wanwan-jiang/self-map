interface LoginFormState {
    username: string
    password: string
}

interface LoginFormErrors {
    username?: string
    password?: string
}

interface UseLoginFormReturn {
    form: Ref<LoginFormState>
    errors: Ref<LoginFormErrors>
    isSubmitting: Ref<boolean>
    submitForm: () => Promise<boolean>
}

export const useLoginForm = (): UseLoginFormReturn => {
    const form = ref<LoginFormState>({
        username: '',
        password: ''
    })

    const errors = ref<LoginFormErrors>({})
    const isSubmitting = ref<boolean>(false)

    const validate = (): boolean => {
        const nextErrors: LoginFormErrors = {}

        if (!form.value.username.trim()) {
            nextErrors.username = '请输入用户名'
        }

        if (form.value.password.length < 8) {
            nextErrors.password = '密码至少 8 位'
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
