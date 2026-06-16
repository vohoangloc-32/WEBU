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
- Files matching these patterns are excluded: dist, node*modules, coverage, .husky, public/fonts/**, **/*.svg, \*\*/_.png, \*_/\_.jpg
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
src/components/ui/Button.tsx
src/components/ui/Logo.tsx
src/components/ui/Logo2.tsx
src/components/ui/MainNavigation.tsx
src/components/ui/Tab.tsx
src/components/ui/UserIcon.tsx
src/index.css
src/main.tsx
src/pages/Dashboard.tsx
src/pages/Home.tsx
src/pages/Notebook.tsx
src/pages/Problem.tsx
src/routes/index.tsx
src/tailwind.config.js.txt
src/tailwind.css.txt
src/vite-env.d.ts
tsconfig.app.json
tsconfig.app.tsbuildinfo
tsconfig.json
tsconfig.node.json
tsconfig.node.tsbuildinfo
vite.config.ts
```

# Files

## File: src/pages/Dashboard.tsx

```typescript
import React from 'react';
import { Logo2 } from '@/components/ui/Logo2';
import { Button } from '@/components/ui/Button';
import HomePageImage from '@/assets/HomePageImage.png';
import { useNavigate } from 'react-router-dom';

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <header className="self-stretch flex flex-row justify-start gap-10">
        <Logo2 />
        <span className="text-discovery-a50 h4 font-['Nadoor'] font-bold italic tracking-normal py-14">
          W.E.B.U - Web Engineering of BackKhoa University
        </span>
      </header>
    </div>
  );
};

export default Dashboard;
```

## File: src/pages/Notebook.tsx

```typescript

```

## File: src/pages/Problem.tsx

```typescript

```

## File: src/routes/index.tsx

```typescript

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

## File: src/components/ui/MainNavigation.tsx

```typescript
import React, { useState } from 'react';
import Logo2 from '@/components/ui/Logo2';
import Tab from '@/components/ui/Tab';
import UserIcon from '@/components/ui/UserIcon';

type NavTab = 'DASHBOARD' | 'PROBLEM' | 'NOTEBOOK';

export const MainNavigation = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');

  return (
    <div className="w-370 p-5 bg-tonal-a10 rounded-[5px] border border-purple-600 inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
      <div className="self-stretch h-28 px-8 bg-tonal-a0 inline-flex flex-row justify-between items-center overflow-hidden">
        <div className="flex items-center justify-start">
          <Logo2 />
        </div>

        <div className="flex items-center gap-2 h-full">
          <Tab
            isActive={activeTab === 'DASHBOARD'}
            onClick={() => setActiveTab('DASHBOARD')}
          >
            DASHBOARD
          </Tab>

          <Tab
            isActive={activeTab === 'PROBLEM'}
            onClick={() => setActiveTab('PROBLEM')}
          >
            PROBLEM
          </Tab>

          <Tab
            isActive={activeTab === 'NOTEBOOK'}
            onClick={() => setActiveTab('NOTEBOOK')}
          >
            NOTEBOOK
          </Tab>
        </div>

        <div className="flex items-center justify-end">
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
```

## File: src/components/ui/Tab.tsx

```typescript
import React from 'react';

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const Tab = ({
  children,
  isActive = false,
  className = '',
  ...props
}: TabProps): JSX.Element => {
  const baseClasses =
    "px-5 py-5 inline-flex justify-center items-center gap-2 overflow-hidden text-center text-2xl font-bold font-['SFU_Futura'] transition-all duration-200 select-none cursor-pointer";

  const stateClasses = isActive
    ? 'text-secondary-a30 bg-transparent hover:bg-info-a10 rounded-t-xl border-b-[6px] border-secondary-a50'
    : 'text-neutral-a100 bg-transparent hover:bg-info-a20 hover:text-neutral-a50 rounded-xl border-b-[6px] border-transparent hover:border-transparent';

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Tab;
```

## File: src/components/ui/UserIcon.tsx

