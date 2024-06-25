import type {Ref} from "vue";
import {Alert} from "~/src/core/alert/domain/entities/AlertModel";
import {NewSuccessAlertUseCase} from "~/src/core/alert/domain/application/actions/NewSuccessAlertUseCase";
import {AlertKind} from "~/src/core/alert/domain/entities/AlertKind";
import {NewInfoAlertUseCase} from "~/src/core/alert/domain/application/actions/NewInfoAlertUseCase";
import type {NewErrorAlertUseCase} from "~/src/core/alert/domain/application/actions/NewErrorAlertUseCase";

export const AlertsPresenter = (
    newInfoAlertUseCase: NewInfoAlertUseCase,
    newSuccessAlertUseCase: NewSuccessAlertUseCase,
    newErrorAlertUseCase: NewErrorAlertUseCase,
) => defineStore('AlertsPresenter', () => {
    const state: Ref<Alert[]> = ref([])

    async function dispatch(kind: AlertKind, payload?: Omit<Partial<Alert>, 'kind'>) {
        const alert: Alert = await _classify(kind, payload)
        alert.subscribe(remove)
        alert.destroy()
        state.value.push(alert)
    }

    function remove(alert: Alert) {
        state.value.splice(state.value.indexOf(alert), 1)
    }

    function _classify(kind: AlertKind, payload?: Omit<Partial<Alert>, 'kind'>) {
        switch (kind) {
            case AlertKind.SUCCESS:
                return newSuccessAlertUseCase.execute(payload)
            case AlertKind.ERROR:
                return newErrorAlertUseCase.execute(payload)
            default:
                return newInfoAlertUseCase.execute(payload)
        }
    }

    return {
        state,
        dispatch,
        remove
    }
})()