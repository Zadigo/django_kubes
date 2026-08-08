import createErrorTemplate from '#shared/errors'

export default defineCachedEventHandler(async (event) => {
  try {
    return await $fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    const template = createErrorTemplate(e)
    throw createError(template)
  }
}, {
  maxAge: 60 * 60 * 24, // 1 day
})
