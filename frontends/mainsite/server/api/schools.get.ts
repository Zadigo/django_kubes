import type { School } from '~/types'
import createErrorTemplate from '#shared/errors'

export default defineCachedEventHandler(async event => {
  const access = getCookie(event, 'access')

  try {
    return await $fetch<School>(`schools/v1/`, {
      baseURL: useRuntimeConfig().public.prodDomain,
      method: 'GET',
      headers: [
        ['Authorization', access ? `Token ${access}` : ''],
        ['Accept', 'application/json'],
        ['Content-Type', 'application/json']
      ]
    })
  } catch (e) {
    const template = createErrorTemplate(e)
    throw createError(template)
  }
}, {
  base: 'redis',
  maxAge: 10
})
