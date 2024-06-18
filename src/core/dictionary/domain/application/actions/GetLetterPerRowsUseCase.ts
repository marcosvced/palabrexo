import type {Command} from "~/src/core/common/domain/Command";
import type {DictionaryService} from "~/src/core/dictionary/domain/application/services/DictionaryService";

export class GetLetterPerRowsUseCase implements Command {

  constructor(private readonly service: DictionaryService) {
  }

  execute(): number {
    return this.service.getLettersPerRow()
  }
}
