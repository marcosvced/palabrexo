import type {Alert} from "~/src/core/alert/domiain/entities/AlertModel";

export const AlertsPresenter = () => defineStore('AlertsPresenter', () => {
    const state: Ref<Alert[]> = ref([])

    function dispatch(alert: Alert) {
        state.value.push(alert)
    }

    function remove(alert: Alert) {
        state.value.splice(state.value.indexOf(alert), 1)
    }

    return {
        state,
        dispatch,
        remove
    }
})()