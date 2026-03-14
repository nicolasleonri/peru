import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useCycleLanguage } from '../contexts/LanguageCycle.jsx'

function LanguageCurtain({ children, className, lockWidth = false, lockedWidth = null }) {
  const { cycleId, language } = useCycleLanguage()
  const [showPrev, setShowPrev] = useState(false)
  const [prevChildren, setPrevChildren] = useState(null)
  const [prevLanguage, setPrevLanguage] = useState('es')
  const lastChildrenRef = useRef(children)
  const lastLanguageRef = useRef(language)
  const wrapperRef = useRef(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    const prev = lastChildrenRef.current
    if (prev === children) return
    setPrevChildren(prev)
    setPrevLanguage(lastLanguageRef.current || 'es')
    setShowPrev(true)

    const timer = setTimeout(() => {
      setShowPrev(false)
    }, 650)

    return () => clearTimeout(timer)
  }, [cycleId])

  useLayoutEffect(() => {
    if (!lockWidth) return
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const nextEl = nextRef.current
    if (!nextEl) return
    const nextWidth = nextEl.offsetWidth
    const prevWidth = prevRef.current ? prevRef.current.offsetWidth : 0
    const maxWidth = Math.max(nextWidth, prevWidth)
    const resolvedWidth = lockedWidth ?? maxWidth
    if (resolvedWidth && resolvedWidth > 0) {
      wrapper.style.minWidth = `${resolvedWidth}px`
    }
  }, [children, lockWidth, cycleId, lockedWidth])

  useEffect(() => {
    lastChildrenRef.current = children
    lastLanguageRef.current = language
  }, [children, language])

  return (
    <span ref={wrapperRef} className={`lang-curtain${className ? ` ${className}` : ''}`}>
      {showPrev && (
        <span ref={prevRef} className="lang-curtain-prev" data-lang={prevLanguage || 'es'}>
          {prevChildren}
        </span>
      )}
      <span ref={nextRef} className="lang-curtain-next" data-lang={language || 'es'} key={cycleId}>
        {children}
      </span>
    </span>
  )
}

export default LanguageCurtain
