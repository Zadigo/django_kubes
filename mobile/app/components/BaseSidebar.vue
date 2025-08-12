<template>
  <ion-menu :content-id="contentId">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Menu Content
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      This is the menu content.
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
defineProps<{ contentId: string  }>()
</script>
