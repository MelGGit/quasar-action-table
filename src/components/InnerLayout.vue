<script setup lang='ts'>
import { modeEnum } from '@/types';

const toggleValue = ref<modeEnum>('read')
const selectAttribute = ref('attribute.one')
const putValue = ref(1)
const attributes = ['attribute.one', 'attribute.two', 'attribute.three', 'attribute.four']
const { t } = useI18n()
const putInputElement = ref<HTMLInputElement>()
watchEffect(() => {
  if (toggleValue.value === 'put') putInputElement.value?.select()
}
)
const alterToggleValue = (value: modeEnum) => {
  toggleValue.value = value
}

</script>
 
<template>
  <div class="tw-h-[75vh] tw-bg-white tw-rounded-xl tw-shadow-xl tw-relative tw-text-black tw-px-10 tw-pt-20">
    <ButtonGroup v-model:toggleValue="toggleValue" class="tw-absolute tw-top-[-30px] tw-left-1/2 center-group" />
    <div class="tw-flex tw-justify-center tw-items-center tw-w-full">
      <input
        type="text"
        v-if="toggleValue === 'put'"
        ref="putInputElement"
        class="tw-border tw-border-black tw-text-center tw-rounded-lg tw-absolute tw-top-10 tw-w-20 !tw-outline-none"
        v-model.number="putValue"
      />
    </div>
    <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
      <DateSwitch>{{ t('month.jan') }} 2022</DateSwitch>
      <TableFeature @toggleValue="alterToggleValue($event)" class="tw-relative" />
      <q-select
        v-if="toggleValue === 'attribute'"
        class="tw-absolute tw-right-12 tw-top-10"
        rounded
        dense
        outlined
        v-model="selectAttribute"
        :options="attributes"
        color="black"
        options-selected-class="text-deep-orange"
      >
        <template v-slot:selected-item="scope">{{ t(scope.opt) }}</template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ t(scope.opt) }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <GridTable class="tw-mt-5" :toggleValue="toggleValue" :putValue="putValue" />
  </div>
</template>

<style>
.center-group {
  transform: translate(-50%, 0);
}
</style>