<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button router-link="/">
          <ion-icon :name="home" />
          Home
        </ion-button>
      </ion-buttons>

      <ion-title>
        Account
      </ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-row>
      <ion-col size="12">
        <ion-list>
          <ion-item>
            Profile

            <ion-nav-link :component="AccountsProfile" router-direction="forward">
              <ion-button>
                View Profile
              </ion-button>
            </ion-nav-link>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-content>
</template>

<script setup lang="ts">
import { home } from 'ionicons/icons'
import { AccountsProfile } from '#components'
</script>
