export interface DataException { kind: string, error: Error }

export enum GenericException {
  UNEXPECTED = 'UnexpectedException',
}

export function UnexpectedException(): DataException {
  return {
    kind: GenericException.UNEXPECTED,
    error: new Error('🚨 Something went wrong.'),
  }
}

export interface HandlerException {
  handlerException: (exception: DataException) => void
}
