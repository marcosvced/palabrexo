import type {GameRepository} from "~/src/core/game/domain/ports/GameRepository";
import type {ApiClient} from "~/src/core/common/infrastructure/ApiClient";
import type {GameMapper} from "~/src/core/game/infrastructure/mappers/GameMapper";
import type {Game} from "~/src/core/game/domain/entities/GameModel";
import type {GameDto} from "~/src/core/game/infrastructure/dtos/GameDto";

export class GameRepositoryImpl implements GameRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: GameMapper
    ) {
    }

    async getDailyWord(): Promise<Game> {
        const {data} = await this.apiClient.get<GameDto>({url: '/daily-word'})
        return this.mapper.toDomain(data)
    }


}