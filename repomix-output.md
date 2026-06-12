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
src/components/ui/Button.tsx
src/components/ui/Logo.tsx
src/components/ui/Logo2.tsx
src/components/ui/MainNavigation.tsx
src/components/ui/Tab.tsx
src/components/ui/UserIcon.tsx
src/index.css
src/main.tsx
src/pages/Home.tsx
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

## File: src/components/ui/Button.tsx

```typescript
import React, { useState } from 'react';

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
    'flex items-center justify-center gap-2.5 p-2.5 relative w-full flex-[0_0_auto] rounded-[10px] border border-solid transition-all duration-200';
  const finalTextClass = `relative w-fit mt-[-1.00px] h2 ${stateTextClass}`;

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
      className={`${commonWrapperClass} ${stateWrapperClass} ${className}`.trim()}
      disabled={isEffectiveDisabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={finalTextClass}>{children}</span>
    </button>
  );
};
```

## File: src/components/ui/Logo.tsx

```typescript
import LogoItem1 from '@/assets/logo-item-1.svg?react';
import LogoItem2 from '@/assets/logo-item-2.svg?react';

export const Logo = (): JSX.Element => {
  return (
    <figure
      className="relative m-0 w-47.75 h-35"
      role="img"
      aria-label="W.E.B.U logo"
    >
      <LogoItem2
        className="absolute w-[74.87%] h-[67.14%] top-[32.86%] left-[25.13%] pointer-events-none select-none text-discovery-a50"
        aria-hidden="true"
      />

      <figcaption className="absolute h-[26.09%] top-[54.35%] left-[calc(50.00%-51px)] w-34.5 flex items-center aspect-[3.78] font-['Nadoor-BoldItalic',Helvetica] font-bold italic text-discovery-a50 text-[40px] leading-normal whitespace-nowrap">
        W.E.B.U
      </figcaption>

      <div
        className="absolute h-0.5 top-[81.33%] left-[calc(50.00%-41px)] w-15.5 bg-discovery-a50 rounded-[10px]"
        aria-hidden="true"
      />

      <LogoItem1
        className="absolute w-full h-full top-0 left-0 aspect-[1.11] pointer-events-none select-none text-discovery-a50"
        aria-hidden="true"
      />
    </figure>
  );
};

export default Logo;
```

## File: src/components/ui/Logo2.tsx

```typescript
import LogoItem1 from '@/assets/logo-2-item-1.svg?react';
import LogoItem2 from '@/assets/logo-2-item-2.svg?react';

export const Logo2 = (): JSX.Element => {
  return (
    <figure
      className="relative m-0 w-36 h-28 aspect-[1.28]"
      role="img"
      aria-label="W.E.B.U logo"
    >
      <LogoItem2
        className="absolute w-[74.87%] h-[67.14%] top-[32.86%] left-[25.13%] pointer-events-none select-none text-discovery-a50"
        aria-hidden="true"
      />

      <figcaption className="absolute h-[26.09%] top-[54.35%] left-[calc(50.00%-38px)] w-27.5 flex items-center aspect-[3.78] font-['Nadoor-BoldItalic',Helvetica] font-bold italic text-discovery-a50 text-[28px] tracking-normal leading-[normal] whitespace-nowrap">
        W.E.B.U
      </figcaption>

      <div
        className="absolute h-0.5 top-[81.33%] left-[calc(50.00%-35px)] w-12.5 bg-discovery-a50 rounded-[10px] aspect-[27.54]"
        aria-hidden="true"
      />

      <LogoItem1
        className="absolute w-full h-full top-0 left-0 aspect-[1.04] pointer-events-none select-none text-discovery-a50"
        aria-hidden="true"
      />
    </figure>
  );
};

export default Logo2;
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
/// <reference types="vite-plugin-svgr/client" />
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
