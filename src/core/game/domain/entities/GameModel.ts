import type {GameId} from "~/src/core/game/domain/entities/GameId";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import type {GameGuesses} from "~/src/core/game/domain/entities/GameGuesses";
import {GameIdIsNotDefinedException, isGameIdDefined} from "~/src/core/game/domain/entities/GameId";
import {GameGuessesWordUsedException, isWordOnGuessList} from "~/src/core/game/domain/entities/GameGuesses";
import {Serialize} from "~/src/core/common/domain/entities/Serialize";

export interface GameModel {
    id?: GameId
    status?: GameStatus
    attempts?: number
    wordToGuess?: string
    guesses?: Guess[]
}

@Serialize()
export class Game implements GameModel {
    id?: GameId
    attempts: number
    guesses?: GameGuesses
    status?: GameStatus
    wordToGuess?: string

    constructor({id, status, attempts, wordToGuess, guesses}: GameModel) {
        this.id = id
        this.status = status ?? GameStatus.IN_PROGRESS
        this.attempts = attempts ?? 0
        this.wordToGuess = wordToGuess
        this.guesses = guesses ?? []
    }

    ensureGameIsValid() {
        if (!isGameIdDefined(this.id)) {
            throw GameIdIsNotDefinedException()
        }
    }

    ensureWordHasNotBeenUsed(word: string) {
        if (isWordOnGuessList(word, this.guesses)) {
            throw GameGuessesWordUsedException(word)
        }
    }
}

