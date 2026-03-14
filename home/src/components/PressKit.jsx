import { T } from "@tolgee/react"
import './PressKit.css'

function PressKit() {
  const resources = [
    { icon: '🖼️', nameKey: 'pressKit.resource1.name', link: 'https://box.fu-berlin.de/s/DRFEC8rPegRjoj2', nameDefault: 'Logos e Imágenes', descKey: 'pressKit.resource1.desc', descDefault: 'En distintos colores y formas.' },
    { icon: '📄', nameKey: 'pressKit.resource2.name', link: 'https://box.fu-berlin.de/s/ZTzTaa2m458nsZH', nameDefault: 'Presentación oficial', descKey: 'pressKit.resource2.desc', descDefault: 'Explica el propósito y funcionamiento del proyecto en detalle.' },
    { icon: '🎙️', nameKey: 'pressKit.resource3.name', link: 'https://box.fu-berlin.de/s/57BX9DbeayxipQ9', nameDefault: 'Spots de radio', descKey: 'pressKit.resource3.desc', descDefault: 'Distintas duraciones (solo en español).' },
    { icon: '🎬', nameKey: 'pressKit.resource4.name', link: 'https://box.fu-berlin.de/s/mcT2jAzJagDPBr5', nameDefault: 'Spots de televisión y redes', descKey: 'pressKit.resource4.desc', descDefault: 'En varios formatos (solo en español). ' },
  ]

  return (
    <section className="press-kit" id="kit-de-prensa">
      <div className="press-kit-container">
        <div className="press-kit-header">
          <h2 className="section-title">
            <T keyName="pressKit.title">Kit de Prensa</T>
          </h2>
          <p className="section-description">
            <T keyName="pressKit.subtitle">
              Disponemos de distintos materiales audiovisuales libre de derechos (licencia CC BY-NC) para que se puedan retransmitir y compartir dónde quieras y cómo quieras.
            </T>
          </p>
        </div>

        <div className="press-kit-grid">
          {resources.map((resource, index) => (
            <div key={index} className="press-card">
              <div className="press-card-icon">{resource.icon}</div>
              <div className="press-card-content">
                <h3 className="press-card-name">
                  <T keyName={resource.nameKey}>{resource.nameDefault}</T>
                </h3>
                <p className="press-card-desc">
                  <T keyName={resource.descKey}>{resource.descDefault}</T>
                </p>
              </div>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="press-card-btn">
                <T keyName="pressKit.download">Descargar</T>
              </a>
            </div>
          ))}
        </div>

        <div className="press-kit-contact">
          <p className="press-kit-contact-text">
            <T keyName="pressKit.contactLabel">¿Quieres compartirnos tu material?</T>
            {' '}
            <a href="mailto:rrpp@decide.pe">rrpp@decide.pe</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PressKit