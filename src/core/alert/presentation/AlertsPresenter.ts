import type { Ref } from 'vue'
import type { Alert } from '~/src/core/alert/domain/entities/AlertModel'
import type { NewSuccessAlertUseCase } from '~/src/core/alert/domain/application/actions/NewSuccessAlertUseCase'
import { AlertKind } from '~/src/core/alert/domain/entities/AlertKind'
import type { NewInfoAlertUseCase } from '~/src/core/alert/domain/application/actions/NewInfoAlertUseCase'
import type { NewErrorAlertUseCase } from '~/src/core/alert/domain/application/actions/NewErrorAlertUseCase'
import { Presenter } from '~/src/core/common/presentation/Presenter'

export class AlertsPresenter extends Presenter {
  constructor(
    private readonly newInfoAlertUseCase: NewInfoAlertUseCase,
    private readonly newSuccessAlertUseCase: NewSuccessAlertUseCase,
    private readonly newErrorAlertUseCase: NewErrorAlertUseCase,
  ) {
    super()
    this.defineStore('AlertsPresenter')
  }

  defineStore(key: string): any {
    this.store = defineStore(key, () => {
      const state: Ref<Alert[]> = ref([])
      const remove = (alert: Alert) => {
        state.value.splice(state.value.indexOf(alert), 1)
      }

      const dispatch = async (kind: AlertKind, payload?: Omit<Partial<Alert>, 'kind'>) => {
        const alert: Alert = await this._classify(kind, payload)
        alert.subscribe(remove)
        alert.destroy()
        state.value.push(alert)
      }

      return {
        state,
        dispatch,
        remove,
      }
    })
  }

  private _classify(kind: AlertKind, payload?: Omit<Partial<Alert>, 'kind'>) {
    switch (kind) {
      case AlertKind.SUCCESS:
        return this.newSuccessAlertUseCase.execute(payload)
      case AlertKind.ERROR:
        return this.newErrorAlertUseCase.execute(payload)
      default:
        return this.newInfoAlertUseCase.execute(payload)
    }
  }
}
