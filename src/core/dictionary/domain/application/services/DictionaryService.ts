import type {Dictionary} from "~/src/core/dictionary/domain/entities/Dictionary";

export interface DictionaryService {
  getAlphabet(): string[]
  getLettersPerRow(): number
}
