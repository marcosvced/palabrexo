<script setup lang="ts">
import AKey from "~/src/lib/ui/atoms/key/a-key.vue";

import {SpecialKeys} from "~/src/core/dictionary/domain/entities/SpecialKeys";
import {normalizeWord} from "~/src/core/common/helpers/normalizeWord";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import {useDictionaryPresenter} from "~/src/lib/composables/common/useDictionaryPresenter";


const props = withDefaults(defineProps<{ usedGuesses: Guess[] }>(), {})


const dictionaryPresenter = useDictionaryPresenter()

let keyboard: string[][] = [[]]
let alphabet: string[] = []
const invalidKeys = computed(() => {
  const invalid: string[] = []
  props.usedGuesses.forEach(({word, result}: Guess) => {
    if (!word) {
      return
    }

    for (let i = 0; i < word.length; i++) {
      const letter = word[i] ?? ''
      if ('0' === result?.[i] && !invalid.includes(letter)) {
        invalid.push(letter)
      } else if ('0' !== result?.[i] && invalid.includes(letter)) {
        invalid.splice(invalid.indexOf(letter), 1)
      }
    }
  })
  return invalid
})

const letters = await dictionaryPresenter.getAlphabet()
const letterPerRow = await dictionaryPresenter.getLetterPerRows()

keyboard = letters.reduce((a, c, index) => {
  if (0 === index % letterPerRow) {
    (a as string[][]).push(letters.slice(index, index + letterPerRow))
  }
  return a
}, [])

alphabet = keyboard.flat().sort()
keyboard.push(SpecialKeys.map((key) => key.value))


const emulateKeyboardEvent = (key: string) => {
  if (
      invalidKeys.value.includes(normalizeWord(key))
      || (
          !alphabet.includes(normalizeWord(key))
          && !SpecialKeys.some((sk) => normalizeWord(key) === sk.value))
  ) {
    return
  }
  const keyboardEventInit = {
    key: SpecialKeys.find((sk) => key.toLowerCase() === sk.value)?.code ?? key,
    code: SpecialKeys.find((sk) => key.toLowerCase() === sk.value)?.code ?? `Key${key.toUpperCase()}`,
    bubbles: true,
    cancelable: true
  }

  document.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit))
}
</script>

<template>
  <div class="keyboard">
    <div class="row" v-for="(keys, row) in keyboard" :key="row">
      <a-key v-for="(letter, column) in keys" :key="column"
             :letter="letter"
             :is-active="!invalidKeys.includes(letter.toLowerCase())"
             @click="emulateKeyboardEvent(letter)"/>
    </div>
  </div>

</template>

<style scoped lang="css">
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-8px);
}


.row {
  display: flex;
  gap: var(--s-4px);
}

@media (min-width: 764px) {
  .keyboard {
    gap: var(--s-16px);
  }

  .row {
    gap: var(--s-16px);
  }
}
</style>
