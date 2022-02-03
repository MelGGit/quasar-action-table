
<template>
  <q-layout view="hHh lpR fFf" class="tw-px-10 tw-text-white gradient-background">
    <Header class="tw-mx-10" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-toolbar class="tw-px-0">
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>