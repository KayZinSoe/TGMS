import React from 'react'
import { Link } from 'react-router-dom'
import { LANDING } from '../constants/routes'

export default function Header() {
  return (
    <header className="app-header">
      <div>
        <Link to={LANDING} className="app-logo-link">
          <strong></strong>
        </Link>
      </div>
      <nav>
        <span className="app-nav-placeholder"></span>
      </nav>
    </header>
  )
}

