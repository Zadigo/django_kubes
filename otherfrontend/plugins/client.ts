import { useAuthenticatedAxiosClient } from '~/composables/client'

export default defineNuxtPlugin(nuxtApp => {
    const access = useCookie('access')
    const { authenticatedClient } = useAuthenticatedAxiosClient(access.value)
    
    return {
        provide: {
            djangoClient: authenticatedClient
        }
    }
})
