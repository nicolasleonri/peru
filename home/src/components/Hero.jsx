import { T } from "@tolgee/react"
import './Hero.css'
import PartyCarousel from './PartyCarousel.jsx'

function Hero() {
  return (
    <section className="hero">
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
            href="{import.meta.env.VITE_ELECTOMETRO_URL}"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
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
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">10</div>
            <div className="stat-label"><T keyName="hero.stats.questions">Preguntas</T></div>
          </div>
          <div className="stat">
            <div className="stat-number">20+</div>
            <div className="stat-label"><T keyName="hero.stats.candidates">Candidatos</T></div>
          </div>
          <div className="stat">
            <div className="stat-number">100%</div>
            <div className="stat-label"><T keyName="hero.stats.necessary">Necesario</T></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero