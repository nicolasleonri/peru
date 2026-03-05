import { useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from "@tolgee/react"
import './Nav.css'

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/reverseLogo.svg" alt="Electómetro" />
          <span>Electómetro</span>
        </Link>

        <button
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/#caracteristicas" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <T keyName="nav.features">Características</T>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#como-funciona" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <T keyName="nav.howItWorks">Cómo Funciona</T>
            </Link>
          </li>
          <li className="nav-item">
            <a
              href={`${import.meta.env.VITE_ELECTOMETRO_URL}/#/metodologia`}
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <T keyName="nav.methodology">Metodología</T>
            </a>
          </li>
          <li className="nav-item">
            <a
              href={import.meta.env.VITE_ELECTOMETRO_URL}
              className="nav-link nav-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              <T keyName="nav.start">Empezar</T>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav