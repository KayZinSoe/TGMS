---
description: MPA standard development instructions for React.js frontend projects at the Maritime and Port Authority of Singapore (MPA), covering project structure, coding standards, Vite configuration, and best practices.
applyTo: **
---

## Project Structure

The recommended folder organisation for all MPA React.js frontend projects is as follows:

```
.
├── src/
│   ├── api/              # API services and HTTP clients
│   │   ├── httpClient.ts
│   │   └── services/     # One file per API domain (e.g., authServices.ts)
│   ├── assets/           # Static assets (images, logos, icons, etc.)
│   ├── components/       # Reusable UI components (one folder per component)
│   │   └── MyComponent/
│   │       ├── MyComponent.tsx
│   │       ├── MyComponent.css
│   │       └── index.ts
│   ├── config/           # Application configuration (globals, feature flags)
│   ├── constants/        # Application-wide constants
│   │   ├── api-endpoints.ts
│   │   ├── message.ts
│   │   ├── regexp.ts
│   │   ├── roles.ts
│   │   └── routes.ts
│   ├── context/          # React Context API providers
│   ├── data/             # Mock and static data used during development
│   ├── fixtures/         # Test fixtures
│   ├── hooks/            # Custom React hooks
│   ├── layout/           # Application shell / layout components
│   │   ├── AppLayout.tsx
│   │   ├── ContentLayout.tsx
│   │   ├── FooterLayout.tsx
│   │   ├── HeaderLayout.tsx
│   │   └── SidebarLayout.tsx
│   ├── pages/            # Page-level components (one folder per page)
│   │   └── MyPage/
│   │       ├── MyPage.tsx
│   │       └── MyPage.css
│   ├── routes/           # Route definitions and guards
│   │   ├── ProtectedRoute.tsx
│   │   └── router.tsx
│   ├── store/            # Redux Toolkit store and slices
│   │   ├── slice/        # One slice file per feature domain
│   │   └── store.ts
│   ├── styles/           # Global and shared styles
│   │   ├── custom.css
│   │   ├── form.css
│   │   └── globals.css
│   ├── types/            # Shared TypeScript type definitions
│   └── utils/            # Utility / helper functions
├── public/               # Static public assets (served as-is)
│   └── fonts/
├── .github/              # GitHub-specific configurations and instructions
├── eslint.config.js      # ESLint flat config
├── .prettierrc           # Prettier configuration
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── tsconfig.json         # Root TypeScript project references
├── tsconfig.app.json     # TypeScript config for application source
├── tsconfig.node.json    # TypeScript config for Vite / Node scripts
└── vite.config.ts        # Vite build and dev server configuration
```

**Notes:**
- Each page lives in its own sub-folder under `pages/` and should include its own CSS file.
- Co-locate component styles with the component file (e.g., `MyComponent.tsx` + `MyComponent.css`).
- Barrel `index.ts` files are used in `components/`, `layout/`, and `pages/` for clean imports.

---

## Vite Configuration

This project uses **Vite 6** with the `@vitejs/plugin-react` plugin (Babel-based Fast Refresh).

### Current `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,   // bind to 0.0.0.0 – required for Docker / devcontainers
  },
})
```

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start the development server with HMR on port 8080 |
| `build` | `tsc -b && vite build` | Type-check then produce an optimised production bundle |
| `preview` | `vite preview` | Serve the production build locally on port 8080 |
| `lint` | `eslint .` | Run ESLint across the entire project |
| `format` | `prettier --write ./src` | Format all source files with Prettier |

### Path Aliases

Add path aliases in `vite.config.ts` and mirror them in `tsconfig.app.json` to avoid deep relative imports:

```typescript
// vite.config.ts
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
  },
})
```

```jsonc
// tsconfig.app.json – add inside "compilerOptions"
"baseUrl": ".",
"paths": {
  "@/*":           ["src/*"],
  "@components/*": ["src/components/*"],
  "@pages/*":      ["src/pages/*"],
  "@hooks/*":      ["src/hooks/*"],
  "@store/*":      ["src/store/*"],
  "@utils/*":      ["src/utils/*"],
  "@constants/*":  ["src/constants/*"],
  "@api/*":        ["src/api/*"]
}
```

### Environment Variables

- Prefix all custom environment variables with `VITE_` so Vite exposes them to the browser bundle.
- Store environment-specific values in `.env`, `.env.development`, or `.env.production` files.
- Access variables via `import.meta.env.VITE_MY_VAR` — **never** via `process.env`.
- Do **not** commit `.env` files containing secrets; add them to `.gitignore`.

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=My App (Dev)
```

