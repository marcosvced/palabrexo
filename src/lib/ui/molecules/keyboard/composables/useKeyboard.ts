import { SpecialKeys } from '~/src/core/dictionary/domain/entities/SpecialKeys'
import { normalizeWord } from '~/src/core/common/helpers/normalizeWord'

export function useKeyboard(letters: string[], letterPerRow: number, invalidKeys: string[]) {
  let keyboard: string[][] = [[]]
  let alphabet: string[] = []

  keyboard = letters.reduce((a, c, index) => {
    if (index % letterPerRow === 0) {
      (a as string[][]).push(letters.slice(index, index + letterPerRow))
    }
    return a
  }, [])

  alphabet = keyboard.flat().sort()
  keyboard.push(SpecialKeys.map(key => key.value))

  const emulateKeyboardEvent = (key: string) => {
    if (
      invalidKeys.value.includes(normalizeWord(key))
      || (
        !alphabet.includes(normalizeWord(key))
        && !SpecialKeys.some(sk => normalizeWord(key) === sk.value))
    ) {
      return
    }
    const keyboardEventInit = {
      key: SpecialKeys.find(sk => key.toLowerCase() === sk.value)?.code ?? key,
      code: SpecialKeys.find(sk => key.toLowerCase() === sk.value)?.code ?? `Key${key.toUpperCase()}`,
      bubbles: true,
      cancelable: true,
    }

    document.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit))
  }

  return {
    keyboard,
    emulateKeyboardEvent,
  }
}
