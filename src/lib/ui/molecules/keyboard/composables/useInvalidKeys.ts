import type { ComputedRef } from 'vue'
import { GuessLetterResult } from '~/src/core/guess/domain/entities/GuessLetterResult'
import { useUnique } from '~/src/lib/composables/helpers/useUnique'
import type { KeyboardProps } from '~/src/lib/ui/molecules/keyboard/m-keyboard.vue'

export function useInvalidKeys(props: KeyboardProps) {
  const invalidKeys: ComputedRef<string[]> = computed(() => {
    const invalid: string[] = []
    const valid: string[] = []
    const joinedWord = props.usedGuesses.map(({ word }) => word).join('')
    const joinedResult = props.usedGuesses.map(({ result }) => result).join('')

    for (let i = 0; i < joinedWord.length; i++) {
      const letter = joinedWord[i] ?? ''
      if (GuessLetterResult.INVALID === Number.parseInt(joinedResult[i]) && !valid.includes(letter)) {
        invalid.push(letter)
      }
      else {
        valid.push(letter)
      }
    }

    return useUnique(invalid)
  })

  return {
    invalidKeys,
  }
}
