export function useTimelineScroll(
  heroHeight: Ref<number>,
  sectionTops: Ref<number[]>,
  sectionHeights: Ref<number[]>,
  viewportHeight: Ref<number>,
  scrollYRef?: Ref<number>
) {
  const scrollY = scrollYRef ?? ref(0)

  /** Path points: [x in px, y in px]. Straight down the center. */
  const pathPoints = computed(() => {
    const points: [number, number][] = []
    const centerX = 0

    // Start after the hero so the line begins below it
    points.push([centerX, heroHeight.value || 0])

    sectionTops.value.forEach((y, i) => {
      const sectionCenterY = y + (sectionHeights.value[i] ?? 0) / 2
      points.push([centerX, sectionCenterY])
    })

    return points
  })

  /** Which section index is currently "active" (visible, circle stopped), or -1 */
  const activeSectionIndex = computed(() => {
    const y = scrollY.value
    const vh = viewportHeight.value
    const viewportCenter = y + vh / 2
    const tops = sectionTops.value
    const heights = sectionHeights.value

    for (let i = 0; i < tops.length; i++) {
      const top = tops[i]
      const height = heights[i] ?? vh
      if (viewportCenter >= top && viewportCenter <= top + height) return i
    }
    return -1
  })

  /** Per-section phase: 'before' | 'active' | 'after' for fade in/out */
  const sectionPhases = computed(() => {
    const y = scrollY.value
    const vh = viewportHeight.value
    const viewportCenter = y + vh / 2
    const tops = sectionTops.value
    const heights = sectionHeights.value
    const phases: ('before' | 'active' | 'after')[] = []
    for (let i = 0; i < tops.length; i++) {
      const top = tops[i]
      const height = heights[i] ?? vh
      const bottom = top + height
      if (viewportCenter < top) phases.push('before')
      else if (viewportCenter > bottom) phases.push('after')
      else phases.push('active')
    }
    return phases
  })

  return {
    scrollY,
    pathPoints,
    activeSectionIndex,
    sectionPhases,
  }
}
