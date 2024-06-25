import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import {useDictionaryPresenter} from "~/src/lib/composables/common/useDictionaryPresenter";
import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";
import type {Game} from "~/src/core/game/domain/entities/GameModel";
import type {Ref} from "vue";

export type UseDefinitions = {
    definitions: Ref<DictionaryDefinition[] | undefined>
}

export const useDefinitions = async (game: Ref<Game>): Promise<UseDefinitions> => {
    const dictionaryPresenter = useDictionaryPresenter()
    const {state: definitions} = storeToRefs(dictionaryPresenter)
    await useLazyAsyncData(() => dictionaryPresenter.search(game.value.wordToGuess).then(() => true))

    watch(() => game.value?.wordToGuess, async (newWord: GuessWord, oldWord: GuessWord) => {

        if (newWord && newWord !== oldWord) {
            await dictionaryPresenter.search(newWord)
        }
    })

    return {definitions}
}