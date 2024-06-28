import type { Command } from '~/src/core/common/domain/Command'
import type { GuessService } from '~/src/core/guess/domain/application/services/GuessService'

export class CheckGuessWordIsInDictionaryUseCase implements Command {
  constructor(private readonly service: GuessService) {
  }

  execute(word: string): Promise<boolean> {
    return this.service.checkIfWordIsInDictionary(word)
  }
}
