import { defineEventHandler } from "h3"

export default defineEventHandler(async (_event) => {
  // const cached = defineCachedFunction(async () => {
  //   const data = await $fetch('https://jsonplaceholder.typicode.com/todos')
  //   return data
  // }, {
  //   maxAge: 60 * 60, // 1 hour,
  //   name: 'todos',

  // })

  const data = await $fetch('https://jsonplaceholder.typicode.com/todos')
  return {
    message: "Testing",
    results: data
  }
})
