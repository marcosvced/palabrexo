<script setup lang="ts">
import type {AlertModel} from "~/src/core/alert/domain/entities/AlertModel";

withDefaults(defineProps<{ alert: AlertModel }>(), {})
</script>

<template>
  <div class="m-alert">
<!--    <span class="alert__icon"> {{ alert.icon }} </span>-->
    <h2 class="alert__title"> {{ alert.title }} </h2>
    <div class="alert__body">
      <p v-for="paragraph in alert.body">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="css">
.m-alert{
  cursor: pointer;
  font-size: .65em;
  padding: var(--s-16px);
  color: var(--c-tone-100);
  border: var(--s-4px) solid var(--c-tone-100);
  background-color: var(--c-primary);
}
</style>