import type {DictionaryRepository} from "~/src/core/dictionary/domain/ports/DictionaryRepository";
import type {ApiClient} from "~/src/core/common/infrastructure/ApiClient";
import type {DictionaryDefinitionDto} from "~/src/core/dictionary/infrastructure/dtos/DictionaryDefinitionDto";
import {
    type DictionaryDefinition,
    DictionaryNotFoundException
} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";
import type {DictionaryDefinitionMapper} from "~/src/core/dictionary/infrastructure/mappers/DictionaryDefinitionMapper";
import {ResponseStatus} from "~/src/core/common/domain/entities/ResponseStatus";
import {UnexpectedException} from "~/src/core/common/domain/entities/DataException";

export class DictionaryRepositoryImpl implements DictionaryRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: DictionaryDefinitionMapper
    ) {
    }

    async search(word: string): Promise<DictionaryDefinition[]> {
        const response = await this.apiClient.get<DictionaryDefinitionDto[]>({url: '/search', params: {word}})
        let result: DictionaryDefinitionDto[] = []
        response.fold((error) => {
            if (error.status === ResponseStatus.NOT_FOUND) {
                throw DictionaryNotFoundException()
            }
            throw UnexpectedException()
        }, ({data}) => {
            result.push(...data)
        })
        return result.map(dto => this.mapper.toDomain(dto))
    }

}