<script setup lang="ts">
import MDialog from "~/src/lib/ui/molecules/dialog/m-dialog.vue";
import {GameStatus} from "~/src/core/game/domain/entities/GameStatus";
import type {DictionaryDefinition} from "~/src/core/dictionary/domain/entities/DictionaryDefinition";
import AButton from "~/src/lib/ui/atoms/button/a-button.vue";

withDefaults(defineProps<{ status: GameStatus, definitions: DictionaryDefinition[] }>(), {})
const emit = defineEmits<{ (evt: 'newGame'): void }>()
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

      <p class="claim">
        <template v-if="status == GameStatus.WON">
          Noraboa, acertaches a palabra oculta.
        </template>
        <template v-else>
          Sinto, non atopaches a palabra oculta e utilizaches todos os intentos dispoñibles.
        </template>
      </p>
      <div class="content">
        <span class="lemma">
        {{ definitions[0].lemma }}
      </span>
        <ul>
          <li v-for="(entry, index) in definitions" :key="index">
            <span>·</span>
            <div class="wrapper">
              <p class="definition">
                <span>{{ entry.definition }}</span>
              </p>
              <p class="example">
                <span class="partOfSpeech">{{ entry.partOfSpeech }}</span>
                <i>
                  <span>Exemplo:</span>
                  {{ entry.example }}
                </i>
              </p>
            </div>
          </li>
        </ul>
      </div>

    </template>
    <template #footer>
      <a-button class="footer__button" @click="emit('newGame')">Nova partida</a-button>
    </template>
  </m-dialog>

</template>

<style scoped lang="css">
span {
  display: block;
}

.claim {
  margin-bottom: var(--s-24px);
}

.content {
  background-color: rgba(255, 255, 255, 0.03);
  padding: var(--s-24px);
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}


.lemma {
  text-transform: uppercase;
  font-size: 1rem;
  margin-bottom: var(--s-16px);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-bottom: var(--s-16px);
    display: flex;
    gap: var(--s-8px);

    p {
      display: flex;
      margin-bottom: var(--s-8px);
    }

    .example {
      display: block;
      font-size: .8em;

      span {
        display: inline-flex;
      }
    }
  }

  li:first-of-type:not(:last-child) {
    margin-bottom: var(--s-24px);
  }
}

.partOfSpeech {
  display: block;
  width: 100%;
}

.footer__button {
  margin-right: 0;
  margin-left: auto;
}
</style>