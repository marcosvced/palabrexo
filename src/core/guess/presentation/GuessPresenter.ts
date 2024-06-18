import {defineStore} from "pinia";
import type {Ref} from "vue";
import {useGamePresenter} from "~/src/lib/composables/common/useGamePresenter";
import {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import type {DataException} from "~/src/core/common/domain/entities/DataException";
import {UnexpectedException} from "~/src/core/common/domain/entities/DataException";
import type {SubmitGuessUseCase} from "~/src/core/guess/domain/application/actions/SubmitGuessUseCase";
import type {
    CheckGuessWordIsInDictionaryUseCase
} from "~/src/core/guess/domain/application/actions/CheckGuessWordIsInDictionaryUseCase";
import type {GuessResult} from "~/src/core/guess/domain/entities/GuessResult";
import {WORD_LENGTH} from "~/src/core/guess/domain/entities/GuessWord";
import {GuessLetterResult} from "~/src/core/guess/domain/entities/GuessLetterResult";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import {normalizeWord} from "~/src/core/common/helpers/normalizeWord";

export const GuessPresenter = (
    submitGuessUseCase: SubmitGuessUseCase,
    checkInDictionaryUseCase: CheckGuessWordIsInDictionaryUseCase
) => defineStore('GuessPresenter', () => {
    const gamePresenter = useGamePresenter()
    const {state: game} = storeToRefs(gamePresenter)
    const state: Ref<Guess | undefined> = ref()

    async function submit() {
        state.value?.ensureGuessIsValid()

        game.value?.ensureGameIsValid()
        game.value?.ensureWordHasNotBeenUsed(state.value.word)

        try {
            // TODO: add this method to DictionaryPresenter
            await checkInDictionaryUseCase.execute(state.value.word)
            const result: GuessResult = await submitGuessUseCase.execute({
                target: game.value.wordToGuess ?? '',
                guess: state.value.word
            })

            gamePresenter.setGuesses(new Guess({result, word: state.value.word}))
console.log('aka')

            if (result === new Array(WORD_LENGTH).fill(GuessLetterResult.VALID).join('')) {
                gamePresenter.setStatus(GameStatus.WON)
            }
            state.value = undefined
        } catch (e) {
            throw (e as DataException)?.kind ? e : UnexpectedException()
        }
    }

    function setWord(word: string) {
        state.value = new Guess({
            word: normalizeWord(word)
        })
    }

    return {
        state,
        submit,
        setWord
    }

})()