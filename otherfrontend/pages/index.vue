<template>
  <VoltCard>
    <template #content>
      <form class="flex flex-col gap-3 w-4/6 mx-auto">
        <div class="flex">
          <VoltBadge :severity="isAuthenticated ? 'success' : 'danger'">
            <span v-if="isAuthenticated">Authenticated</span>
            <span v-else>Not Authenticated</span>
          </VoltBadge>
        </div>
        
        <VoltInputText id="username" v-model="requestData.username" type="email" autocomplete="username" placeholder="Username" />
        <VoltInputText id="password" v-model="requestData.password" type="password" autocomplete="current-password" placeholder="Password" />

        <VoltButton :disabled="!canBeSent" @click="handleLogin">
          {{ t("Test login") }}
        </VoltButton>
        <VoltButton v-if="authenticated" @click="handleLogout">
          {{ t("Logout") }}
        </VoltButton>
      </form>
    </template>
  </VoltCard>
</template>

<script setup lang="ts">
const { t } = useI18n()

const authStore = useAuthentication()
const { accessToken, isAuthenticated } = storeToRefs(authStore)
const authenticated = useState('authenticated', () => false)

const requestData = ref<{ username: string, password: string }>({
  username: '',
  password: ''
})

const canBeSent = computed(() => {
  return requestData.value.username !== '' && requestData.value.password !== ''
})

/**
 * Function to login the user
 */
async function handleLogin() {
  try {
    const data = await login(requestData.value.username, requestData.value.password)
    accessToken.value = data.access
  } catch (e) {
    console.error(e)
  }
}

/**
 * Function to logout the user
 */
async function handleLogout() {
  await logout()
}

useHead({ title: 'Home' })
</script>
