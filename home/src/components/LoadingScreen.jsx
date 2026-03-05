import { useState, useEffect, createContext, useContext } from 'react'
import './LoadingScreen.css'

const LoadingContext = createContext({
    setCarouselReady: () => {},
    isReady: false
})

export function useLoading() {
    return useContext(LoadingContext)
}

function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loading-logo-container">
                <img
                    src="/reverseLogo.svg"
                    alt="Electómetro"
                    className="loading-logo"
                />
                <div className="loading-spinner-ring"></div>
            </div>
        </div>
    )
}

export function LoadingWrapper({ children, minDelay = 500 }) {
    const [timerDone, setTimerDone] = useState(false)
    const [carouselReady, setCarouselReady] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setTimerDone(true), minDelay)
        return () => clearTimeout(timer)
    }, [minDelay])

    const showContent = timerDone && carouselReady

    return (
        <LoadingContext.Provider value={{ setCarouselReady, isReady: showContent }}>
            {!showContent && <LoadingScreen />}
            <div style={{
                opacity: showContent ? 1 : 0,
                transition: showContent ? 'opacity 0.3s ease' : 'none',
                pointerEvents: showContent ? 'auto' : 'none'
            }}>
                {children}
            </div>
        </LoadingContext.Provider>
    )
}

export default LoadingScreen
