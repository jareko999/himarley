export function useTimelineScroll(
  heroHeight: Ref<number>,
  sectionTops: Ref<number[]>,
  sectionHeights: Ref<number[]>,
  viewportHeight: Ref<number>,
  scrollYRef?: Ref<number>
) {
  const scrollY = scrollYRef ?? ref(0)

  const totalHeight = computed(() => {
    const lastTop = sectionTops.value[sectionTops.value.length - 1] ?? 0
    const lastHeight = sectionHeights.value[sectionHeights.value.length - 1] ?? 0
    return lastTop + lastHeight
  })

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

  /** 0–1 progress along the path for the circle. Stops at each section when "active". */
  const circleProgress = computed(() => {
    const y = scrollY.value
    const vh = viewportHeight.value
    const tops = sectionTops.value
    const heights = sectionHeights.value
    const n = tops.length

    if (n === 0) return 0

    const heroH = heroHeight.value
    // Section "activates" when its center is at viewport center
    const viewportCenter = y + vh / 2

    for (let i = 0; i < n; i++) {
      const top = tops[i]
      const height = heights[i] ?? vh
      const bottom = top + height
      const sectionCenter = top + height / 2
      const sectionMid = sectionCenter

      if (viewportCenter >= top && viewportCenter <= bottom) {
        // We're in section i – circle is stopped at this section's point
        return (i + 1) / (n + 1)
      }
    }

    // Between sections: interpolate
    if (viewportCenter < (tops[0] ?? 0)) {
      const t = Math.max(0, viewportCenter / (tops[0] ?? 1))
      return (t * 1) / (n + 1)
    }

    for (let i = 0; i < n - 1; i++) {
      const bottom = (tops[i] ?? 0) + (heights[i] ?? vh)
      const nextTop = tops[i + 1] ?? 0
      if (viewportCenter >= bottom && viewportCenter <= nextTop) {
        const segmentStart = (i + 1) / (n + 1)
        const segmentEnd = (i + 2) / (n + 1)
        const t = (viewportCenter - bottom) / (nextTop - bottom || 1)
        return segmentStart + t * (segmentEnd - segmentStart)
      }
    }

    const lastBottom = (tops[n - 1] ?? 0) + (heights[n - 1] ?? vh)
    if (viewportCenter >= lastBottom) {
      const t = Math.min(1, (viewportCenter - lastBottom) / vh)
      return (n + t) / (n + 1)
    }

    return 0
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
    circleProgress,
    activeSectionIndex,
    sectionPhases,
    totalHeight,
  }
}
