<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons>
        <ion-back-button />
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

            <ion-nav-link router-direction="back">
              <ion-button>
                Back
              </ion-button>
            </ion-nav-link>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-content>
</template>

<script setup lang="ts">
</script>
