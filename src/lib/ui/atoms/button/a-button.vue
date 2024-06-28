<script setup lang="ts">

</script>

<template>
  <button type="button" class="a-button">
    <slot />
  </button>
</template>

<style scoped lang="css">
button {
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

button:hover {
  background-color: var(--c-shade-100);
  color: var(--c-primary);
}

button:active{
  background-color: var(--c-shade-200);
}

button[disabled] {
  background-color: var(--c-tone-100);
  color: var(--c-primary);
  pointer-events: none;
}
</style>
