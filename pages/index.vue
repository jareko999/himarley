<script setup>
import { PhArrowRight, PhArrowUpRight } from '@phosphor-icons/vue/compact'

onMounted(() => {
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
    <main class="relative overflow-hidden flex justify-center items-center p-4 min-h-[700px] bg-white mb-4">
      <div class="background-dots pointer-events-none absolute inset-0 z-0" />
      <div class="flex flex-col items-center text-center relative z-10">
        <h1 class="text-[56px]">Understand your money</h1>
        <p class="mt-8 max-w-[500px]">
          Stop sifting through bank statements. Just ask Cash'd about your money to understand how you spend in seconds.
        </p>
        <Button to="/contact" text="Contact us" class="secondary m-auto mt-8">
          <template #right-icon>
            <PhArrowRight :size="16" class="ml-2" />
          </template>
        </Button>
      </div>
    </main>
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
