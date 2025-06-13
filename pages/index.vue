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
    <header class="py-4 px-8 fixed top-0 w-full bg-white z-10 border-b">
      <nav class="flex items-center justify-between">
        <h2 class="logo">TAKE MY TRASH</h2>
        <div class="flex items-center space-x-8">
          <NuxtLink to="#about-us">About us</NuxtLink>
          <NuxtLink to="#how-it-works">How it works</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="space-y-[120px] mb-[180px]">
      <section class="relative overflow-hidden flex justify-center items-center p-4 h-screen bg-white">
        <div class="background-dots pointer-events-none absolute inset-0 z-0" />
        <div class="flex flex-col items-center text-center relative">
          <p class="badge mb-6 max-w-[500px]">
            <PhMapPin :size="18" class="mr-1" />
            Serving Bedford, NH
          </p>
          <h1 class="text-[56px]">Dump runs for $20</h1>
          <p class="mt-4 max-w-[500px]">
            We take your trash to the dump so you don't have to
          </p>
          <a href="sms:6034174461?body=Can%20you%20pickup%20my%20trash%3F%20It%27s%20located%20at%3A%20" class="button secondary m-auto mt-8">
            <PhChatCircleDots :size="20" class="mr-2" />
            <p>Request pickup</p>
          </a>
        </div>
      </section>
      <section id="how-it-works" class="text-[18px] w-full">
        <h2 class="text-center">How it works</h2>
        <div class="m-auto w-max mt-6 p-8 shadow-lg shadow-gray-300 rounded-xl">
          <p>1. Tie up your trash</p>
          <p>2. Put in an accessible location</p>
          <p> 
            <a href="sms:6034174461?body=Can%20you%20pickup%20my%20trash%3F%20It%27s%20located%20at%3A%20">
              <p>3. Request a pickup</p>
            </a>
          </p>
          <p>4. Pay when we arrive (Cash or Card)</p>
          <p>5. We take it to the dump</p>
        </div>
      </section>
      <section id="about-us" class="p-4 w-full max-w-article m-auto">
      <h2 class="mb-12 text-center">About us</h2>
      <div class="grid grid-cols-cart w-full gap-6">
        <img src="/images/fam.png" alt="" class="rounded-lg">
        <section class="space-y-4">
          <p class="mt-2">I'm Jarek, owner of Take My Trash. I'm a Bedford resident and family man. Going to the dump is a pain. No one has time to do it. You have to throw it in your car, making it smell. It ends up piling up and becomes a hassle when you finally get around to it.</p>
          <p>That's why I started Take My Trash. I'll take care of it so you don't have to. Request a pickup and I'll take it to the dump, on demand. Easy.</p>
        </section>
      </div>
    </section>
    </main>
  </div>
</template>

<style>
header a {
  color: black;
}
.logo {
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
