import type {GetAlphabetUseCase} from "~/src/core/dictionary/domain/application/actions/GetAlphabetUseCase";
import type {GetLetterPerRowsUseCase} from "~/src/core/dictionary/domain/application/actions/GetLetterPerRowsUseCase";
import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import type {DictionarySearchUseCase} from "~/src/core/dictionary/domain/application/actions/DictionarySearchUseCase";
import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";
import {Presenter} from "~/src/core/common/presentation/Presenter";
import type {Ref} from "vue";


export class DictionaryPresenter extends Presenter {

    constructor(
        private readonly getAlphabetUseCase: GetAlphabetUseCase,
        private readonly getLetterPerRowsUseCase: GetLetterPerRowsUseCase,
        private readonly searchUseCase: DictionarySearchUseCase
    ) {
        super()
        this.defineStore('DictionaryPresenter')
    }

    defineStore(key: string): any {
        this.store = defineStore(key, () => {

            const state: Ref<DictionaryDefinition[] | undefined> = ref()

            const getAlphabet = async ()  => {
                return await this.getAlphabetUseCase.execute()
            }

            const getLetterPerRows = async ()  => {
                return await this.getLetterPerRowsUseCase.execute()
            }

            const search = async (word: GuessWord)  => {
                state.value = await this.searchUseCase.execute(word)

            }

            return {
                state,
                getAlphabet,
                getLetterPerRows,
                search
            }
        })
    }

}