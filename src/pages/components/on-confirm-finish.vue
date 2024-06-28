<script setup lang="ts">
import MDialog from '~/src/lib/ui/molecules/dialog/m-dialog.vue'
import AButton from '~/src/lib/ui/atoms/button/a-button.vue'

const emits = defineEmits<{ (evt: 'finish'): void, (evt: 'continue'): void }>()
</script>

<template>
  <MDialog>
    <template #title>
      Finalizar o xogo
    </template>
    <template #body>
      <p>Estas seguro de que queres rematala partida?</p>
    </template>
    <template #footer>
      <AButton class="footer__btn" @click="emits('continue')">
        Continuar
      </AButton>
      <AButton @click="emits('finish')">
        Rematar
      </AButton>
    </template>
  </MDialog>
</template>

<style scoped lang="css">
.footer__btn{
  margin-right: 0;
  margin-left: auto;
}
</style>
