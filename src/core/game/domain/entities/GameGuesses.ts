import type { Guess } from '~/src/core/guess/domain/entities/GuessModel'
import type { DataException } from '~/src/core/common/domain/entities/DataException'

export type GameGuesses = Guess[]

export enum GameGuessesException {
  USED = 'GameGuessesWordUsedException',
}

export function isWordOnGuessList(word: string, list?: GameGuesses) {
  return (list ?? []).some((guess: Guess) => (word === guess.word))
}
export function GameGuessesWordUsedException(word: string): DataException {
  return {
    kind: GameGuessesException.USED,
    error: new Error(`🧐 The word: ${word} has been already used`),
  }
}
