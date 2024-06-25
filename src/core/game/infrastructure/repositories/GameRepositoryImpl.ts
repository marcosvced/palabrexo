import type {GameRepository} from "~/src/core/game/domain/ports/GameRepository";
import type {ApiClient} from "~/src/core/common/infrastructure/ApiClient";
import type {GameMapper} from "~/src/core/game/infrastructure/mappers/GameMapper";
import {Game} from "~/src/core/game/domain/entities/GameModel";
import type {GameDto} from "~/src/core/game/infrastructure/dtos/GameDto";
import {UnexpectedException} from "~/src/core/common/domain/entities/DataException";

export class GameRepositoryImpl implements GameRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: GameMapper
    ) {
    }

    async getDailyWord(): Promise<Game> {
        const response = await this.apiClient.get<GameDto>({url: '/daily-word'})
        let game:Game = new Game({})
        response.fold((error) => {
            throw UnexpectedException()
        }, ({data}) => {
            game = this.mapper.toDomain(data)
        })

        return Promise.resolve(game)
    }


}