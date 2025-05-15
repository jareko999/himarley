<script setup>
import { PhArrowRight, PhArrowUpRight } from '@phosphor-icons/vue/compact'
import { sites } from '~/utils/sites'
const { gtag } = useGtag()

onMounted(() => {
  gtag('event', 'ads_conversion_Contact_Us_1', {
    event_category: 'Contact',
    event_label: 'Work With Us Form'
  })
  const container = document.querySelector('.background-dots')
  const numDots = 50

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div')
    dot.className = 'dot'

    // Random start positions and animation delay/duration
    dot.style.top = `${Math.random() * 100}%`
    dot.style.left = `${Math.random() * 100}%`
    dot.style.animationDelay = `${Math.random() * 2}s`
    dot.style.animationDuration = `${8 + Math.random() * 10}s`

    container?.appendChild(dot)
  }
})
</script>

<template>
  <div class="pb-[180px]">
    <main class="relative overflow-hidden flex justify-center items-center p-4 min-h-[600px] bg-white mb-4">
      <div class="background-dots pointer-events-none absolute inset-0 z-0" />
      <div class="text-center relative z-10">
        <h1 class="text-[80px] max-md:text-3xl">We build AI Apps</h1>
        <p class="mt-12 max-md:mt-4 max-w-[800px]">
          We build AI apps and internal tools for startups and enterprises
        </p>
        <Button to="/contact" text="Hire us" class="secondary m-auto mt-8">
          <template #right-icon>
            <PhArrowRight :size="16" class="ml-2" />
          </template>
        </Button>
      </div>
    </main>
    <section class="mb-[80px]">
      <h2 class="mb-12 text-center">What we've built</h2>
      <div class="grid grid-cols-products gap-4 max-w-container m-auto p-4">
        <template v-for="site in sites" :key="site.key">
          <NuxtLink
            v-if="site.url"
            class="border rounded-lg overflow-hidden text-black"
            :to="site.url"
          >
            <img :src="site.image" alt="" class="w-full h-[240px] object-cover" />
            <div class="p-4 flex flex-col">
              <div class="flex w-full justify-between items-center">
                <p class="text-md">{{ site.name }}</p>
                <PhArrowUpRight :size="20" />
              </div>
              <p class="text-sm text-gray-500 mt-1">{{ site.description }}</p>
            </div>
          </NuxtLink>
          <div
            v-else
            class="border rounded-lg overflow-hidden"
          >
            <img :src="site.image" alt="" class="w-full h-[240px] object-cover" />
            <div class="p-4">
              <p class="text-md text-black">{{ site.name }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ site.description }}</p>
            </div>
          </div>
        </template>
      </div>
    </section>
    <section class="p-4 w-full max-w-article m-auto">
      <h2 class="mb-12 text-center">Our team</h2>
      <div class="grid grid-cols-cart w-full gap-6">
        <img src="/images/fam.png" alt="" class="rounded-lg">
        <section>
          <h3>Jarek Ostrowski - Founder</h3>
          <p class="mt-2">Jarek's been designing and developing apps for a decade. He has agency and startup experience, including 4 years at GitLab as a Product Designer working on their DevOps tools and design system. He went public with them in 2021.</p>
          <p class="mt-2">He's a proud dad and loves family life.</p>
        </section>
      </div>
    </section>
  </div>
</template>

<style>
.background-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;
  border-radius: 50%;
  animation-name: floatDot;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes floatDot {
  from {
    transform: translateX(0);
  }
  50% {
    opacity: .5;
  }
  to {
    transform: translateX(200px);
  }
}
</style>
