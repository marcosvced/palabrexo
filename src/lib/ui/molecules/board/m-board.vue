<script setup lang="ts">
import ATile from "~/src/lib/ui/atoms/tile/a-tile.vue";
import {GameBoard} from "~/src/core/game/domain/entities/GameBoard";
import type {GuessWord} from "~/src/core/guess/domain/entities/GuessWord";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import type {GuessLetterResult} from "~/src/core/guess/domain/entities/GuessLetterResult";
import {useCompact} from "~/src/lib/composables/helpers/useCompact";

const COLUMNS_ARR = new Array(GameBoard.COLUMNS).fill(null)
const ROWS_ARR = new Array(GameBoard.ROWS).fill(null)

interface Board {
  attempts: number
  status: GameStatus
  guesses: Guess[]
  guess: GuessWord
}

const props: { board: Board } = withDefaults(defineProps<{
  board: Board
}>(), {})

const isDisabled = computed(() => GameStatus.FINISHED === props.board.status || GameStatus.WON === props.board.status)
const guesses = computed(() => useCompact([...props.board.guesses.map((g) => g.word), props.board.guess]))
const result = computed(()=>useCompact([...props.board.guesses.map((g) => g.result)]))


</script>
<template>
  <ul class="m-board">
    <template v-for="(_, row) in ROWS_ARR" :key="row">
      <template v-for="(_, column) in COLUMNS_ARR" :key="column">
        <a-tile
            :result="result[row]?.[column]"
            :letter="guesses[row]?.[column] ?? ''"
            :disabled="isDisabled"
        />
      </template>
    </template>
  </ul>
</template>

<style scoped lang="css">
ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  list-style: none;
  width: min-content;
  gap: var(--s-16px) var(--s-4px);

  margin: auto;
  padding: 0;
}

</style>