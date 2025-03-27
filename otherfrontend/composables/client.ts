import { AxiosError, type AxiosInstance } from 'axios'
import axios from 'axios'

export interface LoginApiResponse {
    access: string
    refresh: string
}

export type RefreshApiResposne = Pick<LoginApiResponse, 'access'>

/**
 * Checks whether the application in prodcution mode
 */
export function inProduction() {
    return process.env.NODE_ENV !== 'development'
}

/**
 * A function used in order to get the correct domain
 * to which a request should be sent (Django, Quart or Flask)
 * 
 * @param path The path to the endpoint to use
 * @param altDomain Alternative odmain to the one registered in useRuntimeConfig.public.prodUrl
 */
export function getDomain(altDomain?: string, websocket: boolean = false, port: number = 8000): string {
    let domain = '127.0.0.1'

    if (inProduction()) {
        domain = altDomain || useRuntimeConfig().public.prodUrl
    }

    let loc = websocket ? 'ws' : 'http'
    let url: URL

    if (inProduction()) {
        loc += 's'
    }

    if (!domain) {
        throw createError('prodDomain or altDomain needs to be specified')
    }

    if (domain && inProduction()) {
        url = new URL(`${loc}://${domain}`)
    } else {
        url = new URL(`${loc}://${domain}:${port}`)
    }

    return url.toString()
}

/**
 * Function used to create a basic axios client that
 * can be used to send api requests
 */
export function createSimpleClient(altDomain?: string, websocket: boolean = false, port: number = 8000) {
    return axios.create({
        baseURL: getDomain(altDomain, websocket, port),
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
    })
}

/**
 * Function that adds authentication intercepors on the base client
 * in order to send and handle authenticated requests 
 */
function authenticationInterceptors(client: AxiosInstance, access?: string | null | undefined, refresh?: string | null | undefined, refreshCallback?: (token: string) => void, errorCallback?: (error: AxiosError) => void) {
    client.interceptors.request.use(
        config => {
            if (access) {
                config.headers.Authorization = `Token ${access}`
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    client.interceptors.response.use(
        response => {
            return response
        },
        async (error) => {
            // Sequence that refreshes the access token when
            // we get a 401 code trying to access a page

            const originalRequest = error.config

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    const authClient = axios.create({ baseURL: getDomain() })
                    const response = await authClient.post<RefreshApiResposne>('/auth/v1/refresh', { refresh })
                    
                    if (refreshCallback) {
                        refreshCallback(response.data.access)
                    }

                    return authClient
                } catch (refreshError) {
                    if (errorCallback && refreshError instanceof AxiosError) {
                        errorCallback(refreshError)
                    }
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error)
        }
    )

    return client
}

/**
 * Composable used to get an Axios instance on the client side.
 * It allows us to invoke composables such as "useCookies" from
 * vueuse and other composables that require client sotrages to
 * be fully available
 */
export function useAxiosClient() {
    const client = createSimpleClient()
    const authenticatedClient = authenticationInterceptors(client)

    return {
        client,
        authenticatedClient
    }
}

/**
 * Same as useAxiosClient but adds a layer of authentication
 * that with access and refresh tokens for protected views
 */
export function useAuthenticatedAxiosClient(access: string | null | undefined, refresh: string | null | undefined) {
    const { client } = useAxiosClient()
    const authenticatedClient = authenticationInterceptors(client, access, refresh)

    return {
        authenticatedClient
    }
}

/**
 * Composable used to get an Axios instance on the server side.
 * The storages are not directly accessible and required special
 * SSR methods provided by Nuxt in order to be accessed
 */
export function useServerAxiosClient(access?: string, refresh?: string, refreshCallback?: (token: string) => void, errorCallback?: (error: AxiosError) => void) {
    const client = createSimpleClient()
    const authenticatedClient = authenticationInterceptors(client, access, refresh, refreshCallback, errorCallback)

    return {
        client,
        authenticatedClient
    }
}

