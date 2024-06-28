import type { Command } from '~/src/core/common/domain/Command'
import type { AlertService } from '~/src/core/alert/domain/application/service/AlertService'
import type { Alert } from '~/src/core/alert/domain/entities/AlertModel'
import { AlertKind } from '~/src/core/alert/domain/entities/AlertKind'

export class NewInfoAlertUseCase implements Command {
  constructor(private readonly service: AlertService) {}
  execute(payload?: Omit<Partial<Alert>, 'kind'>): Promise<Alert> {
    const {
      body = ['Info body'],
      title = 'Info title',
      icon = 'InfoIcon',
    } = payload ?? {}

    return Promise.resolve(this.service.create({ kind: AlertKind.INFO, body, title, icon }))
  }
}
