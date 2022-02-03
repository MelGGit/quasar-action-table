<script setup lang='ts'>
const { t } = useI18n()
</script>
 
<template>
  <div class="tw-flex tw-items-center tw-justify-between">
    <div class="tw-flex tw-gap-4 tw-items-center tw-text-xl">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <span>Britta Britt</span>
      <q-btn flat round dense icon="menu" />
    </div>
    <span class="tw-text-2xl">{{ t('secondLayer.title') }}</span>
    <q-breadcrumbs>
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="white" />
      </template>
      <q-breadcrumbs-el :label="t('secondLayer.accounting')" />
      <q-breadcrumbs-el :label="t('secondLayer.activity-confirmation')" />
    </q-breadcrumbs>
  </div>
</template>