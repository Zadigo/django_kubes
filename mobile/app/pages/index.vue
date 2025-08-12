<template>
  <!-- Sidebar -->
  <!-- <ion-menu menu-id="navigation" type="push" content-id="index-page">
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
  </ion-menu> -->

  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Home
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-row>
        <ion-col size="12">
          <ion-button router-link="/details">
            Details
          </ion-button>

          <ion-button @click="() => router.push('/details')">
            Details with router
          </ion-button>

          <ion-button id="test-modal">
            Something
          </ion-button>

          <!-- Modals -->
          <ion-modal ref="modalEl" trigger="test-modal">
            <ion-content>
              <ion-button @click="cancel">
                Close
              </ion-button>
            </ion-content>
          </ion-modal>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const router = useRouter()

const modalEl = useTemplateRef('modalEl')
const cancel = () => modalEl.value?.$el.dismiss(null, 'cancel')
</script>

<style scoped>
ion-menu::part(container) {
  border-radius: 0 20px 20px 0;
}
</style>
