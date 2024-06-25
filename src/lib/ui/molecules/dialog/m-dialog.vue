<script setup lang="ts">

import AButton from "~/src/lib/ui/atoms/button/a-button.vue";
</script>

<template>
  <teleport to="body">
    <div class="overlay"/>
    <dialog class="m-dialog">
      <div class="m-dialog__header">
        <h2>
          <slot name="title"/>
        </h2>
        <a-button class="header__close">
          <span class="close__icon"/>
        </a-button>
      </div>
      <div class="m-dialog__content">
        <slot name="body"/>
      </div>
      <div class="m-dialog__footer">
        <slot name="footer"/>
      </div>
    </dialog>
  </teleport>
</template>

<style scoped lang="css">
.overlay {
  position: fixed;
  height: 100dvh;
  width: 100dvw;
  top: 0;
  left: 0;
  z-index: 0;
}

dialog {
  position: fixed;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: var(--s-2px) solid var(--c-shade-200);
  background-color: var(--c-tone-100);
  color: var(--c-shade-200);
  padding: 0;
  z-index: 100;
  width: 95%;
}

@media (min-width: 764px) {
  dialog {
    width: 50dvw;
  }

}

.m-dialog__header,
.m-dialog__content {
  padding-inline: var(--s-28px);
  padding-block: var(--s-16px);
}

.m-dialog__content {
  padding-block: var(--s-32px);
}

.m-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-16px);
  border-bottom: var(--s-2px) solid var(--c-shade-200);
}

.header__close {
  margin-right: calc(calc(var(--s-28px) / 2) * -1);
  opacity: 0;
}

.close__icon {
  display: block;
  height: var(--s-4px);
  width: var(--s-16px);
  background-color: var(--c-shade-200);
  margin-block: calc(calc(var(--s-16px) - var(--s-4px)) / 2);
}

h2 {
  margin: 0;
  font-size: var(--fs-large);
}

.m-dialog__footer {
  padding-inline: var(--s-28px);
  padding-bottom: var(--s-28px);
}
</style>