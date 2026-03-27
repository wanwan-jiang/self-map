import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {
    const registerSuccess = ref(false)

    function setRegisterResult(success: boolean): void {
        registerSuccess.value = success
    }

    function clearRegisterSuccess(): void {
        registerSuccess.value = false
    }

    return {
        registerSuccess,
        setRegisterResult,
        clearRegisterSuccess,
    }
})