```typescript
import React from 'react';

export const UserIcon = (): JSX.Element => {
  return (
    <div className="w-14 h-14 bg-neutral-a50 rounded-full flex items-center justify-center cursor-pointer select-none">
      <svg
        className="w-8 h-8 text-tonal-a0"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    </div>
  );
};

export default UserIcon;
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

## File: src/tailwind.config.js.txt

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-neutral-a100": "var(--neutral-neutral-a100)",
        "neutral-neutral-a200": "var(--neutral-neutral-a200)",
        "neutral-neutral-a300": "var(--neutral-neutral-a300)",
        "neutral-neutral-a400": "var(--neutral-neutral-a400)",
        "neutral-neutral-a50": "var(--neutral-neutral-a50)",
        "neutral-neutral-a500": "var(--neutral-neutral-a500)",
        "neutral-neutral-a600": "var(--neutral-neutral-a600)",
        "neutral-neutral-a700": "var(--neutral-neutral-a700)",
        "neutral-neutral-a800": "var(--neutral-neutral-a800)",
        "neutral-neutral-a900": "var(--neutral-neutral-a900)",
        "primary-primary-a0": "var(--primary-primary-a0)",
        "primary-primary-a10": "var(--primary-primary-a10)",
        "primary-primary-a20": "var(--primary-primary-a20)",
        "primary-primary-a30": "var(--primary-primary-a30)",
        "primary-primary-a40": "var(--primary-primary-a40)",
        "primary-primary-a50": "var(--primary-primary-a50)",
        "primary-primary-a60": "var(--primary-primary-a60)",
        "secondary-secondary-a10": "var(--secondary-secondary-a10)",
        "secondary-secondary-a30": "var(--secondary-secondary-a30)",
        "secondary-secondary-a50": "var(--secondary-secondary-a50)",
        "secondary-secondary-a70": "var(--secondary-secondary-a70)",
        "secondary-secondary-a90": "var(--secondary-secondary-a90)",
        "status-danger-danger-a0": "var(--status-danger-danger-a0)",
        "status-danger-danger-a10": "var(--status-danger-danger-a10)",
        "status-danger-danger-a20": "var(--status-danger-danger-a20)",
        "status-discovery-discovery-a10":
          "var(--status-discovery-discovery-a10)",
        "status-discovery-discovery-a30":
          "var(--status-discovery-discovery-a30)",
        "status-discovery-discovery-a50":
          "var(--status-discovery-discovery-a50)",
        "status-discovery-discovery-a70":
          "var(--status-discovery-discovery-a70)",
        "status-discovery-discovery-a90":
          "var(--status-discovery-discovery-a90)",
        "status-info-info-a0": "var(--status-info-info-a0)",
        "status-info-info-a10": "var(--status-info-info-a10)",
        "status-info-info-a20": "var(--status-info-info-a20)",
        "status-success-success-a0": "var(--status-success-success-a0)",
        "status-success-success-a10": "var(--status-success-success-a10)",
        "status-success-success-a20": "var(--status-success-success-a20)",
        "status-warning-warning-a0": "var(--status-warning-warning-a0)",
        "status-warning-warning-a10": "var(--status-warning-warning-a10)",
        "status-warning-warning-a20": "var(--status-warning-warning-a20)",
        "surface-surface-a0": "var(--surface-surface-a0)",
        "surface-surface-a10": "var(--surface-surface-a10)",
        "surface-surface-a20": "var(--surface-surface-a20)",
        "surface-surface-a30": "var(--surface-surface-a30)",
        "surface-surface-a40": "var(--surface-surface-a40)",
        "surface-surface-a50": "var(--surface-surface-a50)",
        "surface-tonal-tonal-a0": "var(--surface-tonal-tonal-a0)",
        "surface-tonal-tonal-a10": "var(--surface-tonal-tonal-a10)",
        "surface-tonal-tonal-a20": "var(--surface-tonal-tonal-a20)",
        "surface-tonal-tonal-a30": "var(--surface-tonal-tonal-a30)",
        "surface-tonal-tonal-a40": "var(--surface-tonal-tonal-a40)",
        "surface-tonal-tonal-a50": "var(--surface-tonal-tonal-a50)",
      },
      fontFamily: {
        h0: "var(--h0-font-family)",
        h00: "var(--h00-font-family)",
        "heading-h1": "var(--heading-h1-font-family)",
        "heading-h2": "var(--heading-h2-font-family)",
        "heading-h3": "var(--heading-h3-font-family)",
        "heading-h4": "var(--heading-h4-font-family)",
        "heading-h5": "var(--heading-h5-font-family)",
        "heading-h6": "var(--heading-h6-font-family)",
        "heading-h7": "var(--heading-h7-font-family)",
        "heading-h8": "var(--heading-h8-font-family)",
        "IDE-1": "var(--IDE-1-font-family)",
        "IDE-2": "var(--IDE-2-font-family)",
        "IDE-3": "var(--IDE-3-font-family)",
        "IDE-4": "var(--IDE-4-font-family)",
        "paragraph-p1": "var(--paragraph-p1-font-family)",
        "paragraph-p2": "var(--paragraph-p2-font-family)",
        "paragraph-p3": "var(--paragraph-p3-font-family)",
        "paragraph-p4": "var(--paragraph-p4-font-family)",
        "paragraph-p5": "var(--paragraph-p5-font-family)",
        "paragraph-p6": "var(--paragraph-p6-font-family)",
        "paragraph-p7": "var(--paragraph-p7-font-family)",
        "paragraph-p8": "var(--paragraph-p8-font-family)",
        "paragraph-p9": "var(--paragraph-p9-font-family)",
      },
    },
  },
  plugins: [],
};
```

## File: src/tailwind.css.txt

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  button,
  input,
  select,
  textarea {
    @apply appearance-none bg-transparent border-0 outline-none;
  }
}

@tailwind components;
@tailwind utilities;

@layer components {
  .all-\[unset\] {
    all: unset;
  }
}

