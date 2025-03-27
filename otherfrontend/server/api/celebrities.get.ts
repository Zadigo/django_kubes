import { useAxiosClient } from "~/composables/client"
import type { TestApiResponse } from "~/types"

export default defineCachedEventHandler(async event => {
    const { client } = useAxiosClient(null, 8001)
    const response = await client.get<TestApiResponse>('/api/v1/test')
    return response.data
}, {
    base: 'redis',
    maxAge: 3000
})
