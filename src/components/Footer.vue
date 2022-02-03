<script setup lang='ts'>
const { t, availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>
 
<template>
  <q-footer class="text-black bg-transparent tw-px-10">
    <q-toolbar>
      <q-space></q-space>
      <div class="tw-flex tw-gap-4 tw-opacity-30 tw-items-center">
        <button
          class="tw-bg-slate-300 tw-rounded-xl tw-px-4 tw-py-1"
          @click="toggleLocales"
        >{{ t('footer.change-language') }}</button>
        <span>-</span>
        <span>{{ t('footer.privacy-protection') }}</span>
        <span>-</span>
        <span>{{ t('footer.imprint') }}</span>
      </div>
    </q-toolbar>
  </q-footer>
</template>