import type {DictionaryService} from "~/src/core/dictionary/domain/application/services/DictionaryService";
import {Dictionary} from "~/src/core/dictionary/domain/entities/Dictionary";

export class DictionaryServiceImpl implements DictionaryService {
  private readonly dictionary: Dictionary

  constructor() {
    this.dictionary = new Dictionary('gl')
  }


  getAlphabet(): string[] {
    return this.dictionary.alphabet
  }

  getLettersPerRow(): number {
    return this.dictionary.lettersPerRow
  }
}
