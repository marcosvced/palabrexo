<script setup lang="ts">

import MDialog from "~/src/lib/ui/molecules/dialog/m-dialog.vue";
import {GameBoard} from "../../core/game/domain/entities/GameBoard";
import ATile from "~/src/lib/ui/atoms/tile/a-tile.vue";
import {GuessLetterResult} from "~/src/core/guess/domain/entities/GuessLetterResult";
</script>

<template>
  <m-dialog show-close-button >
    <template #title>
      Palabrexo
    </template>
    <template #body>
      <h4>Trate de adiviñar a palabra oculta en {{ GameBoard.ROWS }} intentos</h4>
      <p>A medida que avances na partida, as fichar iranche dando pistas sobre o cerca que estás da palabra secreta.</p>
      <p>
      <span>
        A letra N está na posición correcta
      </span>
        <span class="line">
        <a-tile :result="GuessLetterResult.VALID" letter="N"/>
        <a-tile result="0" letter="E"/>
        <a-tile result="0" letter="B"/>
        <a-tile result="0" letter="O"/>
        <a-tile result="0" letter="A"/>
      </span>
      </p>
      <p>
      <span>
        A letra N está na palabra pero a posición non é a correcta
      </span>
        <span class="line">
        <a-tile :result="GuessLetterResult.INVALID_PLACE" letter="N"/>
        <a-tile result="0" letter="E"/>
        <a-tile result="0" letter="B"/>
        <a-tile result="0" letter="O"/>
        <a-tile result="0" letter="A"/>
      </span>
      </p>
      <p>
      <span>
       A palabra non contén a letra N
      </span>
        <span class="line">
        <a-tile :result="GuessLetterResult.INVALID" letter="N"/>
        <a-tile result="0" letter="E"/>
        <a-tile result="0" letter="B"/>
        <a-tile result="0" letter="O"/>
        <a-tile result="0" letter="A"/>
      </span>
      </p>
    </template>
  </m-dialog>
</template>

<style scoped lang="css">

h4 {
  margin-top: 0;
  margin-bottom: var(--s-24px);
}

p:not(:last-of-type) {
  margin-bottom: var(--s-16px);
}

p > span:first-of-type {
  margin-bottom: var(--s-8px);
  display: block;
}

.line {
  display: flex;
  gap: var(--s-16px) var(--s-4px);
  background-color: var(--c-primary);
  padding: var(--s-16px);
  justify-content: center;
}
</style>