import type { Ref } from 'vue'
import { useDictionaryPresenter } from '~/src/lib/composables/common/useDictionaryPresenter'
import type { DictionaryDefinition } from '~/src/core/dictionary/domain/entities/DictionaryDefinition'
import type { Game } from '~/src/core/game/domain/entities/GameModel'

export interface UseDefinitions {
  definitions: Ref<DictionaryDefinition[] | undefined>
}

export async function useDefinitions(game: Ref<Game>): Promise<UseDefinitions> {
  const dictionaryPresenter = useDictionaryPresenter()
  const { state: definitions } = storeToRefs(dictionaryPresenter)
  await useLazyAsyncData(() => dictionaryPresenter.search(game.value.wordToGuess).then(() => true))

  watch(() => game.value?.wordToGuess, async (newWord, oldWord) => {
    if (newWord && newWord !== oldWord) {
      await dictionaryPresenter.search(newWord)
    }
  })

  return { definitions }
}
