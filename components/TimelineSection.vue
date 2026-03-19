<script setup lang="ts">
import type { TimelineSectionData } from '~/data/timeline-sections'
import { getSectionImagePaths } from '~/data/timeline-sections'

const props = withDefaults(
  defineProps<{
    section: TimelineSectionData
    /** 1 = content left, carousel right; 2 = content right, carousel left */
    contentOrder?: 1 | 2
    /** 'before' = faded out below, 'active' = visible, 'after' = faded out above */
    phase?: 'before' | 'active' | 'after'
  }>(),
  { contentOrder: 1, phase: 'before' }
)

const imagePaths = computed(() => getSectionImagePaths(props.section))
</script>

<template>
  <section
    class="timeline-section"
    :class="{
      'timeline-section--visible': phase === 'active',
      'timeline-section--exit': phase === 'after',
    }"
  >
    <div
      class="timeline-section__content min-w-0 order-1 justify-self-start text-left pt-8 md:pt-0"
      :class="contentOrder === 1 ? 'md:order-1 md:justify-self-end md:text-right' : 'md:order-2 md:justify-self-start md:text-left'"
    >
      <p class="text-slate-500 mb-4">{{ section.year }}</p>
      <h2 class="mb-3">{{ section.title }}</h2>
      <p class="text-slate-600 max-w-[42ch]">{{ section.description }}</p>
    </div>
    <div
      class="timeline-section__carousel order-2 justify-self-start pt-8 rounded-xl overflow-hidden md:pt-[64px]"
      :class="contentOrder === 1 ? 'md:order-2 md:justify-self-start' : 'md:order-1 md:justify-self-end'"
    >
      <StackingCarousel :images="imagePaths" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.timeline-section {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 2rem;
  min-height: 80vh;
  padding: 1rem 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: max(2rem, env(safe-area-inset-left));
  padding-right: max(2rem, env(safe-area-inset-right));

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8rem;
    padding: 10rem 0;
  }

  &:not(.timeline-section--visible) .timeline-section__carousel {
    opacity: 0;
    transform: translateY(16px);
  }

  &.timeline-section--visible .timeline-section__carousel {
    opacity: 1;
    transform: translateY(0);
  }

  &.timeline-section--exit .timeline-section__carousel {
    opacity: 0;
    transform: translateY(-16px);
  }
}

.timeline-section__carousel {
  flex: 0 0 min(100%, 460px);
  width: 100%;
  max-width: 460px;
  transition:
    opacity 0.6s var(--ease),
    transform 0.6s var(--ease);
}
</style>