```typescript
// Usage in code
const apiBase = import.meta.env.VITE_API_BASE_URL
```

### API Proxy (Development)

Use Vite's built-in proxy to forward API requests during development and avoid CORS issues:

```typescript
// vite.config.ts – server section
server: {
  port: 8080,
  strictPort: true,
  host: true,
  proxy: {
    '/api': {
      target: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
},
```

### Build Optimisation

```typescript
// vite.config.ts – build section
build: {
  outDir: 'dist',
  sourcemap: false,           // set true for staging environments
  chunkSizeWarningLimit: 600, // kb
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        router: ['react-router-dom'],
        redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
        designSystem: ['mpa-design-system'],
      },
    },
  },
},
```

---

## TypeScript Configuration

The project uses TypeScript **project references** (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`).

Key compiler options in `tsconfig.app.json`:

| Option | Value | Notes |
|--------|-------|-------|
| `target` | `ES2020` | Modern browser baseline |
| `module` | `ESNext` | Tree-shakeable ESM output |
| `moduleResolution` | `bundler` | Vite / bundler-aware resolution |
| `strict` | `true` | All strict checks enabled |
| `jsx` | `react-jsx` | No `React` import required in JSX files |
| `noEmit` | `true` | Vite handles transpilation; `tsc` is for type-checking only |
| `isolatedModules` | `true` | Required for Vite's single-file transforms |

- Always run `npm run build` (which runs `tsc -b` first) to catch type errors before committing.
- Never disable `strict` mode; resolve type errors properly instead of using `any`.

---

## React.js Best Practices

### Component Structure
- Organise components under `src/components/` for shared components and `src/pages/` for page-specific ones.
- Use **PascalCase** for component file and folder names (e.g., `MyComponent.tsx`).
- **Co-locate component styles** (e.g., `MyComponent.css`) with the component file — **no Tailwind classes**.
- Use **semantic CSS classes** in separate CSS files with mpa-design-system tokens.
- Prefer functional components and React hooks over class components.
- Keep components small and focused; split large components into smaller, reusable ones.
- Use TypeScript `interface` or `type` for all props and state.
- Export only one component per file for clarity.
- Use barrel `index.ts` files to simplify cross-folder imports.

### Performance
- Use `React.memo` for pure components to avoid unnecessary re-renders.
- Use dynamic imports (`React.lazy` + `Suspense`) for code splitting and deferred loading of heavy components.
- Minimise prop drilling by using React Context or the Redux store as appropriate.
- Avoid creating anonymous functions and object literals directly in JSX to prevent unnecessary re-renders.
- Use `useCallback` and `useMemo` to memoize callbacks and derived values.
- Keep dependencies up to date and audit with `npm audit` regularly.

### State Management (Redux Toolkit)
- Use **Redux Toolkit** (`@reduxjs/toolkit`) for global state; avoid plain Redux boilerplate.
- Create one slice per feature under `src/store/slice/`.
- Use `redux-persist` only for state that genuinely needs to survive a page refresh (e.g., auth tokens).
- Prefer local component state (`useState`) for UI-only state that isn't shared.

### Routing (React Router v7)
- Define all routes in `src/routes/router.tsx`.
- Wrap sensitive routes with `ProtectedRoute` to enforce authentication.
- Use route constants from `src/constants/routes.ts` — never hardcode path strings.

---

## Development Process

### Package Management
- Use **npm** as the primary package manager for this project.
- Always commit `package-lock.json` to version control.
- Run `npm ci` in CI pipelines to guarantee reproducible installs.
- Audit dependencies regularly: `npm audit --audit-level=high`.

### Running the Project Locally

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Type-check + production build
npm run build

# Preview the production build locally
npm run preview
```

---

## Coding Standards

### Naming Conventions
- **camelCase** for variables, functions, and custom hooks (e.g., `useRouteMatches`).
- **PascalCase** for React components, TypeScript interfaces, and class names.
- **SCREAMING_SNAKE_CASE** for top-level constants (e.g., `API_BASE_URL`).
- **kebab-case** for CSS class names and file names where applicable.

### Code Formatting
- **Prettier** is configured via `.prettierrc` — run `npm run format` before committing.
- **ESLint** is configured via `eslint.config.js` (flat config) — run `npm run lint` to check.
- Use **SonarLint** in VS Code for real-time feedback on potential bugs and code smells.
- ESLint and Prettier run automatically in the Azure Pipelines CI pipeline.

### Comments
- Write clear, concise comments explaining *why*, not *what*.
- Document complex logic, function parameters, and return values using JSDoc.
- Keep comments up to date — stale comments are worse than no comments.

---

## Testing and Quality Assurance

### Unit Testing
- Write unit tests for:
  - Core business logic and utility functions.
  - Complex algorithms and data transformations.
  - Error handling and edge cases.
- Recommended frameworks: **Jest** + **React Testing Library**.
- Place test files alongside the source file (e.g., `utils.test.ts` next to `utils.ts`).

---

## Security

### Secure Coding Practices
- Follow [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/).
- Perform Static Application Security Testing (SAST) using **Checkmarx**.
- Never expose API keys, secrets, or credentials in source code or environment variable files committed to version control.
- Sanitise all user inputs before use; rely on the design system's input validation where available.
- Address all high/critical vulnerabilities surfaced by `npm audit` before raising pull requests.

---

## Design Guidelines

### MPA Design System Integration
**CRITICAL: This project uses ONLY `mpa-design-system` (v0.2.1+) for all UI components, styling, and design tokens.**

**🚫 NO TAILWIND CSS** — This project does NOT use Tailwind. Any Tailwind utility classes (e.g., `bg-gray-50`, `p-4`, `text-center`, `flex`, `gap-2`) must be replaced with proper CSS using mpa-design-system tokens.

**🚫 NO HARDCODED VALUES** — Never use hardcoded colours (`#F5F6F8`), spacing (`24px`, `2rem`), or font names (`'Open Sans'`). Always use CSS variables (`var(--mpa-*)`).

#### Required Setup
- Wrap your application with `ThemeProvider` from `mpa-design-system` in your root component.
- Import components directly from `mpa-design-system`: `import { Button, TextField, Alert } from 'mpa-design-system'`
- `ThemeProvider` automatically handles font loading — do **not** add custom `@font-face` declarations.
- Create separate CSS files for component-level styling using mpa-design-system tokens.

#### Using Design System Components
**Always use design system components instead of building custom ones:**

| Category | Components |
|----------|------------|
| Buttons | `Button` (variants: primary, secondary, tertiary) |
| Form Inputs | `TextField`, `TextAreaField`, `EmailField` |
| Form Controls | `CheckboxGroup`, `RadioButtonGroup`, `SwitchGroup`, `Dropdown` |
| Feedback | `Alert`, `Toast`, `Modal` |
| Navigation | `SideNav`, `TopNavigation`, `Breadcrumbs` |
| Data Display | `Table`, `Tabs`, `Accordion`, `Chips`, `Badge` |
| Layout | `Card`, `Container`, `Divider` |

#### CSS Variables and Design Tokens
**Never hardcode values** — always use CSS variables from the design system:

**Typography:**
```css
font-family: var(--mpa-font-family);

/* Font Sizes */
font-size: var(--font-size-h1);         /* 62px - Display */
font-size: var(--font-size-h2);         /* 48px - Headline */
font-size: var(--font-size-h3);         /* 32px - Title */
font-size: var(--font-size-base);       /* 16px - Body */
font-size: var(--font-size-small-base); /* 14px - Small */

/* Font Weights */
font-weight: var(--font-weight-bold);     /* 700 */
font-weight: var(--font-weight-semibold); /* 600 */
font-weight: var(--font-weight-normal);   /* 400 */

/* Line Heights */
line-height: var(--line-height-base); /* 24px */
```

**Spacing and Padding:**
```css
padding: var(--padding-10);  /* 10px */
padding: var(--padding-12);  /* 12px */
padding: var(--padding-20);  /* 20px */

/* Use the same tokens for margin and gap */
margin: var(--padding-20);
gap: var(--padding-12);
```

**Colors:**
```css
/* Backgrounds */
background-color: var(--mpa-white);    /* #FFFFFF */
background-color: var(--mpa-gray-5);   /* #F9F9FA */
background-color: var(--mpa-gray-10);  /* #F3F4F5 */

/* Text */
color: var(--mpa-font);     /* #565A5C */
color: var(--mpa-gray-60);  /* #565A5C */
color: var(--mpa-gray-80);  /* #333333 */

/* Status */
color: var(--mpa-red-80);    /* Error */
color: var(--mpa-green-60);  /* Success */
color: var(--mpa-yellow-40); /* Warning */
color: var(--mpa-blue-60);   /* Info / Primary */

/* Full extended palette: Blue, Slate Blue, Violet, Teal, Olive Green,
   Lavender, Red, Yellow, Green, Gray (all with 100–10 or 110–1 steps) */
```

**Borders:**
```css
border-width: var(--border-width-1);     /* 1px */
border-width: var(--border-width-2);     /* 2px */

border-radius: var(--border-radius-025); /* 0.25rem */
border-radius: var(--border-radius-05);  /* 0.5rem */
border-radius: var(--border-radius-075); /* 0.75rem */

border-color: var(--mpa-gray-20);
```

#### What NOT to Do ❌

```tsx
// ❌ Tailwind classes
className="bg-gray-50 p-4 text-center flex items-center gap-4 rounded-lg"

// ❌ Hardcoded colours
style={{ color: '#333333', backgroundColor: '#F5F6F8' }}

// ❌ Hardcoded spacing
style={{ padding: '24px', gap: '1rem' }}

// ❌ Custom @font-face for design system fonts
@font-face { font-family: 'Open Sans'; ... }

// ❌ Custom button when design system provides one
const MyButton = () => <button style={{ ... }}>Click</button>
```

#### What TO Do ✅

```css
/* MyComponent.css */
.my-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--padding-20);
  padding: var(--padding-20);
  background-color: var(--mpa-gray-5);
  border-radius: var(--border-radius-075);
}

.my-title {
  font-family: var(--mpa-font-family);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--mpa-gray-80);
}
```

```tsx
// MyComponent.tsx
import './MyComponent.css';
import { Button } from 'mpa-design-system';

const MyComponent = () => (
  <div className="my-container">
    <h1 className="my-title">Title</h1>
    <Button variant="primary">Save</Button>
  </div>
);
```

#### Best Practices
- ✅ Create semantic CSS classes in co-located `.css` files.
- ✅ Use `var(--mpa-*)` CSS variables for all colours, spacing, and fonts.
- ✅ Import components from `mpa-design-system`.
- ✅ Use `ThemeProvider` to wrap the application root.
- ✅ Check available tokens in `node_modules/mpa-design-system/src/sass/_mpa_variables.scss`.

### Responsive Design
- Design mobile-first; use CSS media queries to adapt for tablet and desktop viewports.
- Ensure consistency with the mpa-design-system grid and layout components.
- Test across mobile (≤768px), tablet (769px–1024px), and desktop (>1024px) breakpoints.

### Figma Sources
- **MPA Design Kit**: [Figma – MPA Design Kit 2.11.3](https://www.figma.com/design/d5Mc7UlgF1yFszKcmStICZ/-Core--MPA-Design-Kit-2.11.3-%7C-Release-on-21-Jan-2026)
- **Project Designs**: Each project must maintain its own Figma design file. Link it from the project-level `README.md` and the project-specific instructions file.

Use the Figma MCP server to retrieve layout, tokens, and component structure from the relevant design files.

---

## Documentation

### Project Documentation
- Keep `README.md` up to date with setup, environment variables, and deployment steps.
- Document all REST API endpoints using **Swagger / OpenAPI**.
- Add JSDoc comments to all exported functions, hooks, and complex utilities.