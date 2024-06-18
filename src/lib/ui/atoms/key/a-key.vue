<script setup lang="ts">
import type {UnwrapRef} from "vue";

const props = withDefaults(defineProps<{
  letter: string
  isActive: boolean
}>(), {})


const setKeyCssClass: UnwrapRef<Record<string, boolean>> = reactive({
  'disabled': !props.isActive
})
</script>

<template>
  <button type="button" class="key" :class="setKeyCssClass" :disabled="!isActive">
    {{ letter }}
  </button>

</template>

<style scoped lang="css">
.key {
  font-size: inherit;
  font-family: inherit;
  line-height: 1;
  color: inherit;
  text-transform: uppercase;

  user-select: none;
  cursor: pointer;

  background-color: var(--c-primary);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--s-16px);

  border: 0;
  border-radius: calc(calc(6 / 16) * 1rem);

  transition: background-color  0.2s ease-in-out, color 0.2s ease-in-out;
}


.key:hover {
  background-color: var(--c-shade-100);
  color: var(--c-primary);
}

.key:active{
  background-color: var(--c-shade-200);
}

.key[disabled] {
  background-color: var(--c-tone-100);
  color: var(--c-primary);
  pointer-events: none;
}

</style>