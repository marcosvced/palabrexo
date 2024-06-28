import { Serialize } from '~/src/core/common/domain/decorators/Serialize'
import type { DataException } from '~/src/core/common/domain/entities/DataException'

export interface DictionaryDefinitionModel {
  lemma: string
  partOfSpeech: string
  definition: string
  example: string
  synonym: string
}

@Serialize()
export class DictionaryDefinition implements DictionaryDefinitionModel {
  definition: string
  example: string
  lemma: string
  partOfSpeech: string
  synonym: string

  constructor({
    definition,
                    example,
                    lemma,
                    partOfSpeech,
                    synonym,
  }: DictionaryDefinitionModel) {
    this.definition = definition
    this.example = example
    this.lemma = lemma
    this.partOfSpeech = partOfSpeech
    this.synonym = synonym
  }
}

export enum DictionaryException {
  NOT_FOUND = 'DictionaryNotFoundException',
}

export function DictionaryNotFoundException(): DataException {
  return {
    kind: DictionaryException.NOT_FOUND,
    error: new Error('😵 The word doesn\'t exist in the RAG'),
  }
}
