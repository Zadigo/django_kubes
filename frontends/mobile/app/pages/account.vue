<template>
  <ion-nav :root="AccountsRootPage" />
</template>

<script setup lang="ts">
import { AccountsRootPage } from '#components'

definePageMeta({
  layout: 'account'
})
</script>
