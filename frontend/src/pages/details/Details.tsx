import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import './Details.css';

export default function Details() {
  return (
    <MainLayout>
      <div className="page-container">
        <h1>Details</h1>
        <p>This is the details page navigated from Home.</p>
        <div className="details-content" >
          <svg
            role="img"
            aria-label="Decorative illustration for details page"
            viewBox="0 0 340 160"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--primary-start, #60a5fa)" />
                <stop offset="100%" stopColor="var(--primary-end, #7c3aed)" />
              </linearGradient>
            </defs>
            <rect x="4" y="8" width="332" height="144" rx="12" fill="var(--bg-rect, #f8fafc)" />
            <circle cx="64" cy="72" r="40" fill="url(#g1)" opacity="0.95" />
            <g transform="translate(140,36)">
              <rect x="0" y="0" width="160" height="16" rx="4" fill="var(--light-path, #e6eefc)" />
              <rect x="0" y="28" width="120" height="12" rx="4" fill="var(--light-path, #e6eefc)" />
              <rect x="0" y="52" width="90" height="12" rx="4" fill="var(--light-path, #e6eefc)" />
            </g>
            <text x="140" y="120" fontFamily="Inter, sans-serif" fontSize="12" fill="var(--text-color, #111827)">Helpful details appear here</text>
          </svg>
        </div>
      </div>
    </MainLayout>
  )
}

