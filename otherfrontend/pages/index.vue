<template>
  <VoltContainer id="kubes" class="md:w-2/6 my-20 space-y-2">
    <VoltCard>
      <template #content>
        <h1 class="text-3xl font-bold mb-5">
          {{ $t("Welcome!") }}
        </h1>  

        <div class="flex justify-center gap-2">
          <VoltButton as-child>
            <NuxtLink to="/django/celery">
              Django #1 Celery
            </NuxtLink>
          </VoltButton>

          <VoltButton as-child>
            <NuxtLink to="/django/kubes">
              Django #2 Kubes
            </NuxtLink>
          </VoltButton>
        </div>

        <div class="px-5  mt-5 flex justify-center gap-1">
          <NuxtLinkLocale to="/" locale="fr">
            FR
          </NuxtLinkLocale>
          
          <NuxtLinkLocale to="/" locale="en">
            EN
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/" locale="es">
            ES
          </NuxtLinkLocale>
        </div>

      </template>
    </VoltCard>

    <VoltCard>
      <template #content>
        <form class="flex flex-col gap-3">
          <VoltInputText id="username" v-model="requestData.username" type="email" autocomplete="username" placeholder="Username" required />
          <VoltInputText id="password" v-model="requestData.password" type="password" autocomplete="current-password" placeholder="Password" required />

          <VoltButton type="button" @click="handleLogin">
            {{ $t("Test login") }}
          </VoltButton>
          <VoltButton v-if="authenticated" type="button" @click="handleLogout">
            {{ $t("Logout") }}
          </VoltButton>
        </form>
      </template>
    </VoltCard>
  </VoltContainer>
</template>

<script setup lang="ts">
useHead({ title: 'Home' })

const authenticated = useState('authenticated', () => false)

const requestData = ref<{ username: string, password: string }>({
  username: '',
  password: ''
})

async function handleLogin() {
  try {
    login('/auth/v1/token', requestData.value, () => {
      authenticated.value = true
      requestData.value.username = ''
      requestData.value.password = ''
    })
  } catch (e) {
    console.error(e)
  }
}

async function handleLogout() {
  logout(() => {
    authenticated.value = false
  })
}
</script>
