import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { useGamePresenter } from '~/src/lib/composables/common/useGamePresenter'
import { Guess } from '~/src/core/guess/domain/entities/GuessModel'
import type { DataException, HandlerException } from '~/src/core/common/domain/entities/DataException'
import type { SubmitGuessUseCase } from '~/src/core/guess/domain/application/actions/SubmitGuessUseCase'
import type {
  CheckGuessWordIsInDictionaryUseCase,
} from '~/src/core/guess/domain/application/actions/CheckGuessWordIsInDictionaryUseCase'
import type { GuessResult } from '~/src/core/guess/domain/entities/GuessResult'
import { GuessWordException, WORD_LENGTH } from '~/src/core/guess/domain/entities/GuessWord'
import { GuessLetterResult } from '~/src/core/guess/domain/entities/GuessLetterResult'
import { GameStatus } from '~/src/core/game/domain/entities/GameStatus'
import { normalizeWord } from '~/src/core/common/helpers/normalizeWord'
import { useAlertsPresenter } from '~/src/lib/composables/common/useAlertsPresenter'
import { AlertKind } from '~/src/core/alert/domain/entities/AlertKind'
import { Presenter } from '~/src/core/common/presentation/Presenter'
import { GameGuessesException } from '~/src/core/game/domain/entities/GameGuesses'

export class GuessPresenter extends Presenter implements HandlerException {
  constructor(
    private readonly submitGuessUseCase: SubmitGuessUseCase,
    private readonly checkInDictionaryUseCase: CheckGuessWordIsInDictionaryUseCase,
  ) {
    super()
    this.defineStore('GuessPresenter')
  }

  defineStore(key: string): any {
    this.store = defineStore(key, () => {
      const gamePresenter = useGamePresenter()
      const { state: game } = storeToRefs(gamePresenter)

      const state: Ref<Guess | undefined> = ref()

      const submit = async () => {
        if (!state.value || !game.value) {
          return
        }

        this.logger.info('GuessPresenter.Submit()', { word: state.value?.word })

        try {
          state.value.ensureGuessIsValid()
          game.value.ensureWordHasNotBeenUsed(state.value.word)

          await this.checkInDictionaryUseCase.execute(state.value.word)
          const result: GuessResult = await this.submitGuessUseCase.execute({
            target: game.value.wordToGuess ?? '',
            guess: state.value.word,
          })

          gamePresenter.setGuesses(new Guess({ result, word: state.value.word }))

          if (result === Array.from({ length: WORD_LENGTH }).fill(GuessLetterResult.VALID).join('')) {
            gamePresenter.setStatus(GameStatus.WON)
          }
          state.value = undefined
        }
        catch (e) {
          await this.handlerException(e as DataException, state.value?.word)
        }
      }

      const setWord = (word: string) => {
        state.value = new Guess({
          word: normalizeWord(word),
        })
      }

      return {
        state,
        submit,
        setWord,
      }
    })
  }

  async handlerException(exception: DataException, word?: string): Promise<void> {
    const alertsPresenter = useAlertsPresenter()
    let title = ''
    let body = []
    switch (exception.kind) {
      case GuessWordException.DOESNT_EXIST:
        title = 'A palabra non existe'
        body = [
                    `${word?.toUpperCase()} non existe na RAG.`,
                    'Recorda que os plurais non son palabas válidas.',
        ]
        break
      case GameGuessesException.USED:
        title = 'Palabra repetida'
        body = [
                    `Xa intentaches a palabra ${word?.toUpperCase()}.`,
                    'Debes introducir unha palabra distinta.',
        ]
        break
      case GuessWordException.INVALID:
        title = 'O tamaño da palabra non é válido'
        body = [`A palabra introducida debe ter ${WORD_LENGTH} letras.`]
        break
      default:
        body = [exception.error.message]
        this.logger.error(exception.error, { word })
    }

    await alertsPresenter.dispatch(AlertKind.ERROR, { title, body })
  }
}
