<template>
  <section id="site">
    <u-card>
      <h1 class="text-3xl font-bold mb-8 text-center">
        {{ $t("Welcome!") }}
      </h1>  

      <div class="flex-col space-y-2 md:space-y-0 md:flex-row justify-center gap-2">
        <u-button class="w-full" rounded>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </u-button>

        <u-button class="w-full" to="/django/celery" rounded>
          Django #1 Celery
        </u-button>

        <u-button class="w-full" rounded>
          <NuxtLink to="/django/kubes">
            Django #2 Kubes
          </NuxtLink>
        </u-button>

        <u-button class="w-full" rounded>
          <NuxtLink to="/django/kubes">
            Django #3 Protected
          </NuxtLink>
        </u-button>
      </div>

      <div class="px-5  mt-5 flex justify-center gap-1">
        <nuxt-link-locale to="/" locale="fr">
          FR
        </nuxt-link-locale>
        
        <nuxt-link-locale to="/" locale="en">
          EN
        </nuxt-link-locale>

        <nuxt-link-locale to="/" locale="es">
          ES
        </nuxt-link-locale>
      </div>
    </u-card>

    <u-container tag="main">
      <slot />
    </u-container>
  </section>
</template>

<script setup lang="ts">

</script>
