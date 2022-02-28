<script setup lang='ts'>
import { modeEnum } from '@/types';

const props = defineProps<{
  toggleValue: modeEnum,
  value: number
}>()

const emit = defineEmits<{
  (event: 'update:value', value: number): void
}>()

const valueComputed = computed({
  get: () => props.value,
  set: (value: number) => emit('update:value', value)
})

const selectWholeText = (event: FocusEvent) => {
  if (props.toggleValue !== 'change') return
  if (event.target && event.target instanceof HTMLInputElement)
    event.target.select()
}
</script>
 
<template>
  <input
    @focus="selectWholeText"
    :draggable="toggleValue === 'put' || toggleValue === 'move'"
    :dropzone="toggleValue === 'put' || toggleValue === 'move'"
    :readonly="toggleValue === 'read' || toggleValue === 'put' || toggleValue === 'move' || toggleValue === 'attribute'"
    class="input-element element !tw-outline-none"
    :class="[toggleValue === 'read' && 'tw-pointer-events-none', toggleValue === 'put' && 'tw-cursor-pointer', toggleValue === 'move' && 'tw-cursor-pointer', toggleValue === 'attribute' && 'tw-cursor-pointer']"
    v-model.number="valueComputed"
  />
</template>