<script setup lang="ts">
import { GuessLetterResult } from '~/src/core/guess/domain/entities/GuessLetterResult'

interface Props {
  letter: string
  result: GuessLetterResult | undefined
  disabled?: boolean
}

const props: Props = withDefaults(defineProps<Props>(), { disabled: false })

const setTileCssClass: ComputedRef<Record<string, boolean>> = computed((): Record<string, boolean> => ({
  'has-letter': !!props.letter,
  'reveled reveled-invalid': props.result == GuessLetterResult.INVALID,
  'reveled reveled-invalid-place': props.result == GuessLetterResult.INVALID_PLACE,
  'reveled reveled-valid': props.result == GuessLetterResult.VALID,
  'is-disabled': !!props.disabled,
}))
</script>

<template>
  <li class="a-tile" :class="setTileCssClass">
    {{ letter }}
  </li>
</template>

<style scoped>
li {
  width: var(--s-48px);
  height: var(--s-48px);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}

.is-disabled {
  pointer-events: none;
}

.is-disabled:not(.has-letter) {
  opacity: 0.25;
}

li:not(.reveled) {
  border: calc(calc(2 / 16) * 1rem) solid var(--c-tone-100);
}

.has-letter {
  animation: scale-letter .25s ease forwards;
}

.reveled {
  color: var(--c-primary);
}

.reveled-invalid {
  background: var(--c-tone-100);
}

.reveled-valid {
  background: var(--c-shade-200);
}

.reveled-invalid-place {
  background: var(--c-shade-100);
}

@keyframes scale-letter {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}
</style>
