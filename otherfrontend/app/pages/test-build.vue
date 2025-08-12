<template>
  <VoltCard>
    <template #content>
      <div class="space-y-10 overflow-y-scroll h-[400px]">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
        <p ref="textEl" :class="showColor ? 'text-primary-500 italic' : ''">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut sapiente adipisci repellat 
          veritatis dolores asperiores at commodi voluptates ratione facere, perferendis sint eum fugit 
          numquam enim aperiam ipsum! Quae?
        </p>
      </div>
    </template>
  </VoltCard>
</template>

<script setup lang="ts">
const textEl = useTemplateRef('textEl')

const showColor = ref<boolean>(false)

useIntersectionObserver(textEl, ([entry]) => {
  if (entry?.isIntersecting) {
    showColor.value = true
  } else {
    showColor.value = false
  }
})
</script>
