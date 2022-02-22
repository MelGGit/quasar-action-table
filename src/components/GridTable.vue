<script setup lang='ts'>
import { modeEnum, weekdayShortsEnum } from '@/types';
import { useCreateWeeKArray } from '@/composables/useCreateWeekArray';

const numberOfDaysInMonth = 31


const tableHead = ['Vertrag', 'Leistung', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), 'A']
const weekRow = ['', 'Pflegeversicherung', ...useCreateWeeKArray(5, numberOfDaysInMonth), '']
// Data morning
const morningVisitRow = ['', 'morgens', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const morningInfo = ['SGB XI HH', 'LK1: KL Morgen/Abendtlt.']
const morningValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const morningSum = computed(() => morningValues.reduce(reduceFunction))
// Data forenoon
const forenoonVisitRow = ['', 'vormittags', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const forenoonInfo = ['SGB XI HH', 'LK5: Lagern/Betten']
const forenoonValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const forenoonSum = computed(() => forenoonValues.reduce(reduceFunction))
// Data noon
const noonVisitRow = ['', 'mittags', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const noonInfo = ['SGB XI HH', 'LK17: Kl. Besorgungen']
const noonValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const noonSum = computed(() => noonValues.reduce(reduceFunction))

const isSunday = (index: number, offset: number): string => {
  if ((index + offset) % 7 === 0) return 'tw-bg-neutral-200'
  return ''
}
const isHoliday = (index: number, offset: number): string => {
  if ((index - offset) === 1) return 'tw-bg-green-200'
  return ''
}
const checkSpecialDay = (index: number, offset: number, defaultColor = ''): string => {
  if (isSunday(index, offset) !== '') return isSunday(index, offset)
  if (isHoliday(index, offset) !== '') return isHoliday(index, offset)
  return defaultColor
}

function reduceFunction(accumulator: number, currentValue: number | string): number {
  return Number(accumulator) + Number(currentValue)
}

const selectWholeText = (event: FocusEvent) => {
  if (event.target && event.target instanceof HTMLInputElement)
    event.target.select()
}

</script>
 
<template>
  <div
    class="tw-grid tw-grid-cols-[minmax(max-content,_auto)_minmax(max-content,_auto)_repeat(32,_minmax(1.8rem,_1fr))] tw-text-center border-gray-wrapper tw-text-lg tw-overflow-x-auto"
  >
    <div
      class="border-gray-black-child cell-padding tw-bg-[#F4F3F3] element"
      v-for="headName in tableHead"
      :key="headName"
    >{{ headName }}</div>
    <div
      class="border-gray-child cell-padding tw-text-base first:tw-bg-green-200 element"
      v-for="value in weekRow"
      :key="value"
    >{{ value }}</div>
    <!-- Data morning -->
    <div class="visit-row element" v-for="value in morningVisitRow" :key="value">{{ value }}</div>
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element"
      v-for="value in morningInfo"
      :key="value"
    >{{ value }}</div>
    <input
      @focus="selectWholeText"
      class="border-gray-black-child input-element element"
      v-for="(value, i) in morningValues"
      :key="value"
      v-model.lazy.number="morningValues[i]"
    />
    <div class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element">{{ morningSum }}</div>
    <!-- Data forenoon -->
    <div class="visit-row element" v-for="value in forenoonVisitRow" :key="value">{{ value }}</div>
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element"
      v-for="value in forenoonInfo"
      :key="value"
    >{{ value }}</div>
    <input
      @focus="selectWholeText"
      class="border-gray-black-child input-element element"
      v-for="(value, i) in forenoonValues"
      :key="value"
      v-model.lazy.number="forenoonValues[i]"
    />
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element"
    >{{ forenoonSum }}</div>
    <!-- Data noon -->
    <div class="visit-row element" v-for="value in noonVisitRow" :key="value">{{ value }}</div>
    <div
      class="border-gray-child cell-padding tw-flex tw-justify-center tw-items-center element"
      v-for="value in noonInfo"
      :key="value"
    >{{ value }}</div>
    <input
      @focus="selectWholeText"
      class="border-gray-child input-element element"
      v-for="(value, i) in noonValues"
      :key="value"
      v-model.lazy.number="noonValues[i]"
    />
    <div class="border-gray-child cell-padding tw-flex tw-justify-center tw-items-center element">{{ noonSum }}</div>
  </div>
</template>