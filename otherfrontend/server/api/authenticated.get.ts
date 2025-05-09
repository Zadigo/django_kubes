import { useServerAxiosClient } from '~/composables/client'
import type { School } from '~/types'

export default defineCachedEventHandler(async event => {
    const access = getCookie(event, 'access')
    const refresh = getCookie(event, 'refresh')

    const { client } = useServerAxiosClient(access, refresh, (token) => {
        setCookie(event, 'access', token)
    }, () => {
        deleteCookie(event, 'access')
        deleteCookie(event, 'refresh')
    })

    const response = await client.get<School[]>('/schools/v1/test-authenticated')
    return response.data
}, {
    base: 'redis',
    maxAge: 10
})
