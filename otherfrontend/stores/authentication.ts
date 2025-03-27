export const useAuthentication = defineStore('authentication', () => {
    const accessToken = ref<string>()
    const refreshToken = ref<string>()
    
    return {
        accessToken,
        refreshToken
    }
})
