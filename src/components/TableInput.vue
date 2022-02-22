<script setup lang='ts'>

const props = defineProps<{
  toggleValue: string,
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
  if (event.target && event.target instanceof HTMLInputElement)
    event.target.select()
}
</script>
 
<template>
  <input
    @focus="selectWholeText"
    :readonly="toggleValue === 'read'"
    class="input-element element"
    :class="[toggleValue === 'read' && 'tw-pointer-events-none']"
    v-model.lazy.number="valueComputed"
  />
</template>