:root {
  --h0-font-family: "SFU Futura", Helvetica;
  --h0-font-size: 80px;
  --h0-font-style: normal;
  --h0-font-weight: 800;
  --h0-letter-spacing: 0px;
  --h0-line-height: normal;
  --h00-font-family: "SFU Futura", Helvetica;
  --h00-font-size: 60px;
  --h00-font-style: normal;
  --h00-font-weight: 800;
  --h00-letter-spacing: 0px;
  --h00-line-height: normal;
  --heading-h1-font-family: "SFU Futura", Helvetica;
  --heading-h1-font-size: 40px;
  --heading-h1-font-style: normal;
  --heading-h1-font-weight: 700;
  --heading-h1-letter-spacing: 0px;
  --heading-h1-line-height: normal;
  --heading-h2-font-family: "SFU Futura", Helvetica;
  --heading-h2-font-size: 36px;
  --heading-h2-font-style: normal;
  --heading-h2-font-weight: 700;
  --heading-h2-letter-spacing: 0px;
  --heading-h2-line-height: normal;
  --heading-h3-font-family: "SFU Futura", Helvetica;
  --heading-h3-font-size: 32px;
  --heading-h3-font-style: normal;
  --heading-h3-font-weight: 700;
  --heading-h3-letter-spacing: 0px;
  --heading-h3-line-height: normal;
  --heading-h4-font-family: "SFU Futura", Helvetica;
  --heading-h4-font-size: 28px;
  --heading-h4-font-style: normal;
  --heading-h4-font-weight: 700;
  --heading-h4-letter-spacing: 0px;
  --heading-h4-line-height: normal;
  --heading-h5-font-family: "SFU Futura", Helvetica;
  --heading-h5-font-size: 24px;
  --heading-h5-font-style: normal;
  --heading-h5-font-weight: 700;
  --heading-h5-letter-spacing: 0px;
  --heading-h5-line-height: normal;
  --heading-h6-font-family: "SFU Futura", Helvetica;
  --heading-h6-font-size: 20px;
  --heading-h6-font-style: normal;
  --heading-h6-font-weight: 700;
  --heading-h6-letter-spacing: 0px;
  --heading-h6-line-height: normal;
  --heading-h7-font-family: "SFU Futura", Helvetica;
  --heading-h7-font-size: 16px;
  --heading-h7-font-style: normal;
  --heading-h7-font-weight: 700;
  --heading-h7-letter-spacing: 0px;
  --heading-h7-line-height: normal;
  --heading-h8-font-family: "SFU Futura", Helvetica;
  --heading-h8-font-size: 12px;
  --heading-h8-font-style: normal;
  --heading-h8-font-weight: 700;
  --heading-h8-letter-spacing: 0px;
  --heading-h8-line-height: normal;
  --IDE-1-font-family: "JetBrains Mono", Helvetica;
  --IDE-1-font-size: 20px;
  --IDE-1-font-style: normal;
  --IDE-1-font-weight: 400;
  --IDE-1-letter-spacing: 0px;
  --IDE-1-line-height: normal;
  --IDE-2-font-family: "JetBrains Mono", Helvetica;
  --IDE-2-font-size: 18px;
  --IDE-2-font-style: normal;
  --IDE-2-font-weight: 400;
  --IDE-2-letter-spacing: 0px;
  --IDE-2-line-height: normal;
  --IDE-3-font-family: "JetBrains Mono", Helvetica;
  --IDE-3-font-size: 16px;
  --IDE-3-font-style: normal;
  --IDE-3-font-weight: 400;
  --IDE-3-letter-spacing: 0px;
  --IDE-3-line-height: normal;
  --IDE-4-font-family: "JetBrains Mono", Helvetica;
  --IDE-4-font-size: 14px;
  --IDE-4-font-style: normal;
  --IDE-4-font-weight: 400;
  --IDE-4-letter-spacing: 0px;
  --IDE-4-line-height: normal;
  --neutral-neutral-a100: rgba(217, 226, 236, 1);
  --neutral-neutral-a200: rgba(188, 204, 220, 1);
  --neutral-neutral-a300: rgba(159, 179, 200, 1);
  --neutral-neutral-a400: rgba(130, 154, 177, 1);
  --neutral-neutral-a50: rgba(240, 244, 248, 1);
  --neutral-neutral-a500: rgba(98, 125, 152, 1);
  --neutral-neutral-a600: rgba(72, 101, 129, 1);
  --neutral-neutral-a700: rgba(51, 78, 104, 1);
  --neutral-neutral-a800: rgba(36, 59, 83, 1);
  --neutral-neutral-a900: rgba(16, 42, 67, 1);
  --paragraph-p1-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p1-font-size: 40px;
  --paragraph-p1-font-style: normal;
  --paragraph-p1-font-weight: 400;
  --paragraph-p1-letter-spacing: 0px;
  --paragraph-p1-line-height: normal;
  --paragraph-p2-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p2-font-size: 36px;
  --paragraph-p2-font-style: normal;
  --paragraph-p2-font-weight: 400;
  --paragraph-p2-letter-spacing: 0px;
  --paragraph-p2-line-height: normal;
  --paragraph-p3-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p3-font-size: 32px;
  --paragraph-p3-font-style: normal;
  --paragraph-p3-font-weight: 400;
  --paragraph-p3-letter-spacing: 0px;
  --paragraph-p3-line-height: normal;
  --paragraph-p4-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p4-font-size: 28px;
  --paragraph-p4-font-style: normal;
  --paragraph-p4-font-weight: 400;
  --paragraph-p4-letter-spacing: 0px;
  --paragraph-p4-line-height: normal;
  --paragraph-p5-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p5-font-size: 24px;
  --paragraph-p5-font-style: normal;
  --paragraph-p5-font-weight: 400;
  --paragraph-p5-letter-spacing: 0px;
  --paragraph-p5-line-height: normal;
  --paragraph-p6-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p6-font-size: 20px;
  --paragraph-p6-font-style: normal;
  --paragraph-p6-font-weight: 400;
  --paragraph-p6-letter-spacing: 0px;
  --paragraph-p6-line-height: normal;
  --paragraph-p7-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p7-font-size: 16px;
  --paragraph-p7-font-style: normal;
  --paragraph-p7-font-weight: 400;
  --paragraph-p7-letter-spacing: 0px;
  --paragraph-p7-line-height: normal;
  --paragraph-p8-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p8-font-size: 14px;
  --paragraph-p8-font-style: normal;
  --paragraph-p8-font-weight: 400;
  --paragraph-p8-letter-spacing: 0px;
  --paragraph-p8-line-height: normal;
  --paragraph-p9-font-family: "UTM Neo Sans Intel", Helvetica;
  --paragraph-p9-font-size: 12px;
  --paragraph-p9-font-style: normal;
  --paragraph-p9-font-weight: 400;
  --paragraph-p9-letter-spacing: 0px;
  --paragraph-p9-line-height: normal;
  --primary-primary-a0: rgba(26, 58, 138, 1);
  --primary-primary-a10: rgba(45, 82, 181, 1);
  --primary-primary-a20: rgba(59, 107, 223, 1);
  --primary-primary-a30: rgba(85, 128, 237, 1);
  --primary-primary-a40: rgba(120, 153, 245, 1);
  --primary-primary-a50: rgba(161, 184, 251, 1);
  --primary-primary-a60: rgba(201, 214, 253, 1);
  --secondary-secondary-a10: rgba(224, 242, 255, 1);
  --secondary-secondary-a30: rgba(189, 224, 255, 1);
  --secondary-secondary-a50: rgba(133, 196, 255, 1);
  --secondary-secondary-a70: rgba(76, 163, 255, 1);
  --secondary-secondary-a90: rgba(26, 136, 255, 1);
  --status-danger-danger-a0: rgba(214, 61, 61, 1);
  --status-danger-danger-a10: rgba(224, 108, 108, 1);
  --status-danger-danger-a20: rgba(234, 153, 153, 1);
  --status-discovery-discovery-a10: rgba(153, 255, 240, 1);
  --status-discovery-discovery-a30: rgba(92, 245, 215, 1);
  --status-discovery-discovery-a50: rgba(46, 234, 189, 1);
  --status-discovery-discovery-a70: rgba(0, 214, 177, 1);
  --status-discovery-discovery-a90: rgba(0, 163, 123, 1);
  --status-info-info-a0: rgba(26, 58, 138, 1);
  --status-info-info-a10: rgba(59, 107, 223, 1);
  --status-info-info-a20: rgba(120, 153, 245, 1);
  --status-success-success-a0: rgba(0, 214, 143, 1);
  --status-success-success-a10: rgba(51, 224, 168, 1);
  --status-success-success-a20: rgba(119, 234, 196, 1);
  --status-warning-warning-a0: rgba(214, 158, 0, 1);
  --status-warning-warning-a10: rgba(230, 184, 51, 1);
  --status-warning-warning-a20: rgba(240, 208, 119, 1);
  --surface-surface-a0: rgba(10, 14, 21, 1);
  --surface-surface-a10: rgba(29, 33, 40, 1);
  --surface-surface-a20: rgba(50, 54, 60, 1);
  --surface-surface-a30: rgba(72, 76, 82, 1);
  --surface-surface-a40: rgba(96, 99, 104, 1);
  --surface-surface-a50: rgba(120, 123, 128, 1);
  --surface-tonal-tonal-a0: rgba(10, 18, 34, 1);
  --surface-tonal-tonal-a10: rgba(29, 37, 53, 1);
  --surface-tonal-tonal-a20: rgba(50, 58, 73, 1);
  --surface-tonal-tonal-a30: rgba(72, 80, 93, 1);
  --surface-tonal-tonal-a40: rgba(96, 102, 115, 1);
  --surface-tonal-tonal-a50: rgba(120, 126, 137, 1);
}

