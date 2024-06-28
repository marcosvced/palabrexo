export interface Logger {
  error: (message: string | Error, data?: object) => void

  warn: (message: string, data?: object) => void

  info: (message: string, data?: object) => void

  debug: (message: string, data?: object) => void
}
