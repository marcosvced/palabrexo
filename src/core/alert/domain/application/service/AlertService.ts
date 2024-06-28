import type { Alert, type AlertModel } from '~/src/core/alert/domain/entities/AlertModel'

export interface AlertService {
  create: (payload?: Partial<AlertModel>) => Alert
}