:root {
  --animate-spin: spin 1s linear infinite;
}

.animate-fade-in {
  animation: fade-in 1s var(--animation-delay, 0s) ease forwards;
}

.animate-fade-up {
  animation: fade-up 1s var(--animation-delay, 0s) ease forwards;
}

.animate-marquee {
  animation: marquee var(--duration) infinite linear;
}

.animate-marquee-vertical {
  animation: marquee-vertical var(--duration) linear infinite;
}

.animate-shimmer {
  animation: shimmer 8s infinite;
}

.animate-spin {
  animation: var(--animate-spin);
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes image-glow {
  0% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.74, 0.25, 0.76, 1);
  }

  10% {
    opacity: 0.7;
    animation-timing-function: cubic-bezier(0.12, 0.01, 0.08, 0.99);
  }

  to {
    opacity: 0.4;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes shimmer {
  0%,
  90%,
  to {
    background-position: calc(-100% - var(--shimmer-width)) 0;
  }

  30%,
  60% {
    background-position: calc(100% + var(--shimmer-width)) 0;
  }
}

@keyframes marquee {
  0% {
    transform: translate(0);
  }

  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }

  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
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

## File: src/components/ui/Button.tsx

```typescript
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isProcessing?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isProcessing = false,
  disabled,
  className = '',
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEffectiveDisabled = disabled || isProcessing;

  let stateWrapperClass = '';
  let stateTextClass = '';

  if (isProcessing) {
    stateWrapperClass =
      'bg-info-a0 border-primary-a0 border-dashed cursor-not-allowed';
    stateTextClass = 'text-secondary-a30';
  } else if (isHovered) {
    stateWrapperClass = 'bg-info-a20 border-primary-a20 cursor-pointer';
    stateTextClass = 'text-secondary-a10';
  } else {
    stateWrapperClass = 'bg-tonal-a20 border-secondary-a70 cursor-pointer';
    stateTextClass = 'text-secondary-a70';
  }

  const commonWrapperClass =
    'flex items-center justify-center relative w-full flex-[0_0_auto] border border-solid transition-all duration-200';

  const finalWrapperClass = twMerge(
    commonWrapperClass,
    'p-2.5 rounded-[10px] gap-2.5 h2',
    stateWrapperClass,
    className,
  );

  const finalTextClass = `relative w-fit mt-[-1.00px] ${stateTextClass}`;

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEffectiveDisabled) {
      setIsHovered(true);
    }
    if (onMouseEnter) {
      onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEffectiveDisabled) {
      setIsHovered(false);
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  };

  return (
    <button
      type="button"
      className={finalWrapperClass}
      disabled={isEffectiveDisabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={`${finalTextClass} text-inherit`}>{children}</span>
    </button>
  );
};
```

## File: src/components/ui/Logo.tsx

```typescript
export const Logo = (): JSX.Element => {
  return (
    <svg
      width="137"
      height="109"
      viewBox="0 0 137 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddddd_4167_2651)">
        <path
          d="M42.0754 104.147C42.073 104.147 42.0701 104.146 42.0676 104.146C45.7489 104.144 49.4302 104.141 53.1116 104.138C49.4328 104.141 45.7541 104.145 42.0754 104.147ZM126.047 37.0048C129.165 37.0052 131.485 38.8869 131.992 41.8739C132.111 42.5706 132.105 43.3002 132.106 44.0146C132.124 61.7872 132.135 79.5603 132.148 97.3329C132.151 101.74 130.009 104.141 126.033 104.142C124.788 104.142 123.543 104.141 122.297 104.141C126.088 104.129 128.129 101.858 128.126 97.6952C128.114 80.8678 128.104 64.0402 128.087 47.2128C128.086 46.5365 128.092 45.8459 127.979 45.1864C127.492 42.3583 125.269 40.5775 122.282 40.5771C108.922 40.5758 95.5616 40.5761 82.2014 40.5761V40.6444C68.8414 40.6444 55.4814 40.6457 42.1213 40.6444C38.4183 40.644 36.3526 42.881 36.3167 46.9315C36.3161 45.9 36.3151 44.8684 36.3147 43.8368C36.3128 39.4833 38.4744 37.0768 42.3752 37.0771C56.3204 37.0783 70.266 37.0771 84.2112 37.0771V37.0048C98.1564 37.0048 112.102 37.0035 126.047 37.0048ZM41.344 85.4706C41.5669 85.9647 42.2304 85.87 42.7327 85.87C55.3816 85.8717 68.031 85.8681 80.6799 85.8651C80.7092 85.9457 80.7252 86.0381 80.7219 86.1444C80.7087 86.5712 80.4313 86.7964 80.0501 86.83C79.8677 86.8459 79.6833 86.8378 79.5002 86.8378C67.1549 86.8407 54.8085 86.8443 42.4631 86.8427C41.8681 86.8427 41.0369 86.9794 41.0598 86.0302C41.0677 85.7119 41.1804 85.5494 41.344 85.4706Z"
          fill="#00D6B1"
        />
        <path
          d="M62.0854 61.0312L51.9573 77.4952H50.6373L49.2693 70.2472C47.7573 72.6712 46.2453 75.0712 44.7573 77.4952H43.4373L40.3653 61.0312H43.9653L45.8133 71.8552L48.6933 67.1752L47.5653 61.0312H51.1653L53.0133 71.8552C55.2213 68.2792 57.5013 64.6072 59.6613 61.0312H62.0854ZM44.8533 73.3912L45.2853 72.7192L43.4133 62.1832H42.8853L44.8533 73.3912ZM50.6133 62.1832H50.0853L52.0533 73.3912L52.4613 72.8392L50.6133 62.1832ZM61.2176 77.4952L61.7456 74.9272H64.2416L63.7136 77.4952H61.2176ZM61.3376 74.9272L60.8096 77.4952H60.2576L60.7856 74.9272H61.3376ZM77.2292 77.4952H65.2292L68.7092 61.0312H78.8852L79.1012 62.1832H72.0212L70.7732 68.0392H76.5092L76.2692 69.1912H70.5332L69.0212 76.3432H77.4692L77.2292 77.4952ZM70.9172 62.1832L67.9172 76.3432H68.4452L71.4452 62.1832H70.9172ZM79.3348 77.4952L79.8628 74.9272H82.3588L81.8308 77.4952H79.3348ZM79.4548 74.9272L78.9268 77.4952H78.3748L78.9028 74.9272H79.4548ZM95.7063 77.4952H83.3463L86.8263 61.0312H98.5863L95.2743 68.6392H95.2503C95.3943 71.5672 95.5383 74.5672 95.7063 77.4952ZM92.8743 69.2872H88.5303L87.0423 76.3432H93.2343C93.1143 74.1352 92.9703 71.4952 92.8743 69.2872ZM90.0423 62.1832L88.7703 68.1832H93.1623L95.6343 62.1832H90.0423ZM89.0103 62.1832L86.0103 76.3432H86.4423L89.4423 62.1832H89.0103ZM97.8738 77.4952L98.4018 74.9272H100.898L100.37 77.4952H97.8738ZM97.9938 74.9272L97.4658 77.4952H96.9138L97.4418 74.9272H97.9938ZM108.389 61.0552H108.989L105.749 76.3432H110.765L114.005 61.0552H114.629C114.605 61.0552 112.469 71.2312 111.389 76.3432H111.917L115.157 61.0552H117.653L114.173 77.4952H101.885L105.365 61.0552H107.861L104.621 76.3432H105.149L108.389 61.0552Z"
          fill="#2EEABD"
        />
        <rect
          x="35.9692"
          y="85.4736"
          width="44.5457"
          height="1.61738"
          rx="0.808692"
          fill="#2EEABD"
        />
        <path
          d="M89.1735 4.70915C92.9841 3.19941 96.0019 4.76812 97.3298 8.9777C100.082 17.7036 102.825 26.4333 105.57 35.1623C105.961 36.4063 105.961 36.4371 104.764 36.4377C102.296 28.4152 99.8294 20.3919 97.3542 12.3722C96.1024 8.31655 93.2578 6.80558 89.6657 8.25993C76.2777 13.6812 62.8939 19.1178 49.4987 24.5168C37.6278 29.3012 25.7429 34.0427 13.865 38.8049C13.0136 39.1463 12.167 39.4966 11.4509 40.1506C9.52387 41.9097 9.01143 44.4119 10.0027 47.55C13.2437 57.8106 16.506 68.063 19.7497 78.3224C21.7875 84.7677 23.7835 91.2296 25.8444 97.6652C26.4816 99.6548 27.508 100.977 28.82 101.597C25.4119 102.79 22.7308 101.34 21.4743 97.5011C19.2882 90.8219 17.171 84.1152 15.0095 77.4259C11.5687 66.778 8.10863 56.1377 4.67062 45.4884C3.61899 42.2313 4.16255 39.6336 6.20675 37.8078C6.96631 37.1292 7.86427 36.7657 8.7673 36.4113C21.367 31.4688 33.9739 26.5478 46.5661 21.5822C60.7753 15.9787 74.972 10.3357 89.1735 4.70915Z"
          fill="#5CF5D7"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddddd_4167_2651"
          x="1.66893e-05"
          y="1.66893e-05"
          width="136.295"
          height="108.295"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.0864" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.77922 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.1728" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.77922 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4167_2651"
            result="effect2_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.6048" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.77922 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4167_2651"
            result="effect3_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.2096" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.639216 0 0 0 0 0.482353 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4167_2651"
            result="effect4_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.0736" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.639216 0 0 0 0 0.482353 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_4167_2651"
            result="effect5_dropShadow_4167_2651"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect5_dropShadow_4167_2651"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
```

## File: src/components/ui/Logo2.tsx

```typescript
export const Logo2 = (): JSX.Element => {
  return (
    <svg
      width="153"
      height="121"
      viewBox="0 0 153 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddddd_4167_2651)">
        <path
          d="M46.8157 116.147C46.8127 116.147 46.8098 116.146 46.8069 116.146C53.0994 116.141 59.3923 116.131 65.6848 116.13C59.3953 116.132 53.1051 116.143 46.8157 116.147ZM141.284 40.9478C144.792 40.9483 147.402 43.0555 147.974 46.401C148.107 47.1811 148.1 47.9985 148.101 48.7984C148.121 68.7037 148.134 88.609 148.148 108.514C148.151 113.451 145.742 116.14 141.269 116.14C139.869 116.14 138.469 116.139 137.07 116.139C141.332 116.125 143.628 113.581 143.624 108.92C143.611 90.0738 143.599 71.2271 143.579 52.3804C143.579 51.623 143.585 50.8496 143.457 50.1109C142.91 46.9434 140.409 44.9483 137.049 44.9478C122.019 44.9465 106.988 44.9478 91.9583 44.9478V45.024C76.9283 45.024 61.8984 45.0254 46.8684 45.024C42.6999 45.0235 40.3747 47.5319 40.3372 52.0738C40.3366 50.9156 40.3367 49.7574 40.3362 48.5992C40.334 43.7231 42.7659 41.0274 47.1545 41.0279C62.8427 41.0294 78.5308 41.0279 94.219 41.0279V40.9469C109.907 40.9469 125.596 40.9464 141.284 40.9478ZM45.9934 95.2281C46.2438 95.7825 46.9905 95.6763 47.5559 95.6763C61.7862 95.6782 76.017 95.6738 90.2473 95.6705C90.2802 95.7608 90.2979 95.8647 90.2942 95.984C90.2793 96.4621 89.9665 96.7141 89.5374 96.7515C89.3323 96.7693 89.1251 96.7603 88.9192 96.7603C75.0308 96.7635 61.1416 96.767 47.2532 96.7652C46.5837 96.7652 45.648 96.9188 45.6741 95.8551C45.683 95.4986 45.8093 95.3163 45.9934 95.2281Z"
          fill="#00D6B1"
        />
        <path
          d="M68.4563 67.8085L56.6403 87.0165H55.1003L53.5043 78.5605C51.7403 81.3885 49.9763 84.1885 48.2403 87.0165H46.7003L43.1163 67.8085H47.3163L49.4723 80.4365L52.8323 74.9765L51.5163 67.8085H55.7163L57.8723 80.4365C60.4483 76.2645 63.1083 71.9805 65.6283 67.8085H68.4563ZM48.3523 82.2285L48.8563 81.4445L46.6723 69.1525H46.0563L48.3523 82.2285ZM55.0723 69.1525H54.4563L56.7523 82.2285L57.2283 81.5845L55.0723 69.1525ZM67.4439 87.0165L68.0599 84.0205H70.9719L70.3559 87.0165H67.4439ZM67.5839 84.0205L66.9679 87.0165H66.3239L66.9399 84.0205H67.5839ZM86.124 87.0165H72.124L76.184 67.8085H88.056L88.308 69.1525H80.048L78.592 75.9845H85.284L85.004 77.3285H78.312L76.548 85.6725H86.404L86.124 87.0165ZM78.76 69.1525L75.26 85.6725H75.876L79.376 69.1525H78.76ZM88.5806 87.0165L89.1966 84.0205H92.1086L91.4926 87.0165H88.5806ZM88.7206 84.0205L88.1046 87.0165H87.4606L88.0766 84.0205H88.7206ZM107.681 87.0165H93.2608L97.3208 67.8085H111.041L107.177 76.6845H107.149C107.317 80.1005 107.485 83.6005 107.681 87.0165ZM104.377 77.4405H99.3088L97.5728 85.6725H104.797C104.657 83.0965 104.489 80.0165 104.377 77.4405ZM101.073 69.1525L99.5888 76.1525H104.713L107.597 69.1525H101.073ZM99.8688 69.1525L96.3688 85.6725H96.8728L100.373 69.1525H99.8688ZM110.21 87.0165L110.826 84.0205H113.738L113.122 87.0165H110.21ZM110.35 84.0205L109.734 87.0165H109.09L109.706 84.0205H110.35ZM122.478 67.8365H123.178L119.398 85.6725H125.25L129.03 67.8365H129.758C129.73 67.8365 127.238 79.7085 125.978 85.6725H126.594L130.374 67.8365H133.286L129.226 87.0165H114.89L118.95 67.8365H121.862L118.082 85.6725H118.698L122.478 67.8365Z"
          fill="#2EEABD"
        />
        <rect
          x="41.2964"
          y="95.2323"
          width="49.8912"
          height="1.81147"
          rx="0.905735"
          fill="#2EEABD"
        />
        <path
          d="M99.8025 4.77636C104.089 3.08578 107.483 4.84294 108.977 9.55761C112.074 19.3305 115.16 29.1075 118.248 38.8838C118.688 40.2771 118.688 40.3118 117.342 40.3125C114.565 31.3272 111.789 22.3415 109.005 13.3594C107.596 8.81682 104.396 7.12393 100.355 8.75292C85.2937 14.8247 70.2373 20.9141 55.1678 26.9609C41.8129 32.3195 28.4426 37.6302 15.0799 42.9639C14.1221 43.3463 13.1696 43.7383 12.364 44.4707C10.196 46.441 9.61982 49.244 10.7351 52.7588C14.3814 64.2507 18.0508 75.7332 21.7 87.2236C23.9925 94.4424 26.2379 101.68 28.5564 108.888C29.2733 111.116 30.4286 112.597 31.9051 113.291C28.0706 114.627 25.054 113.004 23.6404 108.704C21.181 101.223 18.7987 93.7119 16.367 86.2197C12.496 74.294 8.60389 62.3764 4.73611 50.4492C3.55309 46.8014 4.16421 43.8926 6.46365 41.8476C7.31822 41.0874 8.32943 40.6802 9.34549 40.2832C23.5201 34.7476 37.7027 29.2353 51.8689 23.6738C67.8541 17.398 83.8258 11.0781 99.8025 4.77636Z"
          fill="#5CF5D7"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddddd_4167_2651"
          x="1.66893e-05"
          y="-0.000227451"
          width="152.295"
          height="120.295"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.0864" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.77922 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.1728" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.77922 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_4167_2651"
            result="effect2_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.6048" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.77922 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_4167_2651"
            result="effect3_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.2096" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.639216 0 0 0 0 0.482353 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_4167_2651"
            result="effect4_dropShadow_4167_2651"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.0736" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.639216 0 0 0 0 0.482353 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_4167_2651"
            result="effect5_dropShadow_4167_2651"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect5_dropShadow_4167_2651"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo2;
```

## File: src/vite-env.d.ts

```typescript
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

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
  --color-success-a0: #00d68f;
  --color-success-a10: #33e0a8;
  --color-success-a20: #77eac4;
  --color-warning-a0: #d69e00;
  --color-warning-a10: #e6b833;
  --color-warning-a20: #f0d077;
  --color-danger-a0: #d63d3d;
  --color-danger-a10: #e06c6c;
  --color-danger-a20: #ea9999;
  --color-info-a0: #1a3a8a;
  --color-info-a10: #3b6bdf;
  --color-info-a20: #7899f5;
  --color-discovery-a10: #99fff0;
  --color-discovery-a30: #5cf5d7;
  --color-discovery-a50: #2eeabd;
  --color-discovery-a70: #00d6b1;
  --color-discovery-a90: #00a37b;

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

  /* --- Animations --- */
  --animate-fade-in: fade-in 1s var(--animation-delay, 0s) ease forwards;
  --animate-fade-up: fade-up 1s var(--animation-delay, 0s) ease forwards;
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
  --animate-shimmer: shimmer 8s infinite;
  --animate-spin: spin 1s linear infinite;

  /* --- Keyframes --- */
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes image-glow {
    0% {
      opacity: 0;
      animation-timing-function: cubic-bezier(0.74, 0.25, 0.76, 1);
    }
    10% {
      opacity: 0.7;
      animation-timing-function: cubic-bezier(0.12, 0.01, 0.08, 0.99);
    }
    to {
      opacity: 0.4;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fade-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes shimmer {
    0%,
    90%,
    to {
      background-position: calc(-100% - var(--shimmer-width)) 0;
    }
    30%,
    60% {
      background-position: calc(100% + var(--shimmer-width)) 0;
    }
  }
  @keyframes marquee {
    0% {
      transform: translate(0);
    }
    to {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }
  @keyframes marquee-vertical {
    0% {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - var(--gap)));
    }
  }
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

@font-face {
  font-family: 'Nadoor';
  src: url('/fonts/NADOORBOLDITALIC.OTF') format('opentype');
  font-weight: 700;
  font-style: italic;
}

/* =========================================
  BASE STYLES
========================================= */
@layer base {
  button,
  input,
  select,
  textarea {
    appearance: none;
    background-color: transparent;
    border-width: 0;
    outline: none;
  }
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

@utility all-unset {
  all: unset;
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

## File: src/pages/Home.tsx

```typescript
import React from 'react';
import { Logo2 } from '@/components/ui/Logo2';
import { Button } from '@/components/ui/Button';
import HomePageImage from '@/assets/HomePageImage.png';
import { useNavigate } from 'react-router-dom';

export const Home = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <header className="self-stretch flex flex-row justify-start gap-10">
        <Logo2 />
        <span className="text-discovery-a50 h4 font-['Nadoor'] font-bold italic tracking-normal py-14">
          W.E.B.U - Web Engineering of BackKhoa University
        </span>
      </header>

      <main className="self-stretch flex flex-row">
        <div className="flex-1 flex flex-col justify-center items-start gap-4 my-12">
          <h1 className="text-neutral-a50 h1 font-extrabold font-['SFU_Futura'] tracking-normal leading-tight uppercase my-10">
            LEARN CODE BY FLASHCARD
          </h1>
          <div className="text-neutral-a50 h6 font-bold font-['SFU_Futura'] tracking-normal opacity-90 italic flex flex-col gap-5">
            <span>Get personalized learning track </span>
            <span>Remind you everyday</span>
          </div>

          <div className="w-auto my-10">
            <Button
              className="px-10 py-2.5 rounded-[20px] outline -outline-offset-1 outline-secondary-a90 h4"
              onClick={() => {
                // const signedUp = localStorage.getItem('isSignedUp'); (chưa làm)
                const signedUp = false;
                navigate(signedUp ? '/signup' : '/dashboard');
              }}
            >
              Get Started →
            </Button>
          </div>

          <button
            type="button"
            className="text-neutral-a50 text-xl font-bold font-['SFU_Futura'] underline cursor-pointer hover:text-secondary-a50 transition-colors opacity-40"
          >
            About US
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={HomePageImage}
            alt="Home Page"
            className="w-full h-auto max-w-full object-contain"
          />
        </div>{' '}
      </main>

      <footer className="self-stretch flex justify-center items-center gap-32 border-t border-solid border-tonal-a20 pt-8 overflow-hidden">
        <div className="w-44 h-24 flex justify-start items-center gap-5">
          <div className="w-4 h-3 bg-neutral-a50 rounded-sm" />
          <span className="text-neutral-a50 text-xs font-normal font-['UTM_Neo_Sans_Intel'] whitespace-nowrap">
            discord.gg/webu
          </span>
        </div>

        <div className="w-44 h-24 flex justify-start items-center gap-5">
          <div className="w-5 h-4 bg-neutral-a50 rounded-sm" />
          <span className="text-neutral-a50 text-xs font-normal font-['UTM_Neo_Sans_Intel'] whitespace-nowrap">
            webu@gmail.com
          </span>
        </div>

        <div className="w-44 h-24 flex justify-start items-center gap-5">
          <div className="w-2.5 h-4 bg-neutral-a50 rounded-sm" />
          <span className="text-neutral-a50 text-xs font-normal font-['UTM_Neo_Sans_Intel'] whitespace-nowrap">
            facebook.com/webu
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
```

## File: vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
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
    "react-router-dom": "^6.26.2",
    "tailwind-merge": "^3.6.0"
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
    "plop": "^4.0.5",
    "postcss": "^8.5.15",
    "prettier": "^3.3.3",
    "tailwindcss": "^4.3.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.7.0",
    "vite": "^5.4.8",
    "vite-plugin-svgr": "^5.2.0"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md,html}": ["prettier --write"]
  }
}
```
