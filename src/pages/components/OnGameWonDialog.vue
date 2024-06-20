<script setup lang="ts">
import MDialog from "~/src/lib/ui/molecules/dialog/m-dialog.vue";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";

withDefaults(defineProps<{ status: GameStatus, definitions: DictionaryDefinition[] }>(), {})
</script>

<template>
  <m-dialog>
    <template #title>
      <template v-if="status == GameStatus.WON">
        Noraboa!
      </template>
      <template v-else>
        Sinto, reamtou o xogo!
      </template>
    </template>
    <template #body>
      <p>
        <template v-if="status == GameStatus.WON">
          Noraboa, acertaches a palabra oculta.
        </template>
        <template v-else>
          Sinto, non atopaches a palabra oculta e utilizaches todos os intentos dispoñibles.
        </template>
        <span>
          <span>
            {{definitions[0].lemma}}
          </span>
          <template v-for="definition in definitions">
            {{ definition }}
          </template>
        </span>

      </p>
    </template>
  </m-dialog>

</template>

<style scoped lang="css">

</style>