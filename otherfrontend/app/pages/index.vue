<template>
  <volt-card>
    <template #content>
      <form class="flex flex-col gap-3 w-4/6 mx-auto">
        <div class="flex">
          <volt-badge :severity="isAuthenticated ? 'success' : 'danger'">
            <span v-if="isAuthenticated">Authenticated</span>
            <span v-else>Not Authenticated</span>
          </volt-badge>
        </div>

        <volt-input-text id="username" v-model="usernameField" type="email" autocomplete="username" placeholder="Username" />
        <volt-input-text id="password" v-model="password" type="password" autocomplete="current-password" placeholder="Password" />

        <volt-button :disabled="!canBeSubmitted" @click="login">
          {{ $t("Test login") }}
        </volt-button>

        <volt-button v-if="isAuthenticated" @click="useLogout">
          {{ $t("Logout") }}
        </volt-button>
      </form>
    </template>
  </volt-card>
</template>

<script setup lang="ts">
const isAuthenticated = useState('isAuthenticated')

/**
 * Login
 */

const { login, usernameField, password, canBeSubmitted } = useLogin()

/**
 * SEO
 */

useHead({ title: 'Home' })
</script>
