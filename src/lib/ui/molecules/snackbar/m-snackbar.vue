<script setup lang="ts">
import {useAlertsPresenter} from "~/src/lib/composables/common/useAlertsPresenter";
import MAlert from "~/src/lib/ui/molecules/alert/m-alert.vue";

const {state} = storeToRefs(useAlertsPresenter())


</script>

<template>
  <teleport to="body">
    <transition-group name="in-out" tag="div" class="m-snackbar">
      <m-alert class="snackbar__alert" v-for="alert in state" :alert="alert" :key="alert.id"/>
    </transition-group>
  </teleport>
</template>

<style scoped lang="css">
.m-snackbar {
  position: fixed;
  top: 0;
  right: 0;
  padding: var(--s-16px);
  display: flex;
  flex-direction: column;
  gap: var(--s-16px);
  z-index: var(--stk-toast);
  height: 100%;
}


.in-out-enter-active,
.in-out-leave-active {
  transition: all 0.5s ease;
}

.in-out-enter-from,
.in-out-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


</style>