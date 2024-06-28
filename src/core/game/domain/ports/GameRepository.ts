import type { Game } from '~/src/core/game/domain/entities/GameModel'

export interface GameRepository {
  getDailyWord: () => Promise<Game>
}
