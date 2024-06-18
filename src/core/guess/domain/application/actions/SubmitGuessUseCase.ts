import type {Command} from "~/src/core/common/domain/Command";
import type {GuessDictionaryService} from "~/src/core/guess/domain/application/services/GuessDictionaryService";
import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import type {GuessResult} from "~/src/core/guess/domain/entities/GuessResult";
import type {GameDailyWord} from "~/src/core/game/domain/entities/GameDailyWord";

export class SubmitGuessUseCase implements Command {
    constructor(private readonly service: GuessDictionaryService) {
    }

    execute({target, guess}: { target: GameDailyWord, guess: GuessWord }): Promise<GuessResult> {
        return this.service.validate(target, guess)
    }
}