import { Link } from 'react-router-dom'
import { T } from "@tolgee/react"
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Electómetro</h3>
            <p className="footer-description">
              <T keyName="footer.description">Herramienta imparcial para descubrir qué partido político representa mejor tus ideas y valores.</T>
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">
              <T keyName="footer.about.title">Acerca de</T>
            </h4>
            <ul className="footer-links">
              <li><a href="/#caracteristicas"><T keyName="footer.about.features">Características</T></a></li>
              <li><a href="/#como-funciona"><T keyName="footer.about.howItWorks">Cómo Funciona</T></a></li>
              <li><a href={import.meta.env.VITE_ELECTOMETRO_URL} target="_blank" rel="noopener noreferrer"><T keyName="footer.about.startTest">Empezar Test</T></a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">
              <T keyName="footer.info.title">Información</T>
            </h4>
            <ul className="footer-links">
              <li><Link to="/atribuciones"><T keyName="footer.info.attributions">Atribuciones</T></Link></li>
              <li><a target="_blank" href={`${import.meta.env.VITE_ELECTOMETRO_URL}/#/politica-privacidad`}><T keyName="footer.info.privacy">Política de Privacidad</T></a></li>
              <li><a target="_blank" href={`${import.meta.env.VITE_ELECTOMETRO_URL}/#/metodologia`}><T keyName="footer.info.methodology">Metodología</T></a></li>
              <li><a target="_blank" href={`${import.meta.env.VITE_ELECTOMETRO_URL}/#/contacto`}><T keyName="footer.info.contact">Contacto</T></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            <T keyName="footer.disclaimer">Herramienta informativa. No constituye consejo electoral oficial.</T>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer