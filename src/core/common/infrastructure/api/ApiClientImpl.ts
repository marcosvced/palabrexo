import type { ApiClient } from '~/src/core/common/infrastructure/api/ApiClient'
import type { ApiResponse } from '~/src/core/common/domain/entities/ApiResponse'
import { useEither } from '~/src/core/common/domain/entities/Either'

export class ApiClientImpl implements ApiClient {
  constructor(readonly baseUrl: string) {
  }

  delete<T>({ url, params }: { url: string, params?: any }): Promise<ApiResponse<T>> {
    const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
    return doFetch(URL, { method: 'DELETE' })
  }

  get<T>({ url, params }: { url: string, params?: any }): Promise<ApiResponse<T>> {
    const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
    return doFetch(URL)
  }

  post<T>({ url, params, payload }: { url: string, params?: any, payload?: any }): Promise<ApiResponse<T>> {
    const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
    return doFetch(URL, { method: 'POST', body: JSON.stringify(payload) })
  }

  update<T>({ url, params, payload }: { url: string, params?: any, payload?: any }): Promise<ApiResponse<T>> {
    const URL = createUrlWithParams(`${this.baseUrl}${url}`, params)
    return doFetch(URL, { method: 'PUT', body: JSON.stringify(payload) })
  }
}

async function doFetch<T>(url: string, options = {}): Promise<ApiResponse<T>> {
  const response = await fetch(url, options)
  const data = await response.json()
  if (!response.ok) {
    return useEither.left({
      status: data.statusCode,
      message: data.message,
    })
  }

  return useEither.right({
    status: response.status,
    data,
  })
}

function createUrlWithParams(url: string, params?: any) {
  if (!params) {
    return url
  }
  const newUrl = new URL(url)
  Object.entries(params).forEach(([key, value]) => {
    newUrl.searchParams.append(<string>key, <string>value)
  })
  return newUrl.toString()
}
