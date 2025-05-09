<template>
  <div class="w-full md:w-2/6 my-10">
    <div class="w-full p-6 bg-white rounded-lg shadow-md text-center dark:bg-gray-800 dark:border-gray-700">
      <h1 class="text-3xl font-bold mb-5">{{ $t("Welcome!") }}</h1>  
      <div class="flex justify-center gap-2">
        <NuxtLink to="/django/celery" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Django #1 Celery
        </NuxtLink>

        <NuxtLink to="/django/kubes" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Django #2 Kubes
        </NuxtLink>
      </div>

      <div class="px-5  mt-5 flex justify-center gap-1">
        <NuxtLinkLocale to="/" locale="fr" class="text-white uppercase bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          FR
        </NuxtLinkLocale>
        
        <NuxtLinkLocale to="/" locale="en" class="text-white uppercase bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          EN
        </NuxtLinkLocale>

        <NuxtLinkLocale to="/" locale="es" class="text-white uppercase bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          ES
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="w-full p-6 mt-3 bg-white rounded-lg shadow-md text-center dark:bg-gray-800 dark:border-gray-700">
      <form class="flex flex-col gap-3">
        <input id="username" v-model="requestData.username" type="email" autocomplete="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required>
        <input id="password" v-model="requestData.password" type="password" autocomplete="current-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required>

        <button type="button" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="handleLogin">
          {{ $t("Test login") }}
        </button>
        <button v-if="authenticated" type="button" class="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="handleLogout">
          {{ $t("Logout") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAxiosClient } from '~/composables/client'

useHead({ title: 'Home' })

const { login, logout } = useAxiosClient()
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
