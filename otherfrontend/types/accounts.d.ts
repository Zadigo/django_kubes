export interface LoginApiResponse {
  access: string
  refresh: string
}

export type TokenRefreshApiResponse = Pick<LoginApiResponse, 'access'>
