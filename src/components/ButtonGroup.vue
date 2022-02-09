<script setup lang='ts'>
const props = defineProps<{
  toggleValue: String
}>()
const emit = defineEmits<{
  (event: 'update:toggleValue', value: String): void
}>()

const valueComputed = computed({
  get: () => props.toggleValue,
  set: (value: String) => emit('update:toggleValue', value)
})

</script>

<template>
  <div>
    <q-btn-toggle
      v-model="valueComputed"
      rounded
      push
      stack
      no-caps
      text-color="black"
      toggle-text-color="white"
      toggle-color="warning"
      :options="[
        { value: 'read', slot: 'read' },
        { value: 'change', slot: 'change' },
        { value: 'put', slot: 'put' },
        { value: 'move', slot: 'move' }
      ]"
    >
      <template v-slot:read>
        <div class="col no-wrap">
          <q-icon center name="directions_boat" />
          <div class="text-center">Lesen</div>
        </div>
      </template>

      <template v-slot:change>
        <div class="col no-wrap">
          <q-icon center name="directions_car" />
          <div class="text-center">Eingabe</div>
        </div>
      </template>

      <template v-slot:put>
        <div class="col no-wrap">
          <q-icon center name="directions_railway" />
          <div class="text-center">Setzen</div>
        </div>
      </template>

      <template v-slot:move>
        <div class="col no-wrap">
          <q-icon center name="directions_railway" />
          <div class="text-center">Verschieben</div>
        </div>
      </template>
    </q-btn-toggle>
  </div>
</template>