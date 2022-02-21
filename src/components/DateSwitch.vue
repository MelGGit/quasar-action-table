<script setup lang='ts'>
</script>
 
<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <q-btn flat dense round color="black" icon="chevron_left" />
    <span class="tw-text-lg">
      <slot></slot>
    </span>
    <q-btn flat dense round color="black" icon="chevron_right" />
  </div>
</template>