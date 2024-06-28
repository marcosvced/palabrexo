import { useDictionaryPresenter } from '~/src/lib/composables/common/useDictionaryPresenter'

export async function useDictionary() {
  const dictionaryPresenter = useDictionaryPresenter()
  const letters = await dictionaryPresenter.getAlphabet()
  const letterPerRow = await dictionaryPresenter.getLetterPerRows()

  return {
    letters,
    letterPerRow,
  }
}
