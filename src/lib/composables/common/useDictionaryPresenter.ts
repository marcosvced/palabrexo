import {GetLetterPerRowsUseCase} from "~/src/core/dictionary/domain/application/actions/GetLetterPerRowsUseCase";
import {GetAlphabetUseCase} from "~/src/core/dictionary/domain/application/actions/GetAlphabetUseCase";
import {DictionaryServiceImpl} from "~/src/core/dictionary/domain/application/services/DictionaryServiceImpl";
import {DictionaryPresenter} from "~/src/core/dictionary/presentation/DictionaryPresenter";
import {Dictionary} from "~/src/core/dictionary/domain/entities/Dictionary";
import {DictionarySearchUseCase} from "~/src/core/dictionary/domain/application/actions/DictionarySearchUseCase";
import {
    DictionaryRepositoryImpl
} from "~/src/core/dictionary/infrastructure/repositories/DictionaryRepositoryImpl";
import type {DictionaryRepository} from "~/src/core/dictionary/domain/ports/DictionaryRepository";
import {ApiClientImpl} from "~/src/core/common/infrastructure/ApiClientImpl";
import {DictionaryDefinitionMapper} from "~/src/core/dictionary/infrastructure/mappers/DictionaryDefinitionMapper";


export const useDictionaryPresenter = () => {
    const {public: {API_BASE_URL}} = useRuntimeConfig()
    const repository: DictionaryRepository = new DictionaryRepositoryImpl(
        new ApiClientImpl(API_BASE_URL),
        new DictionaryDefinitionMapper()
    )
    const service: DictionaryServiceImpl = new DictionaryServiceImpl(new Dictionary('gl'))

    const getAlphabetUseCase = new GetAlphabetUseCase(service)
    const getLetterPerRowsUseCase = new GetLetterPerRowsUseCase(service)
    const searchUseCase = new DictionarySearchUseCase(repository)

    return DictionaryPresenter(
        getAlphabetUseCase,
        getLetterPerRowsUseCase,
        searchUseCase
    )
}