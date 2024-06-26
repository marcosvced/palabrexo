import { GameMapper } from '~/src/core/game/infrastructure/mappers/GameMapper'
import { GameRepositoryImpl } from '~/src/core/game/infrastructure/repositories/GameRepositoryImpl'
import { StartGameUseCase } from '~/src/core/game/domain/application/actions/StartGameUseCase'
import { GamePresenter } from '~/src/core/game/presentation/GamePresenter'
import { ApiClientImpl } from '~/src/core/common/infrastructure/api/ApiClientImpl'

export function useGamePresenter() {
  const { public: { API_BASE_URL } } = useRuntimeConfig()

  const apiClient = new ApiClientImpl(API_BASE_URL)
  const gameMapper = new GameMapper()
  const gameRepository = new GameRepositoryImpl(apiClient, gameMapper)

  const presenter = new GamePresenter(
    new StartGameUseCase(gameRepository),
  )
  return presenter.store
}
