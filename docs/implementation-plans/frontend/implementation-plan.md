# Frontend Implementation Plan

## Overview
Minimal Vite + React application for TGMS. This plan describes the initial page, structure, and run steps.

## Tech Stack
- Vite
- React 19
- Optional: React Router (add if multi-page navigation needed)

## Pages & Components
- `Home` page — welcoming dashboard
- `MainLayout` — header + content area
- `Header` component — app title + nav
- `Greeting` component — small reusable widget

## Deliverables
- Files under `frontend/src/`:
  - `pages/Home.jsx`
  - `layouts/MainLayout.jsx`
  - `components/Header.jsx`, `components/Greeting.jsx`
  - `api/` placeholder for future API calls

## Run
```bash
cd frontend
npm install
npm run dev
```

## Checklist
- [ ] Create components and layout
- [ ] Wire `Home` into `App.jsx`
- [ ] Add sample API client in `api/`
- [ ] Add tests

## Notes
Keep the UI simple and accessible; use semantic HTML and minimal CSS for the prototype.