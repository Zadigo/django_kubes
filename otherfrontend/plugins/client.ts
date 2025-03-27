import { useAuthenticatedAxiosClient } from '~/composables/client'

export default defineNuxtPlugin(nuxtApp => {
    const access = useCookie('access')
    const refresh = useCookie('refresh')
    const { authenticatedClient } = useAuthenticatedAxiosClient(access.value, refresh.value)
    
    return {
        provide: {
            djangoClient: authenticatedClient
        }
    }
})
