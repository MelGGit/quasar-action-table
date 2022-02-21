<script setup lang='ts'>
const toggleValue = ref('read')

</script>
 
<template>
  <div class="tw-h-[75vh] tw-bg-white tw-rounded-xl tw-shadow-xl tw-relative tw-text-black tw-px-10 tw-pt-20">
    <ButtonGroup v-model:toggleValue="toggleValue" class="tw-absolute tw-top-[-30px] tw-left-1/2 center-group" />
    <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
      <DateSwitch>Januar 2022</DateSwitch>
      <div>Test</div>
    </div>
  </div>
</template>

<style>
.center-group {
  transform: translate(-50%, 0);
}
</style>