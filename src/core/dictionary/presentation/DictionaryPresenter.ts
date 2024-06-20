import type {GetAlphabetUseCase} from "~/src/core/dictionary/domain/application/actions/GetAlphabetUseCase";
import type {GetLetterPerRowsUseCase} from "~/src/core/dictionary/domain/application/actions/GetLetterPerRowsUseCase";
import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import type {DictionarySearchUseCase} from "~/src/core/dictionary/domain/application/actions/DictionarySearchUseCase";
import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";


export const DictionaryPresenter = (
    getAlphabetUseCase: GetAlphabetUseCase,
    getLetterPerRowsUseCase: GetLetterPerRowsUseCase,
    searchUseCase: DictionarySearchUseCase
) => defineStore('DictionaryPresenter', () => {

    const state: Ref<DictionaryDefinition[] | undefined> = ref()

    async function getAlphabet() {
        return await getAlphabetUseCase.execute()
    }

    async function getLetterPerRows() {
        return await getLetterPerRowsUseCase.execute()
    }

    async function search(word: GuessWord) {
        state.value = await searchUseCase.execute(word)

    }

    return {
        state,
        getAlphabet,
        getLetterPerRows,
        search
    }
})()