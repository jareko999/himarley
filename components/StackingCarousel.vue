<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()

const activeIndex = ref(0)
const isTransitioning = ref(false)
const exitingIndex = ref<number | null>(null)
const demotedIndex = ref<number | null>(null)

const imageList = computed(() => props.images || [])

const n = computed(() => imageList.value.length)

const behindIndex = computed(() => {
  if (n.value <= 1) return -1
  return (n.value + activeIndex.value - 1) % n.value
})

const nextIndex = computed(() => {
  if (n.value <= 1) return -1
  return (activeIndex.value + 1) % n.value
})

function isVisible(i: number) {
  return n.value <= 1 || i === activeIndex.value || i === behindIndex.value || i === nextIndex.value
}

function zIndexFor(i: number) {
  if (i === activeIndex.value) return 30
  // Ensure the just-demoted current card immediately drops below the new current.
  if (i === demotedIndex.value) return 10
  if (i === behindIndex.value) return 10
  if (i === nextIndex.value) return 20
  if (i === exitingIndex.value) return 5
  return 0
}

function next() {
  if (imageList.value.length <= 1 || isTransitioning.value) return
  isTransitioning.value = true

  // Force previous behind card to exit upward + disappear, then snap to hidden position.
  exitingIndex.value = behindIndex.value

  // Explicitly demote the current card as we advance.
  demotedIndex.value = activeIndex.value

  activeIndex.value = (activeIndex.value + 1) % imageList.value.length
  // Clear demotion once DOM has had a chance to apply new classes/styles.
  setTimeout(() => {
    demotedIndex.value = null
  }, 0)
  setTimeout(() => {
    exitingIndex.value = null
  }, 220)
  setTimeout(() => {
    isTransitioning.value = false
  }, 600)
}

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (imageList.value.length <= 1) return
  interval = setInterval(next, 6000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="stacking-carousel">
    <div
      v-for="(src, i) in imageList"
      :key="`${src}-${i}`"
      class="stacking-carousel__card"
      :class="{
        'stacking-carousel__card--current': i === activeIndex,
        'stacking-carousel__card--behind': i === behindIndex,
        'stacking-carousel__card--next': i === nextIndex,
        'stacking-carousel__card--exit-up': i === exitingIndex,
        'stacking-carousel__card--hidden': !isVisible(i),
      }"
      :style="{ zIndex: zIndexFor(i) }"
    >
      <img
        :src="src"
        :alt="`Slide ${i + 1}`"
        class="stacking-carousel__img rounded-xl"
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stacking-carousel {
  position: relative;
  width: auto;
  height: 460px;
  border-radius: 16px;
  perspective: 1200px;
  padding-top: 100px;
  isolation: isolate;
}

.stacking-carousel__card {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  height: 100%;
  transition: .6s var(--ease);

  &--current {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  &--behind {
    transform: translateY(-64px) scale(.9);
    transform-origin: bottom;
    pointer-events: none;
    opacity: .6;
    transition: .6s var(--ease);
  }

  &--exit-up {
    transform: translateY(-80px) scale(.8);
    transform-origin: bottom;
    opacity: 0;
    pointer-events: none;
    transition:
      transform .6s var(--ease),
      opacity 0s linear;
  }

  &--next {
    transform: translateY(100%) scale(1);
    pointer-events: none;
  }

  &--hidden {
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transition: none;
  }
}

.stacking-carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
