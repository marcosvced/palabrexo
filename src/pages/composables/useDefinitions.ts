import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import {useDictionaryPresenter} from "~/src/lib/composables/common/useDictionaryPresenter";
import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";

export type UseDefinitions = {
    definitions: Ref<DictionaryDefinition[] | undefined>
}

export const useDefinitions = async (word: GuessWord): Promise<UseDefinitions> => {
    const dictionaryPresenter = useDictionaryPresenter()
    const {state: definitions} = storeToRefs(dictionaryPresenter)
    await useLazyAsyncData(() => dictionaryPresenter.search(word).then(() => true))

    return {definitions}
}