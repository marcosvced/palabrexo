import type { Command } from '~/src/core/common/domain/Command'
import type { DictionaryDefinition } from '~/src/core/dictionary/domain/entities/DictionaryDefinition'
import type { GuessWord } from '~/src/core/guess/domain/entities/GuessWord'
import type { DictionaryRepository } from '~/src/core/dictionary/domain/ports/DictionaryRepository'

export class DictionarySearchUseCase implements Command {
  constructor(private readonly repository: DictionaryRepository) {
  }

  execute(word: GuessWord): Promise<DictionaryDefinition[]> {
    return this.repository.search(word)
  }
}
