import type { Lang } from '~/src/core/dictionary/domain/entities/Lang'
import type { DictionaryDefinition } from '~/src/core/dictionary/domain/entities/DictionaryDefinition'

const QWERTY = {
  lettersPerRow: 10,
  letters: 'qwertyuiopasdfghjklñzxcvbnm',
}

export class Dictionary {
  private readonly _alphabet: string[]
  private readonly _lettersPerRow: number
  private _definitions: DictionaryDefinition[] = []

  constructor(private readonly lang: Lang) {
    this._alphabet = this._getLangAlphabet(lang)
    this._lettersPerRow = this._getLettersPerRow(lang)
  }

  private _getLangAlphabet(lang: Lang) {
    switch (lang) {
      case 'es':
        return QWERTY.letters.split('')
      case 'gl':
        return QWERTY.letters.split('').filter((letter: string) => !'yjkwy'.includes(letter))
    }
  }

  private _getLettersPerRow(lang: Lang) {
    switch (lang) {
      case 'es':
        return QWERTY.lettersPerRow
      case 'gl':
        return QWERTY.lettersPerRow - 2
    }
  }

  get alphabet() {
    return this._alphabet
  }

  get lettersPerRow() {
    return this._lettersPerRow
  }

  set definitions(definition: DictionaryDefinition) {
    this._definitions.push(definition)
  }

  get definitions(): DictionaryDefinition[] {
    return this._definitions
  }
}
