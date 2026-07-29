<template>
  <ion-app>
    <ion-tabs>
      <!-- View -->
      <ion-router-outlet />

      <!-- Tabs -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="index" href="/">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="account" href="/account">
          <ion-icon :icon="person" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script setup lang="ts">
import { home, search, person } from 'ionicons/icons'
</script>
