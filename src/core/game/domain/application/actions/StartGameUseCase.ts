import type { Command } from '~/src/core/common/domain/Command'
import type { GameRepository } from '~/src/core/game/domain/ports/GameRepository'
import type { Game } from '~/src/core/game/domain/entities/GameModel'

export class StartGameUseCase implements Command {
  constructor(private readonly repository: GameRepository) {
  }

  execute(): Promise<Game> {
    return this.repository.getDailyWord()
  }
}
