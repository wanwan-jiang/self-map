import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
    const loginSuccess = ref(false)

    function setLoginResult(success: boolean): void {
        loginSuccess.value = success
    }

    function clearLoginSuccess(): void {
        loginSuccess.value = false
    }

    return {
        loginSuccess,
        setLoginResult,
        clearLoginSuccess,
    }
})
