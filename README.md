# PCL Platform — Frontend

**Personalized Code Learning Platform** — Frontend application built with React + TypeScript + Vite.

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build tool:** [Vite 5](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Code quality:** ESLint (flat config) + Prettier + Husky + lint-staged
- **CI:** GitHub Actions

## 📋 Prerequisites

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

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `yarn dev`          | Start Vite dev server with HMR                     |
| `yarn build`        | Type-check and build for production into `dist/`   |
| `yarn preview`      | Preview the production build locally               |
| `yarn lint`         | Run ESLint on all files (fails on any warning)     |
| `yarn lint:fix`     | Run ESLint and auto-fix issues                     |
| `yarn format`       | Format all files with Prettier                     |
| `yarn format:check` | Check formatting without writing (used in CI)      |
| `yarn type-check`   | Run TypeScript compiler without emitting files     |

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

## 🧭 Roadmap (Phase 1)

- [x] Project init with Vite + React + TS
- [x] ESLint + Prettier + Husky setup
- [x] Home page placeholder
- [x] CI pipeline
- [ ] Auth flow
- [ ] Learning path UI
- [ ] Integration with backend API
- [ ] Deployment (Vercel / Netlify)

## 📄 License

MIT
