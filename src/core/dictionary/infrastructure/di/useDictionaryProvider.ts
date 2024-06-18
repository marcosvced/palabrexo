import {GetLetterPerRowsUseCase} from "~/src/core/dictionary/domain/application/actions/GetLetterPerRowsUseCase";
import {GetAlphabetUseCase} from "~/src/core/dictionary/domain/application/actions/GetAlphabetUseCase";
import {DictionaryServiceImpl} from "~/src/core/dictionary/domain/application/services/DictionaryServiceImpl";
import {DictionaryPresenter} from "~/src/core/dictionary/presentation/DictionaryPresenter";

export type UseDictionaryProvider = {
    getAlphabetUseCase: GetAlphabetUseCase
    getLetterPerRowsUseCase: GetLetterPerRowsUseCase
}
export const useDictionaryProvider = (): UseDictionaryProvider => {
    const service: DictionaryServiceImpl = new DictionaryServiceImpl()

    const getAlphabetUseCase = new GetAlphabetUseCase(service)
    const getLetterPerRowsUseCase = new GetLetterPerRowsUseCase(service)
    return new DictionaryPresenter(getAlphabetUseCase,
        getLetterPerRowsUseCase
    )
}