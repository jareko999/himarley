<script setup lang="ts">
const props = defineProps<{
  /** Path points [x, y] in pixels. First is start (center top), then alternating left/right. */
  pathPoints: [number, number][]
  /** Total document height for SVG viewBox */
  totalHeight: number
}>()

const pathD = computed(() => {
  const pts = props.pathPoints
  if (pts.length < 2) return ''

  const [startX, startY] = pts[0]
  let d = `M ${startX} ${startY}`

  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i]
    d += ` L ${x} ${y}`
  }
  return d
})

</script>

<template>
  <div class="timeline-path">
    <svg
      class="timeline-path__svg"
      :viewBox="`-1 0 2 ${totalHeight}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        :d="pathD"
        class="timeline-path__line"
        fill="none"
        stroke="#000"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<style scoped>
.timeline-path {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.timeline-path__svg {
  position: absolute;
  top: 0;
  left: 12px;
  width: 2px;
  height: 100%;
}

@media (min-width: 768px) {
  .timeline-path__svg {
    left: 50%;
    transform: translateX(-50%);
  }
}

.timeline-path__line {
  transition: none;
}

</style>
