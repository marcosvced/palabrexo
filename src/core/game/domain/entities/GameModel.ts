import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import type {GameGuesses} from "~/src/core/game/domain/entities/GameGuesses";
import {GameGuessesWordUsedException, isWordOnGuessList} from "~/src/core/game/domain/entities/GameGuesses";
import {Serialize} from "~/src/core/common/domain/entities/Serialize";

export interface GameModel {
    status?: GameStatus
    attempts?: number
    wordToGuess?: string
    guesses?: Guess[]
}

@Serialize()
export class Game implements GameModel {
    attempts: number
    guesses: GameGuesses
    status: GameStatus
    wordToGuess?: string

    constructor({status, attempts, wordToGuess, guesses}: GameModel) {
        this.status = status ?? GameStatus.IN_PROGRESS
        this.attempts = attempts ?? 0
        this.wordToGuess = wordToGuess
        this.guesses = guesses ?? []
    }


    ensureWordHasNotBeenUsed(word: string) {
        if (isWordOnGuessList(word, this.guesses)) {
            throw GameGuessesWordUsedException(word)
        }
    }
}

