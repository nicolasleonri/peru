import { T } from "@tolgee/react"
import './CtaSection.css'

function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h3 className="cta-title">
          <T keyName="howItWorks.cta.title">¿Listo para empezar?</T>
        </h3>
        <p className="cta-description">
          <T keyName="howItWorks.cta.description">Descubre en minutos qué partido político representa mejor tus ideas</T>
        </p>
        <a
          href={import.meta.env.VITE_ELECTOMETRO_URL}
          className="btn btn-primary"
        >
          <T keyName="howItWorks.cta.button">Comenzar Ahora</T>
        </a>
      </div>
    </section>
  )
}

export default CtaSection