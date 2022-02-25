<script setup lang='ts'>
import { useCreateWeeKArray } from '@/composables/useCreateWeekArray';

const props = defineProps<{
  toggleValue: string,
  putValue: number
}>()

const numberOfDaysInMonth = 31
const { t } = useI18n()
const tableWrapper = ref<HTMLDivElement>()
const tableHead = ['head.contract', 'head.activity', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), 'A']
const weekRow = ['', 'Pflegeversicherung', ...useCreateWeeKArray(5, numberOfDaysInMonth), '']
// Data morning
const morningVisitRow = ['', 'visit.morning', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const morningInfo = ['SGB XI HH', 'LK1: KL Morgen/Abendtlt.']
const morningValues = ref<number[]>(new Array(numberOfDaysInMonth).fill(1))
const morningSum = computed(() => morningValues.value.reduce(reduceFunction))
// Data forenoon
const forenoonVisitRow = ['', 'visit.forenoon', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const forenoonInfo = ['SGB XI HH', 'LK5: Lagern/Betten']
const forenoonValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const forenoonSum = computed(() => forenoonValues.reduce(reduceFunction))
// Data noon
const noonVisitRow = ['', 'visit.noon', ...Array.from(Array(numberOfDaysInMonth), (e, i) => i + 1), '']
const noonInfo = ['SGB XI HH', 'LK17: Kl. Besorgungen']
const noonValues = reactive<number[]>(new Array(numberOfDaysInMonth).fill(1))
const noonSum = computed(() => noonValues.reduce(reduceFunction))

const update = ref(0)
function reduceFunction(accumulator: number, currentValue: number | string): number {
  return Number(accumulator) + Number(currentValue)
}

const updateArray = (arrayNumber: 0 | 1 | 2, index: number, value: number) => {
  switch (arrayNumber) {
    case 0:
      morningValues.value.splice(index, 1, value)
      break;
    case 1:
      forenoonValues[index] = value
      break;
    case 2:
      noonValues[index] = value
      break;
  }
}

const getArrayValue = (arrayNumber: 0 | 1 | 2, index: number) => {
  switch (arrayNumber) {
    case 0:
      return morningValues.value[index]
    case 1:
      return forenoonValues[index]
    case 2:
      return noonValues[index]
  }
}

const updateValueOnPut = (arrayName: 0 | 1 | 2, index: number) => {
  updateArray(arrayName, index, props.putValue)
}

const handlePutStartEvent = (arrayName: number, index: number, event: DragEvent) => {
  const img = document.createElement('img')
  event.dataTransfer?.setDragImage(img, 0, 0)

  // if (event.target instanceof HTMLInputElement && event.target.parentElement instanceof HTMLTableCellElement) {
  // }
}
const handlePutEvent = (arrayName: 0 | 1 | 2, index: number, event?: DragEvent) => {
  if (event?.target instanceof HTMLInputElement) {
    event.target.classList.add('drag-background')
  }
  updateValueOnPut(arrayName, index)
}

const handlePutEndEvent = (event: DragEvent) => {
  tableWrapper.value?.querySelectorAll('.drag-background').forEach(el => el.classList.remove('drag-background'))
}

const handleShiftDragStart = (arrayNumber: 0 | 1 | 2, index: number, event: DragEvent) => {
  if (!event.dataTransfer) return
  if (!event.target || !(event.target instanceof HTMLInputElement)) return
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData('arrayNumber/index', arrayNumber.toString() + index.toString())
}

const handleShiftDrop = (arrayNumber: 0 | 1 | 2, index: number, event: DragEvent) => {
  if (!event.dataTransfer) return
  if (!event.target || !(event.target instanceof HTMLInputElement)) return
  event.target.focus()
  const data = event.dataTransfer.getData('arrayNumber/index')
  const sourceArrayNumber = Number(data.substring(0, 1))
  if (sourceArrayNumber !== 0 && sourceArrayNumber !== 1 && sourceArrayNumber !== 2) return
  const numberToAdd = getArrayValue(sourceArrayNumber, Number(data.substring(1)))
  //@ts-ignore
  updateArray(sourceArrayNumber, Number(data.substring(1)), '')
  const destValue = getArrayValue(arrayNumber, index)
  const sumToAdd = Number(destValue) + Number(numberToAdd)
  updateArray(arrayNumber, index, sumToAdd)
  update.value++
}

</script>
 
<template>
  <div
    class="tw-grid tw-grid-cols-[minmax(max-content,_auto)_minmax(max-content,_auto)_repeat(32,_minmax(1.8rem,_1fr))] tw-text-center border-gray-wrapper tw-text-lg tw-overflow-x-auto"
    ref="tableWrapper"
    :key="update"
  >
    <div
      class="border-gray-black-child cell-padding tw-bg-[#F4F3F3] element tw-cursor-default"
      v-for="(headName, i) in tableHead"
      :key="headName"
    >{{ i < 2 ? t(headName) : headName }}</div>
    <div
      class="border-gray-child cell-padding tw-text-base first:tw-bg-green-200 element tw-cursor-default"
      v-for="(value, i) in weekRow"
      :key="value"
    >{{ i > 1 && i < 33 ? t(value) : value }}</div>
    <!-- Data morning -->
    <div
      class="visit-row element tw-cursor-default"
      v-for="(value, i) in morningVisitRow"
      :key="value"
    >{{ i === 1 ? t(value) : value }}</div>
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element tw-cursor-default"
      v-for="value in morningInfo"
      :key="value"
    >{{ value }}</div>
    <TableInput
      v-for="(value, i) in morningValues"
      :key="i"
      class="border-gray-black-child"
      :toggleValue="toggleValue"
      @dragstart="toggleValue === 'put' ? handlePutStartEvent(0, i, $event) : null, toggleValue === 'move' ? handleShiftDragStart(0, i, $event) : null"
      @dragover.prevent="toggleValue === 'put' ? handlePutEvent(0, i, $event) : null"
      @drop="toggleValue === 'move' ? handleShiftDrop(0, i, $event) : null"
      @dragenter.prevent="toggleValue === 'put' ? handlePutEvent(0, i, $event) : null"
      @dragend.prevent="toggleValue === 'put' ? handlePutEndEvent($event) : null"
      @mousedown="toggleValue === 'put' ? handlePutEvent(0, i) : null"
      v-model:value="morningValues[i]"
    />
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element tw-cursor-default"
    >{{ morningSum }}</div>
    <!-- Data forenoon -->
    <div
      class="visit-row element tw-cursor-default"
      v-for="(value, i) in forenoonVisitRow"
      :key="value"
    >{{ i === 1 ? t(value) : value }}</div>
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element tw-cursor-default"
      v-for="value in forenoonInfo"
      :key="value"
    >{{ value }}</div>
    <TableInput
      v-for="(value, i) in forenoonValues"
      class="border-gray-black-child"
      :key="i"
      :toggleValue="toggleValue"
      @dragstart="toggleValue === 'put' ? handlePutStartEvent(1, i, $event) : null, toggleValue === 'move' ? handleShiftDragStart(1, i, $event) : null"
      @dragover.prevent="toggleValue === 'put' ? handlePutEvent(1, i, $event) : null"
      @drop="toggleValue === 'move' ? handleShiftDrop(1, i, $event) : null"
      @dragenter.prevent="toggleValue === 'put' ? handlePutEvent(1, i, $event) : null"
      @dragend.prevent="toggleValue === 'put' ? handlePutEndEvent($event) : null"
      @mousedown="toggleValue === 'put' ? handlePutEvent(1, i) : null"
      v-model:value="forenoonValues[i]"
    />
    <div
      class="border-gray-black-child cell-padding tw-flex tw-justify-center tw-items-center element tw-cursor-default"
    >{{ forenoonSum }}</div>
    <!-- Data noon -->
    <div
      class="visit-row element tw-cursor-default"
      v-for="(value, i) in noonVisitRow"
      :key="value"
    >{{ i === 1 ? t(value) : value }}</div>
    <div
      class="border-gray-child cell-padding tw-flex tw-justify-center tw-items-center element tw-cursor-default"
      v-for="value in noonInfo"
      :key="value"
    >{{ value }}</div>
    <TableInput
      class="border-gray-child"
      v-for="(value, i) in noonValues"
      :key="i"
      :toggleValue="toggleValue"
      @dragstart="toggleValue === 'put' ? handlePutStartEvent(2, i, $event) : null, toggleValue === 'move' ? handleShiftDragStart(2, i, $event) : null"
      @dragover.prevent="toggleValue === 'put' ? handlePutEvent(2, i, $event) : null"
      @drop="toggleValue === 'move' ? handleShiftDrop(2, i, $event) : null"
      @dragenter.prevent="toggleValue === 'put' ? handlePutEvent(2, i, $event) : null"
      @dragend.prevent="toggleValue === 'put' ? handlePutEndEvent($event) : null"
      @mousedown="toggleValue === 'put' ? handlePutEvent(2, i) : null"
      v-model:value="noonValues[i]"
    />
    <div
      class="border-gray-child cell-padding tw-flex tw-justify-center tw-items-center element tw-cursor-default"
    >{{ noonSum }}</div>
  </div>
</template>

<style>
.drag-background {
  background-color: aquamarine !important;
}
</style>