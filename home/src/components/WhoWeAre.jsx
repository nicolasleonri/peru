import { T } from "@tolgee/react"
import './WhoWeAre.css'

function WhoWeAre() {
  const members = [
    { image: '/static/team/elazo.jpeg', nameKey: 'whoWeAre.member1.name', nameDefault: 'Esteban Lazo', roleKey: 'whoWeAre.member1.role', roleDefault: 'Director del proyecto - elazo@decide.pe' },
    { image: '/static/team/jvalqui.jpeg', nameKey: 'whoWeAre.member2.name', nameDefault: 'José Valqui', roleKey: 'whoWeAre.member2.role', roleDefault: 'Investigador principal - jvalqui@decide.pe' },
    // { image: '/static/team/lhaberle.jpeg', nameKey: 'whoWeAre.member3.name', nameDefault: 'Luka Haberle', roleKey: 'whoWeAre.member3.role', roleDefault: 'Coordinador' },
  ]

  return (
    <section className="who-we-are" id="quienes-somos">
      <div className="who-we-are-container">
        <div className="who-we-are-header">
          <h2 className="section-title">
            <T keyName="whoWeAre.title">¿Quiénes Somos?</T>
          </h2>
          <p className="section-description">
            <T keyName="whoWeAre.subtitle">
              Somos un equipo de más de 10 ciudadanas y ciudadanos con experiencia en informática, política, historia, economía, e IA, comprometidos con la democracia y con la visión de fortalecer la participación ciudadana.
            </T>
          </p>
        </div>

        <div className="who-we-are-body">
          <p className="who-we-are-description">
            <T keyName="whoWeAre.description">
              Garantizamos total independencia y transparencia a través de nuestro código abierto (en proceso) y auditorías externas. El Electómetro es una plataforma informativa e independiente. No es financiada por ningún partido político, institución pública o privados.
            </T>
          </p>

          <div className="who-we-are-team">
            {members.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.nameDefault} className="team-avatar" />
                <h3 className="team-name">
                  <T keyName={member.nameKey}>{member.nameDefault}</T>
                </h3>
                <p className="team-role">
                  <T keyName={member.roleKey}>{member.roleDefault}</T>
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default WhoWeAre