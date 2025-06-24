<template>
  <VoltContainer id="school" class="md:w-4/6 my-20">
    <VoltCard>
      <template #content>
        <div class="flex items-center justify-center gap-5">
          <VoltButton as-child>
            <NuxtLink to="/">
              Back
            </NuxtLink>
          </VoltButton>
          
          <h3 class="text-2xl font-bold uppercase text-center">
            Second Django website
          </h3>
        </div>
        
        <p class="font-light text-center mt-5">
          {{ data }}
        </p>
      </template>
    </VoltCard>
  </VoltContainer>
</template>

<script setup lang="ts">
import type { TestApiResponse } from '~/types'

useHead({
  title: 'Kubes'
})

const { data } = useFetch('/api/schools', {
  transform(data: TestApiResponse) {
    return data
  }
})

useFetch('/api/authenticated')
</script>
