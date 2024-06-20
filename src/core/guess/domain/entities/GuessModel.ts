import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import {
    GuessWordIsNotDefinedException,
    GuessWordIsNotValidException,
    isGuessWordValid
} from "~/src/core/guess/domain/entities/GuessWord";
import {Serialize} from "~/src/core/common/domain/entities/Serialize";


export interface GuessModel {
    result?: string
    word?: GuessWord
}

@Serialize()
export class Guess implements GuessModel {
    result?: string
    word: GuessWord

    constructor({result, word}: GuessModel) {
        this.result = result
        this.word = word ?? ''
    }

    ensureGuessIsValid() {
        if (!this.word) {
            throw GuessWordIsNotDefinedException()
        }

        if (!isGuessWordValid(this.word)) {
            throw GuessWordIsNotValidException(this.word)
        }
    }
}