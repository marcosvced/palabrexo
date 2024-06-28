import type { ComputedRef } from 'vue'
import { useGamePresenter } from '~/src/lib/composables/common/useGamePresenter'
import { GameStatus } from '~/src/core/game/domain/entities/GameStatus'
import type { Game } from '~/src/core/game/domain/entities/GameModel'

export interface UseGame {
  game: Ref<Game | undefined>
  isGameFinished: ComputedRef<boolean>
  restart: Promise<void>
}

export async function useGame(): Promise<UseGame> {
  const gamePresenter = useGamePresenter()
  const { state: game } = storeToRefs(gamePresenter)
  const isGameFinished = computed(() => game.value?.status === GameStatus.FINISHED || game.value?.status === GameStatus.WON)
  await useAsyncData(() => gamePresenter.start().then(() => true))

  return {
    game,
    isGameFinished,
    restart: async () => await gamePresenter.restart(),
  }
}
