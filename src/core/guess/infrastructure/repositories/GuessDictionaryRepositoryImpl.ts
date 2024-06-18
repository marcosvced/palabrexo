import type {GuessRepository} from "~/src/core/guess/domain/ports/GuessRepository";
import type {ApiClient} from "~/src/core/common/infrastructure/ApiClient";

export class GuessDictionaryRepositoryImpl implements GuessRepository {
    constructor(
        private readonly apiClient: ApiClient,
    ) {
    }

    async search(word: string): Promise<any> {
        return await this.apiClient.get({url: '/search', params: {word}})
    }

}