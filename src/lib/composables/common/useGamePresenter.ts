import {GameMapper} from "~/src/core/game/infrastructure/mappers/GameMapper";
import {GameRepositoryImpl} from "~/src/core/game/infrastructure/repositories/GameRepositoryImpl";
import {StartGameUseCase} from "~/src/core/game/domain/application/actions/StartGameUseCase";
import {GetGameUseCase} from "~/src/core/game/domain/application/actions/GetGameUseCase";
import {GamePresenter} from "~/src/core/game/presentation/GamePresenter";
import {ApiClientImpl} from "~/src/core/common/infrastructure/ApiClientImpl";


export const useGamePresenter = () => {
    const apiClient = new ApiClientImpl('http://localhost:3000/api/v1')
    const gameMapper = new GameMapper()
    const gameRepository = new GameRepositoryImpl(apiClient, gameMapper)


    return GamePresenter(
        new StartGameUseCase(gameRepository),
        new GetGameUseCase(gameRepository)
    )
}