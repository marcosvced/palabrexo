<script lang="ts" setup>
import MBoard from "~/src/lib/ui/molecules/board/m-board.vue";
import MKeyboard from "~/src/lib/ui/molecules/keyboard/m-keyboard.vue";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import OnGameWonDialog from "~/src/pages/components/OnGameWonDialog.vue";
import {useGame} from "~/src/pages/composables/useGame";
import {useDefinitions} from "~/src/pages/composables/useDefinitions";
import {useGuess} from "~/src/pages/composables/useGuess";
import {useSetupKeyboard} from "~/src/lib/composables/common/useSetupKeyboard";
import MSnackbar from "~/src/lib/ui/molecules/snackbar/m-snackbar.vue";

const {game, restart, isGameFinished} = await useGame()
const {definitions} = await useDefinitions(game)
const {guess} = useGuess()

useSetupKeyboard()

</script>
<template>
  <main class="main">
    <div class="container">
      <m-board :board="{
        guesses: game?.guesses ?? [],
        attempts: game?.attempts ?? 0,
        status: game?.status ?? GameStatus.FINISHED,
        guess: guess?.word ?? ''
      }"/>
    </div>
    <div class="container -bg-tone-100">
      <m-keyboard :used-guesses="game?.guesses ?? []"/>
    </div>
    <on-game-won-dialog
        :status="game?.status ?? GameStatus.FINISHED"
        v-if="isGameFinished"
        :definitions="definitions ?? []"
        @new-game="async ()=> await restart()"
    />
    <m-snackbar/>
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

</style>
