import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'mpa-design-system'
import App from './App'
import './styles.css'
import './styles/globals.css'

const root = createRoot(document.getElementById('root'))
root.render(
	<ThemeProvider>
		<div className="app-container">
			<App />
		</div>
	</ThemeProvider>
)

