<script setup lang="ts">
import type {UnwrapRef} from "vue";
import AButton from "~/src/lib/ui/atoms/button/a-button.vue";

const props = withDefaults(defineProps<{
  letter: string
  isActive: boolean
}>(), {})


const setKeyCssClass: UnwrapRef<Record<string, boolean>> = reactive({
  'disabled': !props.isActive
})
</script>

<template>
  <a-button class="a-key" :class="setKeyCssClass" :disabled="!isActive">
    {{ letter }}
  </a-button>
</template>

<style scoped lang="css">
.a-key {
}
</style>