/**
 * Smooth scroll polyfill for Safari 12 and older browsers
 * that don't support scrollIntoView({ behavior: 'smooth' })
 */

// Check if smooth scroll is natively supported
const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style

/**
 * Smoothly scroll to an element
 * @param {HTMLElement} element - The element to scroll to
 * @param {number} offset - Optional offset from the top (default: 0)
 * @param {number} duration - Animation duration in ms (default: 500)
 */
export function smoothScrollTo(element, offset = 0, duration = 500) {
  if (!element) return

  if (supportsNativeSmoothScroll) {
    element.scrollIntoView({ behavior: 'smooth' })
    return
  }

  // Fallback for Safari 12 and older browsers
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    // Ease out cubic for natural feeling
    const ease = 1 - Math.pow(1 - progress, 3)

    window.scrollTo(0, startPosition + distance * ease)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Smoothly scroll to a hash/anchor on the page
 * @param {string} hash - The hash selector (e.g., '#section')
 * @param {number} offset - Optional offset from the top
 */
export function smoothScrollToHash(hash, offset = 0) {
  if (!hash) return

  const element = document.querySelector(hash)
  if (element) {
    smoothScrollTo(element, offset)
  }
}
