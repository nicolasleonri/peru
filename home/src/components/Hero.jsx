import { T } from "@tolgee/react"
import { useLoading } from './LoadingScreen'
import './Hero.css'
import PartyCarousel from './PartyCarousel.jsx'

function Hero() {
  const { isReady } = useLoading()

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span>🗳️ <T keyName="hero.badge">Elecciones 2026</T></span>
        </div>
        <h1 className="hero-title">
          <T keyName="hero.title.discover">Descubre</T>
          <br />
          <PartyCarousel />
          <span className="gradient-text"><T keyName="hero.title.who">quién</T> </span>
          <T keyName="hero.title.represents">te representa</T>
        </h1>
        <div className="hero-cta">
          <a
            href={import.meta.env.VITE_ELECTOMETRO_URL}
            className="btn btn-primary"
          >
            <T keyName="hero.cta.start">Empezar</T>
          </a>
          <a
            href="#caracteristicas"
            className="btn btn-secondary"
          >
            <T keyName="hero.cta.learnMore">Conocer Más</T>
          </a>
        </div>
        <div className={`hero-stats ${isReady ? 'animate' : ''}`}>
          <div className="stat">
            <div className="stat-number"><T keyName="hero.stats.questions_nr">20</T></div>
            <div className="stat-label"><T keyName="hero.stats.questions">Preguntas</T></div>
          </div>
          <div className="stat">
            <div className="stat-number"><T keyName="hero.stats.candidates_nr">30+</T></div>
            <div className="stat-label"><T keyName="hero.stats.candidates">Candidatos</T></div>
          </div>
          <div className="stat">
            <div className="stat-number"><T keyName="hero.stats.necessary_nr">100%</T></div>
            <div className="stat-label"><T keyName="hero.stats.necessary">Necesario</T></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero