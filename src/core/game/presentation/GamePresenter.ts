import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { Game } from '~/src/core/game/domain/entities/GameModel'
import { UnexpectedException } from '~/src/core/common/domain/entities/DataException'
import type { StartGameUseCase } from '~/src/core/game/domain/application/actions/StartGameUseCase'
import { GameStatus } from '~/src/core/game/domain/entities/GameStatus'
import type { Guess } from '~/src/core/guess/domain/entities/GuessModel'
import { GameBoard } from '~/src/core/game/domain/entities/GameBoard'
import { Presenter } from '~/src/core/common/presentation/Presenter'

export class GamePresenter extends Presenter {
  constructor(
    private readonly startGameUseCase: StartGameUseCase,
  ) {
    super()
    this.defineStore('GamePresenter')
  }

  defineStore(key: string): any {
    this.store = defineStore(key, () => {
      const state: Ref<Game | undefined> = ref()

      const start = async () => {
        try {
          state.value = await this.startGameUseCase.execute()
          this.logger.info('GamePresenter', { wordToGuess: state.value.wordToGuess })
        }
        catch (e) {
          throw UnexpectedException()
        }
      }

      const restart = async () => {
        state.value = undefined
        await start()
      }

      const setStatus = (status: GameStatus) => {
        const newState = state.value ?? new Game({})
        newState.status = status

        state.value = new Game(newState)
      }

      const setGuesses = (guess: Guess) => {
        const newState = state.value ?? new Game({})
        newState.attempts++
        if (GameBoard.ROWS <= newState.attempts) {
          setStatus(GameStatus.FINISHED)
          return
        }
        newState.guesses.push(guess)
        state.value = new Game(newState)
      }

      return {
        state,
        start,
        restart,
        setGuesses,
        setStatus,
      }
    })
  }
}
