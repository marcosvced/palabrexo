import LogRocket from 'logrocket'
import type { Logger } from '~/src/core/common/infrastructure/logger/Logger'

export class LoggerImpl implements Pick<Logger, 'info' | 'error'> {
  constructor(
    private readonly appId: string,
    private readonly config?: object,
  ) {
    LogRocket.init(this.appId, this.config)
    if (import.meta.client) {
      LogRocket.identify(crypto.randomUUID())
    }
  }

  error(message: string | Error, data?: object): void {
    LogRocket.captureException(message as Error, data)
  }

  info(message: string, data?: object): void {
    LogRocket.info(message, data)
  }
}
