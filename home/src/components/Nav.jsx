import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { T } from "@tolgee/react"
import { smoothScrollTo } from '../utils/smoothScroll'
import './Nav.css'

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    const heroElement = document.getElementById('hero')
    if (heroElement) {
      smoothScrollTo(heroElement)
    }
    if (location.hash) {
      setTimeout(() => navigate('/', { replace: true }), 600)
    } else {
      navigate('/')
    }
  }
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={handleLogoClick}>
          <img src="/reverseLogo.svg" alt="Electómetro" />
          <span>Electómetro</span>
        </a>

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