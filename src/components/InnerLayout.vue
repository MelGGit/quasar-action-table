<script setup lang='ts'>
const toggleValue = ref('read')

</script>
 
<template>
  <div class="tw-h-[75vh] tw-bg-white tw-rounded-xl tw-shadow-xl tw-relative">
    <ButtonGroup v-model:toggleValue="toggleValue" class="tw-absolute tw-top-0 tw-left-1/2" />
  </div>
</template>