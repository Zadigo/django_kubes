<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="h4 text-center">
              Welcome to Vite
            </h1>
          </div>

          <div class="card-body">
            <div v-if="showAlert" class="alert alert-success">
              Rabbit loaded
            </div>
            
            <div class="list-group">
              <a v-for="(item, i) in urls" :key="i" :href="item.url" class="list-group-item list-group-item-action p-3">
                <font-awesome-icon :icon="item.icon" class="me-2" />
                {{ item.title }}
              </a>
            </div>
          </div>

          <div class="card-footer d-flex gap-2">
            <button type="button" class="btn btn-secondary btn-rounded" @click="handleTestQuartBackend">
              <font-awesome-icon icon="refresh" class="me-2" />
              Load rabbit 1
            </button>

            <button type="button" class="btn btn-secondary btn-rounded">
              <font-awesome-icon icon="refresh" class="me-2" />
              Load rabbit 2
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const urls = [
  {
    icon: 'link',
    title: 'Main site',
    url: 'http://johnpm.fr'
  },
  {
    icon: 'database',
    title: 'Postgres',
    url: 'http://postgres.johnpm.fr'
  }
]

export default defineComponent({
  name: 'App',
  setup() {
    const isLoading = ref(false)
    const showAlert  = ref(false)
    return {
      showAlert,
      isLoading,
      urls
    }
  },
  methods: {
    async handleTestQuartBackend() {
      try {
        this.isLoading = true
        const response = await this.$client.post('/test')
        if (response.status === 200) {
          this.showAlert = true
        }
        this.isLoading = false
      } catch (e) {
        // Pass
        e
      }
    }
  }
})
</script>
