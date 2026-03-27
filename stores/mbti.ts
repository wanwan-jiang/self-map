interface MbtiState {
    isSubmitSuccess: boolean
    isSubmitting: boolean
}

export const useMbtiStore = defineStore('mbti', {
    state: (): MbtiState => ({
        isSubmitSuccess: false,
        isSubmitting: false
    }),
    actions: {
        async submitTest(): Promise<boolean> {
            this.isSubmitting = true
            try {
                // TODO: replace with real submit API call
                await new Promise<void>((resolve) => {
                    setTimeout(() => resolve(), 400)
                })
                this.isSubmitSuccess = true
                return true
            } catch {
                this.isSubmitSuccess = false
                return false
            } finally {
                this.isSubmitting = false
            }
        },
        resetSubmitState(): void {
            this.isSubmitSuccess = false
        }
    }
})
