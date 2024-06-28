import { useGuessPresenter } from '~/src/lib/composables/common/useGuessPresenter'
import type { Guess } from '~/src/core/guess/domain/entities/GuessModel'

export interface UseGuess {
  guess: Ref<Guess | undefined>
}

export function useGuess(): UseGuess {
  const guessPresenter = useGuessPresenter()
  const { state: guess } = storeToRefs(guessPresenter)
  return { guess }
}
