import {defineStore} from "pinia";
import {Game} from "~/src/core/game/domain/entities/GameModel";
import type {Ref} from "vue";
import {UnexpectedException} from "~/src/core/common/domain/entities/DataException";
import type {StartGameUseCase} from "~/src/core/game/domain/application/actions/StartGameUseCase";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import {GameBoard} from "~/src/core/game/domain/entities/GameBoard";

export const GamePresenter = (
    startGameUseCase: StartGameUseCase,
) => defineStore('GamePresenter', () => {

    const state: Ref<Game | undefined> = ref()

    async function start() {
        try {
            state.value = await startGameUseCase.execute()
        } catch (e) {
            throw UnexpectedException()
        }
    }

    function setStatus(status: GameStatus) {
        const newState = state.value ?? new Game({})
        newState.status = status

        state.value = new Game(newState)
    }

    function setGuesses(guess: Guess) {
        const newState = state.value ?? new Game({})
        newState.guesses.push(guess)
        if (GameBoard.ROWS > newState.attempts) {
            newState.attempts++
        }
        state.value = new Game(newState)
    }

    return {
        state,
        start,
        setGuesses,
        setStatus
    }

})()