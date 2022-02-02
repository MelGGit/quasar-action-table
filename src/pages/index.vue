<script setup lang="ts">

const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

</script>

<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>{{ t('intro.whats-your-name') }}</div>
  <button @click="toggleLocales">{{ t('button.toggle_langs') }}</button>
</template>

<style>
</style>
