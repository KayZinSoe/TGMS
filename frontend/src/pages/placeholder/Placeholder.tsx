import React from 'react'
import MainLayout from '../../layouts/MainLayout'

import './Placeholder.css';
export default function Placeholder({ title }: { title?: string }) {
  return (
    <MainLayout>
      <div className="page-container">
        <h1>{title ?? 'Placeholder'}</h1>
        <p>This page is not implemented yet.</p>
      </div>
    </MainLayout>
  )
}

