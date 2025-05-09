<template>
  <section id="school" class="w-full md:w-2/6">
    <div class="block w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h3 class="text-2xl font-bold uppercase text-center">
        Second Django website
      </h3>
      
      <p class="font-light text-center mt-5">
        {{ data }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TestApiResponse } from '~/types';

useHead({
  title: 'Kubes'
})

const { data } = useFetch('/api/celebrities', {
  transform(data: TestApiResponse) {
    return data
  }
})
</script>
