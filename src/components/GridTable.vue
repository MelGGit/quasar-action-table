<script setup lang='ts'>
import { modeEnum, weekdayShortsEnum } from '@/types';
import { useCreateWeeKArray } from '@/composables/useCreateWeekArray';

const numberOfDaysInMonth = 31


const tableHead = ['Vertrag', 'Leistung', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), 'A']
const morningDateRow = ['', 'Pflegeversicherung', ...useCreateWeeKArray(5, numberOfDaysInMonth), '']
const morningVisitRow = ['', 'morgens', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const morningInfo = ['SGB XI HH', 'LK1: KL Morgen/Abendtlt.']
const morningValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const morningSum = computed(() => morningValues.reduce(reduceFunction))
const noonValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const noonSum = computed(() => noonValues.reduce(reduceFunction))
const eveningValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const eveningSum = computed(() => eveningValues.reduce(reduceFunction))


function reduceFunction(accumulator: number, currentValue: number | string): number {
  return Number(accumulator) + Number(currentValue)
}

const selectWholeText = (event: FocusEvent) => {
  if (event.target && event.target instanceof HTMLInputElement)
    event.target.select()
}

</script>
 
<template>
  <div class="tw-grid tw-grid-cols-[max-content_max-content_repeat(32,_minmax(0,_1fr))] tw-text-center">
    <div v-for="headName in tableHead" :key="headName">{{ headName }}</div>
    <div v-for="value in morningDateRow" :key="value">{{ value }}</div>
    <div v-for="value in morningVisitRow" :key="value">{{ value }}</div>
    <div v-for="value in morningInfo" :key="value">{{ value }}</div>
    <input
      @focus="selectWholeText"
      class="tw-text-center"
      v-for="(value, i) in morningValues"
      :key="value"
      v-model.lazy="morningValues[i]"
    />
    <div>{{ morningSum }}</div>
  </div>
</template>