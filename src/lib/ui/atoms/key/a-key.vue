<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import AButton from '~/src/lib/ui/atoms/button/a-button.vue'

const props = withDefaults(defineProps<{
  letter: string
  isActive: boolean
}>(), {})

const setKeyCssClass: UnwrapRef<Record<string, boolean>> = reactive({
  disabled: !props.isActive,
})
</script>

<template>
  <AButton class="a-key" :class="setKeyCssClass" :disabled="!isActive">
    {{ letter }}
  </AButton>
</template>

<style scoped lang="css">
.a-key {
}
</style>
