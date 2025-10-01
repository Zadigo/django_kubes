export * from './accounts'

export type Undefineable<T> = T | undefined

export type Nullable <T> = T | null

export type Maybe<T> = Undefineable<T> | Nullable<T>

export type UndefinedRef<T> = Ref<Undefineable<T>>

export interface School {
    objectid: string
    name: string
    state: string
    website: string
}

export interface TestApiResponse {
    status: boolean
}
