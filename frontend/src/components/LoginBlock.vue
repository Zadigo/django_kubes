<template>
  <volt-card>
    <template #content>
      <form @submit.prevent>
        <div class="space-x-2 space-y-2">
          <volt-input-text v-model="username" type="text" autocomplete="username" class="form-control p-3 mb-2" placeholder="Username" />
          <volt-input-text v-model="password" type="password" autocomplete="current-password" class="form-control p-3" placeholder="Password" />

          <volt-button type="button" class="btn btn-primary btn-rounded shadow-none btn-lg mt-2" @click="login">
            <vue-icon icon="fa-solid:check" class="me-2" />
            Test Login
          </volt-button>
        </div>
      </form>
    </template>
  </volt-card>
</template>

<script setup lang="ts">
const username = ref<string>('')
const password = ref<string>('')

async function login() {
  await useAxiosLogin({ email: toValue(username), password: toValue(password) }, 'quart', '/auth/v1/token')
}
</script>
