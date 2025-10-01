<template>
  <volt-card>
    <template #content>
      <form @submit.prevent>
        <div class="card-body">
          <volt-input-text v-model="requestData.username" type="text" autocomplete="username" class="form-control p-3 mb-2" placeholder="Username" />
          <volt-input-text v-model="requestData.password" type="password" autocomplete="current-password" class="form-control p-3" placeholder="Password" />
  
          <volt-button type="button" class="btn btn-primary btn-rounded shadow-none btn-lg mt-2" @click="handleLogin">
            <icon-lib icon="fa-solid:check" class="me-2" />
            Test Login
          </volt-button>
        </div>
      </form>
    </template>
  </volt-card>
</template>

<script setup lang="ts">
// const showError = ref<boolean>(false)
// const errorMessage = ref<string>('')
const requestData = ref<{ username: string, password: string }>({ username: '', password: '' })

async function handleLogin() {
  // try {
  //   const { login } = useAxiosClient()
  //   login('/auth/v1/token', requestData.value, (payload) => {
  //     console.log(payload.value)
  //     requestData.value.username = ''
  //     requestData.value.password = ''
  //   })
  // } catch (e) {
  //   errorMessage.value = `Could not contact quart API: ${e}`
  //   showError.value = true
  // }
}
</script>
