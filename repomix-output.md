This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose

This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format

The content is organized as follows:

1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
   a. A header with the file path (## File: path/to/file)
   b. The full contents of the file in a code block

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: dist, node_modules, coverage, .husky, public/fonts/**, **/_.svg, \*\*/_.png, \*_/_.jpg
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure

```
.github/workflows/ci.yml
.gitignore
.prettierignore
.prettierrc
eslint.config.js
index.html
package.json
README.md
repomix.config.json
src/App.tsx
src/index.css
src/main.tsx
src/pages/Home.tsx
src/vite-env.d.ts
tsconfig.app.json
tsconfig.app.tsbuildinfo
tsconfig.json
tsconfig.node.json
tsconfig.node.tsbuildinfo
vite.config.ts
```

# Files

## File: repomix.config.json

```json
{
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "removeComments": false,
    "showLineNumbers": false,
    "topFilesLength": 5
  },
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": [
      "dist",
      "node_modules",
      "coverage",
      ".husky",
      "public/fonts/**",
      "**/*.svg",
      "**/*.png",
      "**/*.jpg"
    ]
  }
}
```

## File: .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Lint, Format, Type-check & Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run ESLint
        run: yarn lint

      - name: Check Prettier formatting
        run: yarn format:check

      - name: Type-check
        run: yarn type-check

      - name: Build project
        run: yarn build
```

## File: .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
.pnp
.pnp.js

# Build outputs
dist
dist-ssr
build
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Env files
.env
.env.local
.env.*.local

# Coverage
coverage
```

## File: .prettierignore

```
node_modules
dist
build
coverage
.husky
yarn.lock
package-lock.json
pnpm-lock.yaml
*.min.js
*.min.css
```

## File: .prettierrc

```
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## File: eslint.config.js

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.husky'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  prettierConfig,
);
```

## File: src/App.tsx

```typescript
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
```

## File: src/main.tsx

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

## File: src/pages/Home.tsx

```typescript
import './Home.css';
function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <span className="home__badge">Cooking cooking cooking</span>
        <h1 className="home__title">
          Wibu wibu wibu wibu wibu
          <br />
          wibu wibu wibu wibu wibu
        </h1>
        <p className="home__subtitle">
          Học lập trình theo lộ trình được cá nhân hoá — phù hợp với trình độ,
          mục tiêu và tốc độ của riêng bạn.
        </p>

        <div className="home__actions">
          <button className="home__btn home__btn--primary" type="button">
            Bắt đầu học
          </button>
          <button className="home__btn home__btn--ghost" type="button">
            Tìm hiểu thêm
          </button>
        </div>
      </section>

      <section className="home__features">
        <article className="feature">
          <div className="feature__icon">🧭</div>
          <h3>Lộ trình cá nhân hoá</h3>
          <p>
            Nhận lộ trình học phù hợp với trình độ và mục tiêu nghề nghiệp của
            bạn.
          </p>
        </article>

        <article className="feature">
          <div className="feature__icon">💻</div>
          <h3>Học qua thực hành</h3>
          <p>
            Thực hành trực tiếp với các bài tập code và dự án thực tế, có phản
            hồi chi tiết.
          </p>
        </article>

        <article className="feature">
          <div className="feature__icon">🤖</div>
          <h3>Trợ lý AI</h3>
          <p>
            Được hỗ trợ bởi AI để giải đáp thắc mắc và gợi ý bài học tiếp theo
            cho bạn.
          </p>
        </article>
      </section>

      <footer className="home__footer">
        <p>Yahooooooo</p>
      </footer>
    </main>
  );
}

export default Home;
```

## File: src/vite-env.d.ts

```typescript
/// <reference types="vite/client" />
```

## File: tsconfig.app.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## File: tsconfig.app.tsbuildinfo

```
{"root":["./src/app.tsx","./src/main.tsx","./src/vite-env.d.ts","./src/pages/home.tsx"],"version":"5.6.3"}
```

## File: tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## File: tsconfig.node.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

## File: tsconfig.node.tsbuildinfo

```
{"root":["./vite.config.ts"],"version":"5.6.3"}
```

## File: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Personalized Code Learning Platform - Learn coding with AI-powered personalized paths"
    />
    <title>PCL Platform — Personalized Code Learning</title>
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: src/index.css

```css
@import 'tailwindcss';

/* =========================================
  THEME VARIABLES
========================================= */
@theme {
  /* --*: initial; */

  /* --- Colors --- */
  /* surface */
  --color-surface-a0: #0a0e15;
  --color-surface-a10: #1d2128;
  --color-surface-a20: #32363c;
  --color-surface-a30: #484c52;
  --color-surface-a40: #606368;
  --color-surface-a50: #787b80;

  /* surface-tonal */
  --color-tonal-a0: #0a1222;
  --color-tonal-a10: #1d2535;
  --color-tonal-a20: #323a49;
  --color-tonal-a30: #48505d;
  --color-tonal-a40: #606673;
  --color-tonal-a50: #787e89;

  /* primary */
  --color-primary-a0: #1a3a8a;
  --color-primary-a10: #2d52b5;
  --color-primary-a20: #3b6bdf;
  --color-primary-a30: #5580ed;
  --color-primary-a40: #7899f5;
  --color-primary-a50: #a1b8fb;
  --color-primary-a60: #c9d6fd;

  /* secondary */
  --color-secondary-a10: #e0f2ff;
  --color-secondary-a30: #bde0ff;
  --color-secondary-a50: #85c4ff;
  --color-secondary-a70: #4ca3ff;
  --color-secondary-a90: #1a88ff;

  /* neutral */
  --color-neutral-a50: #f0f4f8;
  --color-neutral-a100: #d9e2ec;
  --color-neutral-a200: #bcccdc;
  --color-neutral-a300: #9fb3c8;
  --color-neutral-a400: #829ab1;
  --color-neutral-a500: #627d98;
  --color-neutral-a600: #486581;
  --color-neutral-a700: #334e68;
  --color-neutral-a800: #243b53;
  --color-neutral-a900: #102a43;

  /* status */
  --color-success-success-a0: #00d68f;
  --color-success-success-a10: #33e0a8;
  --color-success-success-a20: #77eac4;
  --color-warning-warning-a0: #d69e00;
  --color-warning-warning-a10: #e6b833;
  --color-warning-warning-a20: #f0d077;
  --color-danger-danger-a0: #d63d3d;
  --color-danger-danger-a10: #e06c6c;
  --color-danger-danger-a20: #ea9999;
  --color-info-info-a0: #1a3a8a;
  --color-info-info-a10: #3b6bdf;
  --color-info-info-a20: #7899f5;
  --color-discovery-discovery-a10: #99fff0;
  --color-discovery-discovery-a30: #5cf5d7;
  --color-discovery-discovery-a50: #2eeabd;
  --color-discovery-discovery-a70: #00d6b1;
  --color-discovery-discovery-a90: #00a37b;

  /* --- Spacing --- */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-30: 120px;
  --spacing-32: 128px;
}

/* =========================================
  FONTS
========================================= */
@font-face {
  font-family: 'SFU Futura';
  src: url('/fonts/SFUFuturaBold.TTF') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'SFU Futura';
  src: url('/fonts/SFUFuturaExtraBold.TTF') format('truetype');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'UTM Neo Sans Intel';
  src: url('/fonts/UTM%20Neo%20Sans%20Intel.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

/* =========================================
  TEXT STYLES
========================================= */
@utility ide1 {
  font-size: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility ide2 {
  font-size: 18px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility ide3 {
  font-size: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility ide4 {
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
  letter-spacing: 0em;
}

@utility h0 {
  font-size: 80px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 800;
  letter-spacing: 0em;
}
@utility h00 {
  font-size: 60px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 800;
  letter-spacing: 0em;
}

@utility h1 {
  font-size: 40px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h2 {
  font-size: 36px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h3 {
  font-size: 32px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h4 {
  font-size: 28px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h5 {
  font-size: 24px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h6 {
  font-size: 20px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h7 {
  font-size: 16px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}
@utility h8 {
  font-size: 12px;
  font-family: 'SFU Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0em;
}

@utility p1 {
  font-size: 40px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p2 {
  font-size: 36px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p3 {
  font-size: 32px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p4 {
  font-size: 28px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p5 {
  font-size: 24px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p6 {
  font-size: 20px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p7 {
  font-size: 16px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p8 {
  font-size: 14px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}
@utility p9 {
  font-size: 12px;
  font-family: 'UTM Neo Sans Intel', sans-serif;
  font-weight: 400;
  letter-spacing: 0em;
}

:root {
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #0b0d14;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(
      ellipse at top,
      rgba(100, 108, 255, 0.15) 0%,
      transparent 50%
    ),
    #0b0d14;
}

a {
  color: #a5adff;
  text-decoration: none;
}

a:hover {
  color: #c7cbff;
}

button {
  font-family: inherit;
}
```

## File: vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

## File: README.md

````markdown
# W.E.B.U - Web Engineering of Bachkhoa Univeristy

**Personalized Code Learning Platform** — Frontend application built with React + TypeScript + Vite.

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build tool:** [Vite 5](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Code quality:** ESLint (flat config) + Prettier + Husky + lint-staged
- **CI:** GitHub Actions

## 📋 Prerequisitesx

- Node.js `>= 20`
- Yarn `>= 1.22` (or npm/pnpm — adjust commands accordingly)

## 🛠 Getting Started

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd pcl-frontend

# 2. Install dependencies
yarn install

# 3. Initialize Husky hooks (runs automatically via "prepare" script,
#    but you can run it manually if needed)
yarn prepare

# 4. Start dev server
yarn dev
```

The app will be available at **http://localhost:5173**.

## 📜 Available Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `yarn dev`          | Start Vite dev server with HMR                   |
| `yarn build`        | Type-check and build for production into `dist/` |
| `yarn preview`      | Preview the production build locally             |
| `yarn lint`         | Run ESLint on all files (fails on any warning)   |
| `yarn lint:fix`     | Run ESLint and auto-fix issues                   |
| `yarn format`       | Format all files with Prettier                   |
| `yarn format:check` | Check formatting without writing (used in CI)    |
| `yarn type-check`   | Run TypeScript compiler without emitting files   |

## 📁 Project Structure

```
pcl-frontend/
├── .github/workflows/    # GitHub Actions CI
├── .husky/               # Git hooks (pre-commit → lint-staged)
├── public/               # Static assets served as-is
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-level pages
│   │   ├── Home.tsx
│   │   └── Home.css
│   ├── App.tsx           # Root component + routes
│   ├── main.tsx          # App entry point
│   ├── index.css         # Global styles
│   └── vite-env.d.ts
├── eslint.config.js      # ESLint flat config
├── .prettierrc           # Prettier config
├── vite.config.ts        # Vite config (with `@/` alias to `src/`)
└── tsconfig.*.json       # TypeScript configs
```

### Path aliases

`@/*` is aliased to `src/*`, so you can import like:

```ts
import Home from '@/pages/Home';
```

## 🎯 Code Quality Workflow

- **Pre-commit:** Husky runs `lint-staged` which auto-fixes ESLint issues and formats staged files with Prettier before every commit.
- **CI:** On every push or pull request to `main`, GitHub Actions runs lint, format check, type-check, and build.
````

## File: package.json

```json
{
  "name": "webu-frontend",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "description": "Personalized Code Learning Platform - Frontend",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "prepare": "husky"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.11.1",
    "@tailwindcss/vite": "^4.3.0",
    "@types/node": "^25.6.0",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.5.0",
    "eslint": "^9.11.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.12",
    "globals": "^15.9.0",
    "husky": "^9.1.6",
    "lint-staged": "^15.2.10",
    "postcss": "^8.5.15",
    "prettier": "^3.3.3",
    "tailwindcss": "^4.3.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.7.0",
    "vite": "^5.4.8"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md,html}": ["prettier --write"]
  }
}
```
