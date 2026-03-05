import { useRef } from 'react'
import { useLoading } from './LoadingScreen'
import './PartyCarousel.css'

const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;

function PartyCarousel() {
  const { setCarouselReady } = useLoading()
  const loadedCount = useRef(0)
  const hasSignaled = useRef(false)

  // Party names must match filenames in bucket: {ASSETS_BASE_URL}/peru_2026/party_logos/{name}.{ext}
  const parties = [
    { name: 'PRIN', file: 'PRIN.png' },
    { name: 'Somos Perú', file: 'Somos Perú.png' },
    { name: 'Partido Morado', file: 'Partido Morado.png' },
    { name: 'Avanza País', file: 'Avanza País.jpg' },
    { name: 'Fuerza Popular', file: 'Fuerza popular.png' },
    { name: 'Ahora Nación', file: 'Ahora Nación.png' },
    { name: 'Juntos por el Perú', file: 'Juntos por el Perú.png' },
    { name: 'Renovación Popular', file: 'Renovación Popular.png' },
    { name: 'Alianza para el Progreso', file: 'Alianza para el Progreso.svg' },
    { name: 'APRA', file: 'APRA.png' },
    { name: 'Perú Libre', file: 'Perú Libre.png' },
    { name: 'Podemos Perú', file: 'Podemos Perú.png' },
    { name: 'Fe en el Perú', file: 'Fe en el Perú.png' },
    { name: 'Perú Primero', file: 'Perú Primero.png' },
    { name: 'Partido Cívico OBRAS', file: 'Partido Cívico OBRAS.png' },
    { name: 'Primero La Gente', file: 'Primero La Gente.jpg' },
    { name: 'Libertad Popular', file: 'Libertad Popular.jpeg' },
    { name: 'Partido Patriótico del Perú', file: 'Partido Patriótico del Perú.svg' },
    { name: 'PTE Perú', file: 'PTE Perú.jpg' },
  ].map(p => ({
    name: p.name,
    logo: `${ASSETS_BASE_URL}/peru_2026/party_logos/${encodeURIComponent(p.file)}`
  }))

  const handleImageLoad = () => {
    loadedCount.current += 1
    if (loadedCount.current >= parties.length && !hasSignaled.current) {
      hasSignaled.current = true
      setCarouselReady(true)
    }
  }

  return (
    <div className="party-carousel">
      <div className="carousel-track">
        {/* First set of logos */}
        {parties.map((party, index) => (
          <div key={`party-${index}`} className="party-logo-wrapper">
            <img
              src={party.logo}
              alt={party.name}
              className="party-logo"
              onLoad={handleImageLoad}
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {parties.map((party, index) => (
          <div key={`party-duplicate-${index}`} className="party-logo-wrapper">
            <img
              src={party.logo}
              alt={party.name}
              className="party-logo"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PartyCarousel