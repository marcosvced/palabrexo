import type {GuessService} from "~/src/core/guess/domain/application/services/GuessService";
import type {DictionaryRepository} from "~/src/core/dictionary/domain/ports/DictionaryRepository";
import type {GameDailyWord} from "~/src/core/game/domain/entities/GameDailyWord";
import {type GuessWord, GuessWordDoesntExistException} from "~/src/core/guess/domain/entities/GuessWord";
import type {GuessResult} from "~/src/core/guess/domain/entities/GuessResult";
import type {DataException} from "~/src/core/common/domain/entities/DataException";
import {DictionaryException} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";

export class GuessServiceImpl implements GuessService {
    constructor(private readonly repository: DictionaryRepository) {
    }

    validate(dailyWord: GameDailyWord, guess: GuessWord): Promise<GuessResult> {
        return Promise.resolve(compareGuess(dailyWord, guess))
    }

    async checkIfWordIsInDictionary(word: string): Promise<boolean> {

        try {
            await this.repository.search(word)
        } catch (e) {
            if (DictionaryException.NOT_FOUND === (<DataException>e).kind) {
                throw GuessWordDoesntExistException(word)
            }
        }

        return Promise.resolve(true)
    }


}

function compareGuess(target: GameDailyWord, guess: GuessWord) {
    const result = []
    const targetArray = target.split('')
    const guessArray = guess.split('')

    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === targetArray[i]) {
            result[i] = 2
            targetArray[i] = ''
            guessArray[i] = ''
        }
    }

    for (let i = 0; i < guessArray.length; i++) {
        if ('' !== guessArray[i]) {
            const index = targetArray.indexOf(guessArray[i])
            if (-1 !== index) {
                result[i] = 1
                targetArray[index] = ''
            } else {
                result[i] = 0
            }
        }
    }

    return result.join('')
}