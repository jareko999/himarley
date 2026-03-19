<script setup lang="ts">
const props = defineProps<{
  /** Image URLs for background shuffle */
  backgroundImages?: string[]
}>()

const images = computed(() => props.backgroundImages?.length
  ? props.backgroundImages
  : [
      '/images/sections/1988-birth/1.png',
      '/images/sections/2016-boston/1.JPG',
      '/images/sections/2019-house/1.JPG',
      '/images/sections/2022-lonebirch/1.JPG',
      '/images/sections/2025-nara/1.png',
    ])

const heroEl = ref<HTMLElement | null>(null)
const shuffled = ref<{ src: string; delay: number; duration: number; leftPx: number; startY: number; widthPx: number }[]>([])

onMounted(() => {
  const width = heroEl.value?.clientWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1200)

  const widths = images.value.map(() => 200 + Math.round(Math.random() * 200))
  const gaps = images.value.map((_, i) => (i === 0 ? 0 : 200 + Math.round(Math.random() * 200)))

  const lefts: number[] = []
  lefts[0] = -200 + Math.round(Math.random() * 200)
  for (let i = 1; i < images.value.length; i++) lefts[i] = lefts[i - 1] + gaps[i]

  // Keep the last image within (100% - 200px) and maintain spacing.
  const maxRight = width - 200
  const overflow = lefts[lefts.length - 1] - maxRight
  const shift = overflow > 0 ? overflow : 0

  shuffled.value = images.value.map((src, i) => ({
    src,
    delay: i * 1.5 + Math.random() * 3,
    duration: 18 + Math.random() * 10,
    leftPx: lefts[i] - shift,
    startY: 60 + Math.random() * 220,
    widthPx: widths[i],
  }))
})
</script>

<template>
  <section ref="heroEl" class="timeline-hero flex flex-col items-center justify-center">
    <div class="timeline-hero__bg">
      <div
        v-for="(item, i) in shuffled"
        :key="item.src + i"
        class="timeline-hero__bg-img"
        :style="{
          '--delay': `${item.delay}s`,
          '--duration': `${item.duration}s`,
          '--left-px': `${item.leftPx}px`,
          '--start-y': `${item.startY}%`,
          '--img-width': `${item.widthPx}px`,
        }"
      >
        <img :src="item.src" :alt="''" class="rounded-xl" />
      </div>
    </div>
    <div class="timeline-hero__content relative z-[1] text-center bg-white rounded-xl p-8">
      <h1 class="max-w-[600px] mx-auto">A journey of 1,000 miles begins with a single step</h1>
      <p class="mt-4"><i>Lao Tzu</i></p>
    </div>
  </section>
</template>

<style scoped>
.timeline-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.timeline-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.timeline-hero__bg-img {
  position: absolute;
  width: var(--img-width, 280px);
  left: var(--left-px, 0px);
  top: 0;
  height: auto;
  aspect-ratio: 1;
  animation: heroFloat var(--duration, 5s) linear var(--delay, 0s) infinite;
  opacity: 0;
}

.timeline-hero__bg-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@keyframes heroFloat {
  0% {
    opacity: 0;
    transform: translateY(var(--start-y, 100%));
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(calc(var(--start-y, 100%) - 500px));
  }
}

@keyframes indicatorBounce {
  from {
    transform: translateY(-48px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
