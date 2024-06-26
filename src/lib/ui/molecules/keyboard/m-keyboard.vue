<script setup lang="ts">
import AKey from "~/src/lib/ui/atoms/key/a-key.vue";
import type {Guess} from "~/src/core/guess/domain/entities/GuessModel";
import {useInvalidKeys} from "~/src/lib/ui/molecules/keyboard/composables/useInvalidKeys";
import {useDictionary} from "~/src/lib/ui/molecules/keyboard/composables/useDictionary";
import {useKeyboard} from "~/src/lib/ui/molecules/keyboard/composables/useKeyboard";

export interface KeyboardProps {
  usedGuesses: Guess[]
}
const props = withDefaults(defineProps<KeyboardProps>(), {})

const {letterPerRow, letters} = await useDictionary()

const {invalidKeys} = useInvalidKeys(props)

const {keyboard, emulateKeyboardEvent} = useKeyboard(
    letters,
    letterPerRow,
    invalidKeys
)
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
