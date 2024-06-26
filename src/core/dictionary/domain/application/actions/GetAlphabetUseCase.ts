import type { Command } from '~/src/core/common/domain/Command'
import type { DictionaryService } from '~/src/core/dictionary/domain/application/services/DictionaryService'

export class GetAlphabetUseCase implements Command {
  constructor(private readonly service: DictionaryService) {
  }

  execute(): Promise<string[]> {
    return Promise.resolve(this.service.getAlphabet())
  }
}
