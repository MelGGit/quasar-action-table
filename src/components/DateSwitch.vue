<script setup lang='ts'>
</script>
 
<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <q-btn padding="none" flat round color="black" icon="chevron_left" />
    <span class="tw-text-2xl tw-tracking-wide">
      <slot></slot>
    </span>
    <q-btn padding="none" flat dense round color="black" icon="chevron_right" />
  </div>
</template>