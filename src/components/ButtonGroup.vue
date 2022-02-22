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
const { t } = useI18n()

</script>

<template>
  <div>
    <q-btn-toggle
      v-model="valueComputed"
      push
      stack
      no-caps
      color="white"
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
          <q-icon center name="visibility" />
          <div class="text-center">{{ t('buttonGroup.read') }}</div>
        </div>
      </template>

      <template v-slot:change>
        <div class="col no-wrap">
          <q-icon center name="o_keyboard" />
          <div class="text-center">{{ t('buttonGroup.change') }}</div>
        </div>
      </template>

      <template v-slot:put>
        <div class="col no-wrap">
          <q-icon center name="touch_app" />
          <div class="text-center">{{ t('buttonGroup.put') }}</div>
        </div>
      </template>

      <template v-slot:move>
        <div class="col no-wrap">
          <q-icon center name="open_with" />
          <div class="text-center">{{ t('buttonGroup.move') }}</div>
        </div>
      </template>
    </q-btn-toggle>
  </div>
</template>