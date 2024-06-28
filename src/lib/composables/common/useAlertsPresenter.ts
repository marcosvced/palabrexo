import { AlertsPresenter } from '~/src/core/alert/presentation/AlertsPresenter'
import { AlertServiceImpl } from '~/src/core/alert/domain/application/service/AlertServiceImpl'
import { NewSuccessAlertUseCase } from '~/src/core/alert/domain/application/actions/NewSuccessAlertUseCase'
import { NewInfoAlertUseCase } from '~/src/core/alert/domain/application/actions/NewInfoAlertUseCase'
import { NewErrorAlertUseCase } from '~/src/core/alert/domain/application/actions/NewErrorAlertUseCase'

export function useAlertsPresenter() {
  const service = new AlertServiceImpl()
  const successAlertUseCase = new NewSuccessAlertUseCase(service)
  const infoAlertUseCase = new NewInfoAlertUseCase(service)
  const errorAlertUseCase = new NewErrorAlertUseCase(service)
  const presenter = new AlertsPresenter(
    successAlertUseCase,
    infoAlertUseCase,
    errorAlertUseCase,
  )
  return presenter.store
}
