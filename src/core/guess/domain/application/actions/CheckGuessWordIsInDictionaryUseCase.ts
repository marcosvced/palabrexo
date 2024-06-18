import type {Command} from "~/src/core/common/domain/Command";
import type {GuessDictionaryService} from "~/src/core/guess/domain/application/services/GuessDictionaryService";

export class CheckGuessWordIsInDictionaryUseCase implements Command {
    constructor(private readonly service: GuessDictionaryService) {
    }

    execute(word: string): Promise<boolean> {
        return this.service.checkIfWordIsInDictionary(word)
    }
}