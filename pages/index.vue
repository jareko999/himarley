<script setup>
import { PhChatCircleDots, PhMapPin } from '@phosphor-icons/vue/compact'

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
  <div>
    <h2 class="logo">TAKE MY TRASH</h2>
    <main class="relative overflow-hidden flex justify-center items-center p-4 min-h-[600px] bg-white mb-4">
      <div class="background-dots pointer-events-none absolute inset-0 z-0" />
      <div class="flex flex-col items-center text-center relative z-10">
        <p class="badge mb-6 max-w-[500px]">
          <PhMapPin :size="18" class="mr-1" />
          Serving Bedford, NH
        </p>
        <h1 class="text-[56px]">Dump runs for $20</h1>
        <p class="mt-4 max-w-[500px]">
          We take your trash to the dump so you don't have to
        </p>
        <a href="sms:6034174461?body=Can%20you%20pick%20up%20my%20trash%20at%20" class="button secondary m-auto mt-8">
          <PhChatCircleDots :size="20" class="mr-2" />
          <p>Request pickup</p>
        </a>
      </div>
    </main>
  </div>
</template>

<style>
.logo {
  margin-left: 24px;
  margin-top: 16px;
  font-size: 20px;
  font-family: 'Shrikhand', sans-serif;
}
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
