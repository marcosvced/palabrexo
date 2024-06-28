<script lang="ts" setup>
import MBoard from '~/src/lib/ui/molecules/board/m-board.vue'
import MKeyboard from '~/src/lib/ui/molecules/keyboard/m-keyboard.vue'
import { GameStatus } from '~/src/core/game/domain/entities/GameStatus'
import OnGameWonDialog from '~/src/pages/components/on-game-won-dialog.vue'
import { useGame } from '~/src/pages/composables/useGame'
import { useDefinitions } from '~/src/pages/composables/useDefinitions'
import { useGuess } from '~/src/pages/composables/useGuess'
import { useSetupKeyboard } from '~/src/lib/composables/common/useSetupKeyboard'
import MSnackbar from '~/src/lib/ui/molecules/snackbar/m-snackbar.vue'
import AButton from '~/src/lib/ui/atoms/button/a-button.vue'
import InfoGameDialog from '~/src/pages/components/info-game-dialog.vue'

const { game, restart, isGameFinished } = await useGame()
const { definitions } = await useDefinitions(game)
const { guess } = useGuess()

useSetupKeyboard()

const isGameInfoDialogOpen = ref(false)

onMounted(() =>
  onGameInfoDialogToggle(),
)

function onGameInfoDialogToggle() {
  isGameInfoDialogOpen.value = !isGameInfoDialogOpen.value
}
</script>

<template>
  <main class="main">
    <AButton class="main__btn-info" @click="onGameInfoDialogToggle">
      ?
    </AButton>
    <div class="container">
      <MBoard
        :board="{
          guesses: game?.guesses ?? [],
          attempts: game?.attempts ?? 0,
          status: game?.status ?? GameStatus.FINISHED,
          guess: guess?.word ?? '',
        }"
      />
    </div>
    <div class="container -bg-tone-100">
      <MKeyboard :used-guesses="game?.guesses ?? []" />
    </div>
    <InfoGameDialog v-if="isGameInfoDialogOpen" @close="onGameInfoDialogToggle" />
    <OnGameWonDialog
      v-if="isGameFinished"
      :status="game?.status ?? GameStatus.FINISHED"
      :definitions="definitions ?? []"
      @new-game="async () => await restart()"
    />
    <MSnackbar />
  </main>
</template>

<style lang="css" scoped>
.main {
  display: grid;
  grid-template-rows: 1.25fr .75fr;
  height: 100%;
  align-items: center;
}

@media (min-width: 764px) {
  .main {
    grid-template-rows: repeat(2, 1fr);
  }

}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main__btn-info {
  position: absolute;
  top: var(--s-16px);
  right: var(--s-16px);
}
</style>
