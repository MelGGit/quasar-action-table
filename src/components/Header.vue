<script setup lang='ts'>
</script>
 
<template>
  <q-header class="bg-transparent tw-py-2 tw-border-b tw-border-gray-600">
    <q-toolbar>
      <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
        <div class="tw-flex tw-items-center tw-gap-8 tw-text-xl">
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
            </q-avatar>
          </q-toolbar-title>
          <span>Dashboard</span>
          <span>Patienten</span>
          <span>Mitarbeiter</span>
          <q-btn style="background: #14151C" padding="4px 10px" unelevated no-caps size="lg">Abrechnung</q-btn>
        </div>
        <q-btn flat round dense icon="more_vert" />
      </div>
    </q-toolbar>
  </q-header>
</template>