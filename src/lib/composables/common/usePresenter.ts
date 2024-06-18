import type {Dependencies} from "~/src/core/common/dependencies/Container";
import {defineStore} from "pinia";

type Presenter<S, P extends Ploc<S>> = {
    presenter: P
    state: Ref<S>
}

export const usePresenter = <S, P extends Ploc<S>>(key: Dependencies): Presenter<S, P> => defineStore(`${key}Store`, () => {
    const {$container} = useNuxtApp()
    const presenter: P = $container.get(key)
    const state: Ref<S> = ref(presenter.state)

    const stateSubscription = (newState: S) => {
        state.value = newState;
    };

    onBeforeMount(() => {
        presenter.subscribe(stateSubscription);
    });

    onUnmounted(() => {
        presenter.unsubscribe(stateSubscription);
    });

    return {
        presenter,
        state
    };
})()
// export const usePresenter = <S, P extends Ploc<S>>(key: Dependencies): Presenter<S, P> => {
//     const {$container} = useNuxtApp()
//     const presenter: P = $container.get(key)
//     const state: Ref<S> = ref(presenter.state)
//     const stateSubscription = (newState: S) => {
//         console.log('--->', newState)
//         state.value = newState;
//     };
//     onBeforeMount(() => {
//         presenter.subscribe(stateSubscription);
//     });
//     onUnmounted(() => {
//         presenter.unsubscribe(stateSubscription);
//     });
//     return {
//         presenter,
//         state
//     };
// }