<template>
  <section>
    <VoltCard>
      <template #content>
        <div class="flex items-center justify-center gap-5">          
          <h3 class="text-2xl font-bold uppercase text-center">
            Second Django website
          </h3>
        </div>
        
        <p class="font-light text-center mt-5">
          {{ data }}
        </p>
      </template>
    </VoltCard>
  </section>
</template>

<script setup lang="ts">
// import type { TestApiResponse } from '~/types'

useHead({
  title: 'Kubes'
})

const { data } = await useFetch('/api/schools')

// useFetch('/api/authenticated')
</script>
