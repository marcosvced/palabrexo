import {useGuessPresenter} from "~/src/lib/composables/common/useGuessPresenter";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";

export type UseGuess = {
    guess: Ref<Guess | undefined>
}

export const useGuess = (): UseGuess => {
    const guessPresenter = useGuessPresenter()
    const {state: guess} = storeToRefs(guessPresenter)
    return {guess}
}