import type { ResponseStatus } from './ResponseStatus'
import type { Either } from '~/src/core/common/domain/entities/Either'

interface Response {
  status: ResponseStatus
}

export interface ResponseError extends Response {
  message: string
}

export interface ResponseData<T> extends Response {
  data: T
}

export type ApiResponse<T> = Either<ResponseError, ResponseData<T>>
