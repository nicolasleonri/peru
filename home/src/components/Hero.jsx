import { T } from "@tolgee/react"
import { useRef } from 'react'
import { useLoading } from './LoadingScreen'
import './Hero.css'
import PartyCarousel from './PartyCarousel.jsx'
import { tolgee } from '../tolgee.js'
import { useCycleLanguage } from '../contexts/LanguageCycle.jsx'
import LanguageCurtain from './LanguageCurtain.jsx'

function Hero() {
  const { isReady } = useLoading()
  const { language: cycleLanguage } = useCycleLanguage()
  const currentLanguage = tolgee.getLanguage() || tolgee.getInitialOptions().defaultLanguage
  const availableLanguages = tolgee.getAvailableLanguages?.() || []
  const otherLanguages = availableLanguages.filter((language) => language !== currentLanguage)
  const hasTriggeredLanguageFetch = useRef(false)

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className={`hero-badge ${isReady ? 'animate' : ''}`}>
          <span>🗳️ <T keyName="hero.badge">Elecciones 2026</T></span>
        </div>
        {otherLanguages.length > 0 && (
          <div className={`hero-languages ${isReady ? 'animate' : ''}`}>
            <span className="hero-languages-label">
              <T keyName="hero.languages.label">También en</T>
            </span>
            <span className="hero-languages-list">
              {otherLanguages.map((language, index) => (
                <span className="hero-language" key={language}>
                  <T keyName={`hero.languages.${language}`}>{language}</T>
                  {index < otherLanguages.length - 1 && (
                    <span className="hero-language-sep">•</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        )}
        <h1 className="hero-title">
          <span className="title-discover">
            <LanguageCurtain className="lang-curtain--hero-discover">
              <T keyName="hero.title.discover" language={cycleLanguage}>Descubre</T>
            </LanguageCurtain>
          </span>
          <br />
          <PartyCarousel />
          <span className="title-who">
            <span className="title-who-base">
              <T keyName="hero.title.who" language="es">quién</T>
            </span>
            <span className="title-who-overlay" aria-hidden="true">
              <LanguageCurtain>
                <T keyName="hero.title.who" language={cycleLanguage}>quién</T>
              </LanguageCurtain>
            </span>
          </span>
          <span className="title-represents">
            <span className="title-represents-base">
              <T keyName="hero.title.represents" language="es">te representa</T>
            </span>
            <span className="title-represents-overlay" aria-hidden="true">
              <LanguageCurtain className="lang-curtain--mask">
                <T keyName="hero.title.represents" language={cycleLanguage}>te representa</T>
              </LanguageCurtain>
            </span>
          </span>
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
            <div className="stat-number">
              <T keyName="hero.stats.questions_nr">20</T>
            </div>
            <div className="stat-label">
              <T keyName="hero.stats.questions">Preguntas</T>
            </div>
          </div>
          <div className="stat">
            <div className="stat-number">
              <T keyName="hero.stats.candidates_nr">30+</T>
            </div>
            <div className="stat-label">
              <T keyName="hero.stats.candidates">Candidatos</T>
            </div>
          </div>
          <div className="stat">
            <div className="stat-number">
              <T keyName="hero.stats.necessary_nr">100%</T>
            </div>
            <div className="stat-label">
              <T keyName="hero.stats.necessary">Necesario</T>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
