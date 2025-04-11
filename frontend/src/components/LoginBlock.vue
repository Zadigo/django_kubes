<template>
  <div class="card-body">
    <form class="card shadow-none border" @submit.prevent>
      <div class="card-body">
        <input v-model="requestData.username" type="text" autocomplete="username" class="form-control p-3 mb-2" placeholder="Username">
        <input v-model="requestData.password" type="password" autocomplete="current-password" class="form-control p-3" placeholder="Password">

        <button type="button" class="btn btn-primary btn-rounded shadow-none btn-lg mt-2" @click="handleLogin">
          <IconLib icon="fa-solid:check" class="me-2" />
          Test Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { type LoginApiResponse, useAxiosClient } from '@/plugins'
import { useCookies } from '@vueuse/integrations/useCookies'
import { ref } from 'vue'

const { set } = useCookies(['access', 'refresh'])

const showError = ref(false)
const errorMessage = ref<string>('')
const requestData = ref<{ username: string, password: string }>({ username: '', password: '' })

async function handleLogin() {
  try {
    const { authenticatedClient: client } = useAxiosClient()
    const response = await client.post<LoginApiResponse>('/auth/v1/token', {
      username: requestData.value.username,
      password: requestData.value.password
    })

    set('access', response.data.access)
    set('refresh', response.data.refresh)

    requestData.value.username = ''
    requestData.value.password = ''
  } catch (e) {
    errorMessage.value = `Could not contact quart API: ${e}`
    showError.value = true
  }
}
</script>
