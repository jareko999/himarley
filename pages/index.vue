<script setup lang="ts">
import { timelineSections } from '~/data/timeline-sections'
import { useTimelineScroll } from '~/composables/useTimelineScroll'

const heroRef = ref<HTMLElement | null>(null)
const sectionRefs = ref<(HTMLElement | null)[]>([])
const contentWrapperRef = ref<HTMLElement | null>(null)

const heroHeight = ref(0)
const sectionTops = ref<number[]>([])
const sectionHeights = ref<number[]>([])
const viewportHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 800)

function setSectionRef(el: unknown, i: number) {
  if (el && typeof el === 'object' && 'offsetTop' in el) {
    sectionRefs.value[i] = el as HTMLElement
  }
}

function measure() {
  if (typeof window === 'undefined') return
  viewportHeight.value = window.innerHeight
  const heroEl = heroRef.value?.$el ?? heroRef.value
  if (heroEl && heroEl instanceof HTMLElement) {
    heroHeight.value = heroEl.offsetHeight
  }
  const tops: number[] = []
  const heights: number[] = []
  sectionRefs.value.forEach((el) => {
    if (el) {
      const rect = el.getBoundingClientRect()
      tops.push(rect.top + window.scrollY)
      heights.push(rect.height)
    }
  })
  sectionTops.value = tops
  sectionHeights.value = heights
}

const scrollY = ref(0)

const {
  pathPoints,
  sectionPhases,
} = useTimelineScroll(
  heroHeight,
  sectionTops,
  sectionHeights,
  viewportHeight,
  scrollY
)

const totalScrollHeight = computed(() => {
  const lastTop = sectionTops.value[sectionTops.value.length - 1] ?? 0
  const lastHeight = sectionHeights.value[sectionHeights.value.length - 1] ?? 0
  return Math.max(heroHeight.value + 1, lastTop + lastHeight)
})

function onScroll() {
  scrollY.value = typeof window !== 'undefined' ? window.scrollY : 0
  measure()
}

onMounted(() => {
  measure()
  nextTick(measure)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measure)
})

// Fonts are loaded globally in assets/css/main.scss
</script>

<template>
  <div class="timeline-page">
    <div ref="contentWrapperRef" class="timeline-content">
      <TimelineHero ref="heroRef" />
      <div class="timeline-sticky-dot" aria-hidden="true" />
      <div class="timeline-sections">
        <div
          v-for="(section, i) in timelineSections"
          :key="section.slug"
          :ref="(el) => setSectionRef(el as HTMLElement, i)"
          class="timeline-section-wrapper"
        >
          <TimelineSection
            :section="section"
            :content-order="(i % 2 === 0 ? 2 : 1)"
            :phase="sectionPhases[i] ?? 'before'"
          />
        </div>
      </div>
    </div>

    <div
      class="timeline-path-layer"
      :style="{ height: `${totalScrollHeight}px` }"
    >
      <TimelinePath
        :path-points="pathPoints"
        :total-height="totalScrollHeight"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Geist', sans-serif;
}

.timeline-content {
  position: relative;
  z-index: 0;
}

.timeline-sections {
  display: flex;
  flex-direction: column;
}

.timeline-section-wrapper {
  min-height: 80vh;
}

.timeline-path-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 1;
}

.timeline-sticky-dot {
  position: sticky;
  top: 50vh;
  left: 13px;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: #000;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;

  @media (min-width: 768px) {
    left: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    background: #000;
    opacity: 0.5;
    animation: pulse 3s var(--ease) infinite;
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
}
</style>
