<template>
  <u-card>
    <template #content>
      <form class="flex flex-col gap-3 w-4/6 mx-auto">
        <div class="flex">
          <u-badge :color="isAuthenticated ? 'success' : 'error'">
            <span v-if="isAuthenticated">Authenticated</span>
            <span v-else>Not Authenticated</span>
          </u-badge>
        </div>

        <u-input id="username" v-model="usernameField" type="email" autocomplete="username" placeholder="Username" />
        <u-input id="password" v-model="password" type="password" autocomplete="current-password" placeholder="Password" />

        <u-button :disabled="!canBeSubmitted" @click="login">
          {{ $t("Test login") }}
        </u-button>

        <u-button v-if="isAuthenticated" @click="useLogout">
          {{ $t("Logout") }}
        </u-button>
      </form>
    </template>
  </u-card>
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
