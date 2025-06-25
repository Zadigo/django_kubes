<template>
  <section id="site">
    <VoltContainer class="md:w-4/6 my-20 space-y-5">
      <VoltCard>
        <template #content>
          <h1 class="text-3xl font-bold mb-8 text-center">
            {{ $t("Welcome!") }}
          </h1>  

          <div class="flex justify-center gap-2">
            <VoltButton rounded>
              <NuxtLink to="/">
                Home
              </NuxtLink>
            </VoltButton>

            <VoltButton rounded>
              <NuxtLink to="/django/celery">
                Django #1 Celery
              </NuxtLink>
            </VoltButton>

            <VoltButton rounded>
              <NuxtLink to="/django/kubes">
                Django #2 Kubes
              </NuxtLink>
            </VoltButton>

            <VoltButton rounded>
              <NuxtLink to="/django/kubes">
                Django #3 Protected
              </NuxtLink>
            </VoltButton>
          </div>

          <div class="px-5  mt-5 flex justify-center gap-1">
            <NuxtLinkLocale to="/" locale="fr">
              FR
            </NuxtLinkLocale>
            
            <NuxtLinkLocale to="/" locale="en">
              EN
            </NuxtLinkLocale>

            <NuxtLinkLocale to="/" locale="es">
              ES
            </NuxtLinkLocale>
          </div>
        </template>
      </VoltCard>

      <slot />
    </VoltContainer>
  </section>
</template>
