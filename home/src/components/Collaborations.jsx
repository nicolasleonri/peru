import { T } from "@tolgee/react"
import './Collaborations.css'

function Collaborations() {
  const types = [
    { image: '/static/collaborations/capictive.jpeg', link: 'https://www.capictive.app/', titleKey: 'collaborations.type1.title', titleDefault: 'capictive.app', descKey: 'collaborations.type1.desc', descDefault: 'En proceso' },
  ]

  return (
    <section className="collaborations" id="colaboraciones">
      <div className="collaborations-container">
        <div className="collaborations-header">
          <h2 className="section-title">
            <T keyName="collaborations.title">Alianzas</T>
          </h2>
          <p className="section-description">
            <T keyName="collaborations.subtitle">
              Siempre estamos en busca de nuevas colaboraciones. Actualmente trabajamos junto a:
            </T>
        </p>
        </div>

        

        <div className="collaborations-types">
          {types.map((type, index) => (
            <div key={index} className="collab-type-card">
              <img src={type.image} alt={type.titleDefault} className="collab-type-image" />
              <a href={type.link} target="_blank" rel="noopener noreferrer" className="collab-type-link">
                <h3 className="collab-type-title">
                  <T keyName={type.titleKey}>{type.titleDefault}</T>
                </h3>
              </a>
              <p className="collab-type-desc">
                <T keyName={type.descKey}>{type.descDefault}</T>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collaborations