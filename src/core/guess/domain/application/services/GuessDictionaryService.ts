import type {GameDailyWord} from "~/src/core/game/domain/entities/GameDailyWord";
import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import type {GuessResult} from "~/src/core/guess/domain/entities/GuessResult";

export interface GuessDictionaryService {
    checkIfWordIsInDictionary(word: string): Promise<boolean>

    validate(dailyWord: GameDailyWord, guess: GuessWord): Promise<GuessResult>
}
