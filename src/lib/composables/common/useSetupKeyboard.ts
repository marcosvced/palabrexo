import {VALID_CHARACTERS, WORD_LENGTH} from "~/src/core/guess/domain/entities/GuessWord";
import {useGuessPresenter} from "~/src/lib/composables/common/useGuessPresenter";
import {SPECIAL_KEYS, SpecialKeys} from "~/src/core/dictionary/domain/entities/SpecialKeys";
import {useAlertsPresenter} from "~/src/lib/composables/common/useAlertsPresenter";
import {AlertKind} from "~/src/core/alert/domain/entities/AlertKind";

export const useSetupKeyboard = () => {

    const alertPresenter = useAlertsPresenter()

    const guessPresenter = useGuessPresenter()
    const {state: guess} = storeToRefs(guessPresenter)

    async function onKeyDown(evt: KeyboardEvent) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey) {
            return
        }

        const key = evt.key
        if (SPECIAL_KEYS.DELETE === key) {
            guessPresenter.setWord((guess.value?.word ?? '').slice(0, -1))
            return
        }
        if (SPECIAL_KEYS.ENTER === key) {
            await guessPresenter.submit()
            return
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