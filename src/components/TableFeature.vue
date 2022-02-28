<script setup lang='ts'>
import { modeEnum } from '@/types';

const emits = defineEmits<{
  (event: 'toggleValue', value: modeEnum): void
}>()

</script>
 
<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <q-btn size="lg" flat dense round color="black" icon="description" />
    <q-btn size="lg" flat dense round color="black" icon="print" />
    <q-btn size="lg" flat dense round color="black" icon="delete" />
    <span class="tw-text-xl">|</span>
    <q-btn @click="$emit('toggleValue', 'attribute')" size="lg" flat dense round color="black" icon="extension" />
    <q-btn size="lg" flat dense round color="black" icon="add_circle" />
  </div>
</template>