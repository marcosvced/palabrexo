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
import {GuessWordException, WORD_LENGTH} from "~/src/core/guess/domain/entities/GuessWord";
import {GuessLetterResult} from "~/src/core/guess/domain/entities/GuessLetterResult";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import {normalizeWord} from "~/src/core/common/helpers/normalizeWord";
import {useAlertsPresenter} from "~/src/lib/composables/common/useAlertsPresenter";
import {AlertKind} from "~/src/core/alert/domain/entities/AlertKind";
import {Game} from "~/src/core/game/domain/entities/GameModel";

export const GuessPresenter = (
    submitGuessUseCase: SubmitGuessUseCase,
    checkInDictionaryUseCase: CheckGuessWordIsInDictionaryUseCase
) => defineStore('GuessPresenter', () => {

    const gamePresenter = useGamePresenter()
    const {state: game} = storeToRefs(gamePresenter)

    const alertsPresenter = useAlertsPresenter()

    const state: Ref<Guess | undefined> = ref()

    async function submit() {
        console.log(game.value instanceof Game)
        if (!state.value || !game.value) {
            return
        }

        state.value.ensureGuessIsValid()
        game.value.ensureWordHasNotBeenUsed(state.value.word)

        try {
            await checkInDictionaryUseCase.execute(state.value.word)
            const result: GuessResult = await submitGuessUseCase.execute({
                target: game.value.wordToGuess ?? '',
                guess: state.value.word
            })

            gamePresenter.setGuesses(new Guess({result, word: state.value.word}))

            if (result === new Array(WORD_LENGTH).fill(GuessLetterResult.VALID).join('')) {
                gamePresenter.setStatus(GameStatus.WON)
            }
            state.value = undefined
        } catch (e) {
            if (GuessWordException.DOESNT_EXIST === (<DataException>e).kind) {
                await alertsPresenter.dispatch(AlertKind.ERROR, {
                    body: [
                        'A palabra introducida non existe na RAG.',
                        'Recorda que os plurais non son palabas válidas.'
                    ]
                })
            }
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