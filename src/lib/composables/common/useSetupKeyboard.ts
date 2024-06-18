import {VALID_CHARACTERS, WORD_LENGTH} from "~/src/core/guess/domain/entities/GuessWord";
import {useGuessPresenter} from "~/src/lib/composables/common/useGuessPresenter";

export const useSetupKeyboard = () => {

    const guessPresenter = useGuessPresenter()
    const {state: guess} = storeToRefs(guessPresenter)

    async function onKeyDown(evt: KeyboardEvent) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey) {
            return
        }

        const key = evt.key
        if ('Backspace' === key) {
            guessPresenter.setWord((guess.value?.word ?? '').slice(0, -1))
            return
        }
        if ('Enter' === key) {
            try {
                await guessPresenter.submit()
                return
            } catch (e) {
                // TODO: Show alert to user
                // if ((<DataException>e).kind) {
                //     const toast = new Toast((<DataException>e).error.message, 'danger')
                //     this.toastService.showAlert(toast)
                // }
                throw e
            }

        }
        if (VALID_CHARACTERS.test(key)) {
            if (WORD_LENGTH <= (guess.value?.word?.length ?? 0)) {
                return
            }
            guessPresenter.setWord((guess.value?.word ?? '').concat(key))
        } else {
            evt.preventDefault()
        }
    }

    if (import.meta.client) {
        window.addEventListener("keydown", onKeyDown);
    }
}