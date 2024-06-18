<script setup lang="ts">
import AKey from "~/src/lib/ui/atoms/key/a-key.vue";
import type {UseDictionaryProvider} from "~/src/core/dictionary/infrastructure/di/useDictionaryProvider";
import {Container} from "~/src/core/common/dependencies/Container";
import {SpecialKeys} from "~/src/core/dictionary/domain/entities/SpecialKeys";
import {normalizeWord} from "~/src/core/common/helpers/normalizeWord";
import type {DictionaryPresenter} from "~/src/core/dictionary/presentation/DictionaryPresenter";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";


const props = withDefaults(defineProps<{ usedGuesses: string[] }>(), {})

const {$container}: { $container: Container } = useNuxtApp()
const dictionaryPresenter: DictionaryPresenter = $container.get<UseDictionaryProvider>("DictionaryPresenter")

let keyboard: string[][] = [[]]
let alphabet: string[] = []
const invalidKeys = computed(() => {
  const invalid = []
  props.usedGuesses.forEach(({word, result}: Guess) => {
    for (let i = 0; i < word.length; i++) {
      const letter = word[i]
      if ('0' === result[i]) {
        if (!invalid.includes(letter)) {
          invalid.push(letter)
        }
      }
    }
  })
  return invalid
})

const letters = dictionaryPresenter.getAlphabet()
const letterPerRow = dictionaryPresenter.getLetterPerRows()

keyboard = letters.reduce((a, c, index) => {
  if (0 === index % letterPerRow) {
    (a as string[][]).push(letters.slice(index, index + letterPerRow))
  }
  return a
}, [])

alphabet = keyboard.flat().sort()
keyboard.push(SpecialKeys.map((key) => key.value))


const emulateKeyboardEvent = (key: string) => {
  if (invalidKeys.includes(normalizeWord(key)) || !this.alphabet.includes(normalizeWord(key))) {
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
  gap: var(--s-16px);
  font-size: clamp(.7em, 2vw, 1em);
}

.row {
  display: flex;
  gap: var(--s-16px);
}
</style>