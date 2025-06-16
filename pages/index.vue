<script setup>
import { PhChatCircleDots, PhMapPin, PhCalendarX } from '@phosphor-icons/vue/compact'
const showPickupButton = ref(false)

const transferStationHours = {
  0: null, // Sunday
  1: null, // Monday
  2: { open: '07:00', close: '17:00' },
  3: { open: '08:30', close: '17:00' },
  4: { open: '08:30', close: '19:00' },
  5: { open: '08:30', close: '17:00' },
  6: { open: '06:30', close: '15:00' },
}


const nextAvailable = computed(() => {
  const now = new Date()

  for (let i = 0; i < 7; i++) {
    const testDate = new Date(now)
    testDate.setDate(now.getDate() + i)
    const dow = testDate.getDay()
    const hours = transferStationHours[dow]
    if (!hours) continue

    const open = parseTimeToDate(hours.open, testDate)
    open.setMinutes(open.getMinutes() - 15) // buffer before open

    if (i === 0 && now > open) continue // skip today if too late

    const options = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }

    return open.toLocaleString('en-US', options)
  }

  return 'Unavailable'
})

function parseTimeToDate(timeStr, day) {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const date = new Date(day)
  date.setHours(hours, minutes, 0, 0)
  return date
}

function checkAvailability() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const hours = transferStationHours[dayOfWeek]

  if (!hours) return false

  const open = parseTimeToDate(hours.open, now)
  const close = parseTimeToDate(hours.close, now)

  // Apply buffer times
  open.setMinutes(open.getMinutes() - 15) // open 15 min before
  close.setMinutes(close.getMinutes() - 30) // close 30 min before actual close

  return now >= open && now <= close
}

onMounted(() => {
  showPickupButton.value = checkAvailability()

  setInterval(() => {
    showPickupButton.value = checkAvailability()
  }, 300000)

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
        <NuxtLink to="/" class="logo flex items-center">
          <img src="/images/favicon.png" alt="" class="h-5 mr-1" />
          <h2 class="md:text-[20px] text-[16px] text-black">TAKE MY TRASH</h2>
        </NuxtLink>
        <div class="flex items-center md:space-x-8 space-x-4 nowrap">
          <NuxtLink to="#about-us">About us</NuxtLink>
          <NuxtLink to="#how-it-works">How it works</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="mb-[180px] relative w-full h-full z-0">
      <div class="background-dots pointer-events-none absolute inset-0 h-screen" />
      <section class="relative overflow-hidden flex justify-center items-center px-4 h-[700px]">
        <div class="flex flex-col items-center text-center relative z-10">
          <div class="mb-4 max-w-[500px] flex items-center">
            <div :class="['available-dot', showPickupButton ? 'available' : 'unavailable']"></div>
            <p>{{ showPickupButton ? "Available" : "Unavailable" }}</p>
          </div>
          <h1 class="text-[56px]">Dump runs for $20</h1>
          <p class="mt-4 max-w-[500px]">
            We take your trash to the dump. Serving <strong>Bedford, NH</strong>.
          </p>
          <a 
            v-if="showPickupButton"
            href="sms:6034174461?body=Can%20you%20pickup%20my%20trash%3F%20It%27s%20located%20at%3A%20" 
            class="button secondary m-auto mt-6"
          >
            <PhChatCircleDots :size="20" class="mr-2" />
            <p>Text for a pickup</p>
          </a>
          <a 
            v-else
            href="sms:6034174461?body=I%27d%20like%20to%20schedule%20a%20trash%20pickup%20on%3A%20" 
            class="button secondary m-auto mt-6"
          >
            <PhChatCircleDots :size="20" class="mr-2" />
            <p>Text to schedule a pickup</p>
          </a>
        </div>
      </section>
      <div class="space-y-[80px]">
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
            <p>4. Pay when we arrive (Cash or Venmo)</p>
            <p>5. We take it to the dump</p>
          </div>
        </section>
        <section id="about-us" class="p-4 w-full max-w-article m-auto">
        <h2 class="mb-12 text-center">About us</h2>
        <div class="grid grid-cols-cart w-full gap-6">
          <img src="/images/fam.png" alt="" class="rounded-lg">
          <section class="space-y-4">
            <p class="mt-2">I'm Jarek, owner of Take My Trash. I'm a Bedford resident and family man. Going to the dump is a pain. No one has time to do it. You have to throw it in your car, making it smell. It piles up and becomes a hassle when you finally get around to it.</p>
            <p>That's why I started Take My Trash. I'll take care of it so you don't have to. Request a pickup and I'll take it to the dump, on demand. Easy.</p>
          </section>
        </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style>
.available-dot {
  height: 10px;
  width: 10px;
  border-radius: 1000px;
  margin-right: 8px;
  position: relative;
}

/* ✅ GREEN GLOWING PULSE when available */
.available-dot.available {
  background-color: #22c55e; /* Tailwind green-500 */
}

.available-dot.available::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1000px;
  background-color: rgba(34, 197, 94, .6);
  animation: pulse-ring 4s cubic-bezier(0, 0, 0, 1) infinite;
  z-index: -1;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(3);
    opacity: 0;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

/* ❌ SOLID RED DOT when unavailable */
.available-dot.unavailable {
  background-color: #dc2626; /* Tailwind red-600 */
}

header a {
  color: black;
}
.logo {
  font-family: 'Shrikhand', sans-serif;
}
.background-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
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
    opacity: .3;
  }
  to {
    transform: translateX(200px);
  }
}
</style>
