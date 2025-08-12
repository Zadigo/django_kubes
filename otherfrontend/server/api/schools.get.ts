import { FetchError } from 'ofetch'
import type { School } from '~/app/types'
import { refreshAccessToken } from '~/app/utils'

export default defineCachedEventHandler(async event => {
  const access = getCookie(event, 'access')
  const refresh = getCookie(event, 'refresh')

  try {
    const data = await $fetch<School>(`schools/v1/`, {
      baseURL: useRuntimeConfig().public.prodDomain,
      method: 'GET',
      headers: [
        ['Authorization', access ? `Token ${access}` : '']
      ]
    })
    return data
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.status === 401 && refresh) {
        const { access } = await refreshAccessToken(refresh)
        setCookie(event, 'access', access)
      } else {
        throw createError({
          statusCode: e.status || 500,
          message: e.message
        })
      }
    }
  }    
}, {
  base: 'redis',
  maxAge: 10
})
