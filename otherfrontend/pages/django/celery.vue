<template>
  <section id="school" class="w-4/6">
    <div class="grid grid-cols-4 grid-rows-1 gap-2">
      <div v-for="item in schools" :key="item.name" class="block w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h2 class="font-bold text-sm">
          {{ item.name }}
        </h2>

        <a href="#" @click.prevent="getProtectedData">
          Test protected view
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { School } from '~/types';

const { $djangoClient } = useNuxtApp()

const { data } = useFetch('/api/schools', {
  transform(data: School[]) {
    return data
  }
})

const schools = computed(() => {
  if (data.value) {
    return data.value
  } else {
    return []
  }
})

async function getProtectedData() {
  try {
    const response = $djangoClient.get<School>('schools/v1/1')
    console.log(response.data)
  } catch (e) {
    console.error(e)
  }
}
</script>
