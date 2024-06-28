import type { Mapper } from '~/src/core/common/infrastructure/Mapper'
import { DictionaryDefinition } from '~/src/core/dictionary/domain/entities/DictionaryDefinition'
import type { DictionaryDefinitionDto } from '~/src/core/dictionary/infrastructure/dtos/DictionaryDefinitionDto'

export class DictionaryDefinitionMapper implements Pick<Mapper<DictionaryDefinition, DictionaryDefinitionDto>, 'toDomain'> {
  toDomain(dto: DictionaryDefinitionDto): DictionaryDefinition {
    return new DictionaryDefinition({ ...dto })
  }
}
