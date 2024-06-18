<script lang="ts" setup>
import {useGamePresenter} from "~/src/lib/composables/common/useGamePresenter";
import {useGuessPresenter} from "~/src/lib/composables/common/useGuessPresenter";
import {useSetupKeyboard} from "~/src/lib/composables/common/useSetupKeyboard";
import MBoard from "~/src/lib/ui/molecules/board/m-board.vue";
import MKeyboard from "~/src/lib/ui/molecules/keyboard/m-keyboard.vue";

const gamePresenter = useGamePresenter()
const {state: game} = storeToRefs(gamePresenter)

const guessPresenter = useGuessPresenter()
const {state: guess} = storeToRefs(guessPresenter)

await useAsyncData(() => gamePresenter.start().then(() => true))


useSetupKeyboard()


</script>
<template>
  <main class="main">
    <div class="container">
      <m-board :board="{
        guesses: game.guesses ?? [],
        attempts: game?.attempts,
        status: game?.status,
        guess: guess?.word
      }"/>
    </div>
    <div class="container -bg-tone-100">
      <m-keyboard :used-guesses="game?.guesses ?? []"/>
    </div>
  </main>
</template>

<style lang="css" scoped>
.main {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  height: 100%;
  align-items: center;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
