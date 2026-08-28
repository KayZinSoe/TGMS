# 1 Home Page - Implementation Planning

## User Story

As a user, I want to see a simple dashboard that welcomes me and shows core actions, so I can quickly understand the app and navigate to features.

## Pre-conditions

- Project has a frontend workspace with Vite + React + TypeScript as in `frontend/`.
- Basic app shell exists (`MainLayout`, `Header`) or will be implemented as part of this plan.
- API surface for demo data: `GET /items` (client will call `fetchItems()` from the existing `api` module).

## Design

### Visual Layout

- Page header: app title on the left, nav placeholder on the right.
- Main content: centre column with greeting card, quick-actions panel, and sample items list.
- Small card-style sections stacked vertically on mobile, grid layout on desktop.

Main components
- `HomePage` (page wrapper)
- `Greeting` (existing friendly greeting component)
- `QuickActionsCard` (small card with links/buttons)
- `ItemsList` (list/card grid of example items)

### Color and Typography

- Follow project design tokens / `mpa-design-system` variables.
- Headings: prominent, body copy: neutral tone. Buttons primary accent blue.

### Interaction Patterns

- Greeting: primary CTA triggers navigation to Get Started.
- Items: clicking an item (future) will navigate to details (placeholder now).
- Buttons: show loading state when async actions are added.

### Measurements and Spacing

- Max content width: `max-w-7xl` (or equivalent)
- Vertical rhythm: `space-y-6`; card padding `p-4`.

### Responsive Behavior

- Desktop: two-column grid where greeting + quick actions are side-by-side with items.
- Mobile: stacked single-column layout; nav collapses to hamburger (if implemented).

## Technical Requirements

### Component Structure

```
frontend/src/pages/home/
├── HomePage.tsx
├── HomePage.module.css (or .scss)
└── _components/
    ├── QuickActionsCard.tsx
    └── ItemsList.tsx
```

### Required Components

- `HomePage` — page container, layout composition
- `QuickActionsCard` — static actions and links
- `ItemsList` — fetches/accepts items prop, renders list
- Reuse `Greeting` from `src/components/Greeting.tsx`

### State Management Requirements

- Local page state only:
  - `isLoading: boolean`
  - `items: Item[]`
  - `error?: string`

Type definitions (client-side)

```ts
interface Item {
  id: number;
  name: string;
  description?: string;
}

interface HomePageState {
  isLoading: boolean;
  items: Item[];
  error?: string;
}
```

### API Contracts (frontend-only)

- `GET /items` → `Item[]` — Example: `{ id: number, name: string, description?: string }`

## Acceptance Criteria (mapped)

1. Shows app title and short description (Header / `MainLayout`).
2. Displays a friendly greeting component (`Greeting`).
3. Header contains a placeholder for navigation (slot in `MainLayout`).
4. Sample items render using `ItemsList` with `id`, `name`, and `description`.

## Navigation Rules

- `Greeting` primary CTA navigates to `/get-started`.
- Page registered in router under `/` (home route).

## Error Handling

- Show an inline error message in the items section if fetch fails.
- Provide a retry button that re-invokes the fetch.

## Modified Files (suggested)

```
frontend/src/pages/home/HomePage.tsx
frontend/src/pages/home/_components/QuickActionsCard.tsx
frontend/src/pages/home/_components/ItemsList.tsx
frontend/src/layouts/MainLayout.tsx (if header slot needs update)
frontend/src/routes/router.tsx (ensure route exists)
```

## Status

NOT STARTED

## Task Breakdown (Frontend tasks)

1. Setup
   - Create page folder and files.
   - Add TypeScript `Item` type and local state.
2. Layout & Components
   - Implement `HomePage` composition using `MainLayout`.
   - Reuse `Greeting` component and add `QuickActionsCard` and `ItemsList`.
3. API Integration
   - Use existing `fetchItems()` in `frontend/src/api/index.ts`.
   - Handle loading/error states and implement retry.
4. Responsive & Styling
   - Add CSS / module styles or use design system tokens.
5. Accessibility
   - Ensure semantic headings, buttons, and list markup. Add ARIA where needed.
6. Tests
   - Unit tests for `ItemsList` (renders items, empty state, error state).
   - Integration test for `HomePage` (renders greeting and calls API). Use MSW to mock `fetchItems`.
7. Documentation
   - Update `docs/stories/1-home-page.md` link to implementation plan.

## Dependencies

- `mpa-design-system` (already in project)
- `msw` for mocking in tests (recommend adding to devDependencies)

## Related Stories

- Story: Get Started (navigation target from `Greeting`)

## Notes

- This plan is frontend-only — backend APIs are assumed or mocked.
- Keep components small and reusable.

## Testing Requirements

- Unit: `ItemsList` should have tests for rendering list, empty state, error, and retry.
- Integration: `HomePage` should render `Greeting` + `QuickActionsCard` + `ItemsList` and respond to `Greeting` CTA.
- E2E: simple smoke test to ensure home page loads and navigation to Get Started works.
