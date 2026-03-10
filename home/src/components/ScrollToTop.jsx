import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { smoothScrollToHash } from '../utils/smoothScroll'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash, scroll to the anchor with polyfill for Safari 12
    if (hash) {
      setTimeout(() => {
        smoothScrollToHash(hash)
      }, 100)
    } else {
      // No hash, scroll to top
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop