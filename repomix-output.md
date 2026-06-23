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
.agents/skills/webu-rules/SKILL.md
.github/workflows/ci.yml
.gitignore
.prettierignore
.prettierrc
eslint.config.js
index.html
package.json
README.md
repomix.config.json
signup_signin_form.html
src/api/apiClient.ts
src/api/userService.ts
src/App.tsx
src/components/dashboard/Problem.tsx
src/components/dashboard/Suggest.tsx
src/components/notebook/MockData.tsx
src/components/notebook/NotebookFilter.tsx
src/components/notebook/NotebookHeader.tsx
src/components/notebook/NotebookProblem.tsx
src/components/notebook/Pagination.tsx
src/components/problem/ProblemFilter.tsx
src/components/problem/problemMockData.tsx
src/components/problem/ProblemTable.tsx
src/components/ui/Button.tsx
src/components/ui/ChipBoard.tsx
src/components/ui/ChipItem.tsx
src/components/ui/ExpandIcon.tsx
src/components/ui/Logo.tsx
src/components/ui/Logo2.tsx
src/components/ui/MainNavigation.tsx
src/components/ui/SelectDropdown.tsx
src/components/ui/Sign.tsx
src/components/ui/Tab.tsx
src/components/ui/UserIcon.tsx
src/index.css
src/main.tsx
src/pages/CodeDescription.tsx
src/pages/CodeEditorSection.tsx
src/pages/CreateProblem.tsx
src/pages/Dashboard.tsx
src/pages/ForgetPassword.tsx
src/pages/Home.tsx
src/pages/Ide.tsx
src/pages/Notebook.tsx
src/pages/Problem.tsx
src/pages/ProblemTabsSection.tsx
src/pages/SignIn.tsx
src/pages/SignUp.tsx
src/pages/Survey.tsx
src/pages/TopNavigationSection.tsx
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

## File: src/components/ui/Sign.tsx

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Tab from '@/components/ui/Tab';

interface SignProps {
  activeTab: 'signup' | 'signin';
  onActionClick?: () => void;
}

export const Sign = ({ activeTab, onActionClick }: SignProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <Button onClick={onActionClick} className="w-fit px-12">
        {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
      </Button>

      <nav
        aria-label="Authentication pages"
        className="flex items-center justify-center gap-4 mt-6"
      >
        <Tab
          isActive={activeTab === 'signup'}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Tab>

        <Tab
          isActive={activeTab === 'signin'}
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Tab>
      </nav>
    </div>
  );
};

export default Sign;
```

## File: .agents/skills/webu-rules/SKILL.md

```markdown
# Quy chuẩn Coding (Coding Rules & Conventions) - Dự án WEBU

Tài liệu này tổng hợp toàn bộ các quy chuẩn phát triển phần mềm (Frontend & Backend) được đúc kết từ file gốc [Rules.md](file:///c:/Users/DELL/Desktop/WEBU-backend/Rules.md). Mọi thành viên và trợ lý AI khi làm việc trên repository này đều phải tuân thủ nghiêm ngặt các quy tắc dưới đây.

---

## I. QUY CHUẨN BACKEND (BE)

### 1. Đặt tên file & thư mục (Kebab-Case)

> [!IMPORTANT]
> Vi phạm quy tắc này sẽ gây ra lỗi Build hoặc Lint (Error).

- **Thư mục** trong `src/` và **file code** (`.ts`, `.js`): Bắt buộc viết chữ thường, cách nhau bằng dấu gạch ngang (**kebab-case**).
  - _Đúng:_ `user-profile.controller.ts`, `database.config.ts`.
  - _Sai:_ `UserProfileController.ts`, `database_config.ts`.
- **Tên Class, DTO, Interface, Decorator:** Dùng **PascalCase** (Ví dụ: `UserController`, `CreateUserDto`).
- **Tên Biến, Hàm, Thuộc tính, Phương thức:** Dùng **camelCase** (Ví dụ: `findUserById`, `userId`).
- **Hằng số toàn cục (Constants):** Dùng **UPPER_SNAKE_CASE** (Ví dụ: `JWT_SECRET`).
- **Đặc biệt:** Khi map code, các thuộc tính DB có dấu gạch dưới như `_id` cần được đổi tên biến sang `id` khi sử dụng ở logic code.

### 2. Phân chia thư mục

- **Constants dùng chung:** Đặt trong `src/constants/` hoặc `src/common/constants/`.
- **Helper, Utility:** Đặt trong `src/utils/` hoặc `src/common/`.

### 3. Quy tắc TypeScript (BE)

- **Kiểu trả về của hàm (Warn):** Luôn khai báo kiểu dữ liệu trả về cho hàm chính.
  - _Đúng:_ `async getUser(id: string): Promise<User> { ... }`
  - _Ngoại lệ:_ Callback trong `.map()`, `.filter()`.
- **Hạn chế `any` (Warn):** Định nghĩa rõ ràng Interface/DTO. Tránh lạm dụng `any`.
- **Await Promise (Warn):** Mọi thao tác bất đồng bộ (Database, Promise) phải dùng `await` (hoặc `.then()`) để tránh floating promise.

### 4. Quy chuẩn Logic & Clean Code (BE)

- **Độ lồng nhau (Error):** Không lồng các khối lệnh (`if/else`, `for`, `try/catch`) quá **4 cấp**. Nếu quá 4 cấp bắt buộc phải refactor tách hàm nhỏ.
- **Toán tử so sánh (Error):** Luôn dùng `===` và `!==`. Cấm dùng `==` và `!=` (ngoại lệ: `== null` dùng để check cả `null` và `undefined`).
- **Biến không sử dụng (Warn):** Nếu khai báo biến để giữ chỗ mà không dùng, bắt buộc phải thêm dấu gạch dưới `_` ở đầu tên (Ví dụ: `_req`, `_temp`).
- **Console.log:** Xóa sạch `console.log()` trước khi commit. Khuyến khích dùng logger tích hợp của NestJS.

---

## II. QUY CHUẨN FRONTEND (FE)

### 1. Format & Layout UI

- Kích thước trang chuẩn: `1440 x 1024` và `1440 x 1024++`.
- **Padding** phải chia hết cho **4**.
- **Margin** biên mặc định: `120px`.
- Sử dụng Grid mặc định: `12 x Auto`.
- Sử dụng đúng typography có sẵn trong foundation (không tự ý chỉnh sửa font, màu, size khi không cần thiết).

### 2. Đặt tên file & thư mục (FE)

- **Component & Thư mục chứa Component:** Dùng **PascalCase** (Ví dụ: `Button.tsx`, `UserProfile.tsx`).
- **Non-component (.ts):** Dùng **camelCase** (Ví dụ: `useAuth.ts`, `formatDate.ts`).
- **Folder:** Dùng **kebab-case** (Ví dụ: `src/user-profile/`, `src/api-services/`).
- **CSS đi kèm:** Tên giống với component (Ví dụ: `Button.tsx` + `Button.css`).
- File đại diện cho thư mục: `index.ts` hoặc `index.tsx`.

### 3. Quy tắc React & TypeScript (FE)

- **Rules of Hooks:** Chỉ gọi hook ở top-level của component hoặc custom hook. Không đặt trong if/else/loop.
- **useEffect Dependency:** Luôn khai báo đầy đủ các dependencies mà hook sử dụng.
- **Key trong List:** Bắt buộc dùng **ID unique**, không dùng index của mảng làm key.
- **Button Type:** Luôn khai báo rõ `type="button"` cho nút bấm để tránh reload trang ngoài ý muốn (mặc định của trình duyệt là `submit`).
- **Semantic HTML:** Sử dụng các thẻ HTML5 có ý nghĩa (`<main>`, `<header>`, `<nav>`, `<button>`) thay vì lạm dụng thẻ `<div>`.

### 4. Styling (CSS)

- **BEM Naming:** Tuân thủ `.block__element--modifier` (Ví dụ: `.card__title`, `.card__btn--primary`).
- **Không inline style:** Chỉ sử dụng khi giá trị phụ thuộc vào runtime data (Ví dụ: thanh tiến trình `width: ${progress}%`).
- **CSS Variables:** Khai báo mã màu, spacing dùng chung trong `src/index.css` sử dụng `:root`.

### 5. Import & Export

- **Alias `@/`:** Luôn dùng alias `@/` cho absolute import (Ví dụ: `import Button from '@/components/ui/Button'`).
- **Thứ tự Import:**
  1.  Thư viện ngoài (React, NestJS, third-party).
  2.  Absolute import (`@/...`).
  3.  Relative import (`./...`, `../...`).
  4.  Tệp CSS (`import './Style.css'`).
- **Style Export:**
  - Component: `export default`.
  - Hook, util, type, constant: **named export** (`export const ...`).

---

## III. QUY TRÌNH GIT & CHECKLIST TRƯỚC KHI PUSH

### 1. Conventional Commits

Bắt buộc viết commit theo format: `<type>: <description>` bằng tiếng Anh.

- `feat`: Thêm tính năng mới.
- `fix`: Sửa lỗi.
- `chore`: Cấu hình, cài đặt thư viện.
- `docs`: Cập nhật tài liệu.
- `style`: Sửa format code.
- `refactor`: Cơ cấu lại code (không đổi logic).

_Ví dụ chuẩn:_ `feat: add login page`, `fix: correct button hover on chrome`.

### 2. Đặt tên Branch

Sử dụng kebab-case kèm prefix: `feat/login-page`, `fix/button-bug`, `chore/update-deps`.

### 3. Checklist trước khi Push

- [ ] Code đã chạy tốt ở local (`yarn dev` / `npm run dev`).
- [ ] Không còn tồn tại lệnh `console.log()` dư thừa.
- [ ] Đã chạy check và pass kiểm tra cú pháp (`yarn lint` / `npm run lint`).
- [ ] Đã chạy thử build và thành công (`yarn build` / `npm run build`).
- [ ] Giao diện đã được test tương thích thiết bị (Responsive).
- [ ] Tên branch và commit message đúng quy chuẩn.
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

## File: signup_signin_form.html

```html
<div
  style="
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #060d1f;
    border-radius: 12px;
    padding: 40px 20px;
  "
>
  <div style="width: 100%; max-width: 460px">
    <h2
      id="form-title"
      style="
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        color: #e8e8f0;
        margin: 0 0 32px;
        font-family: Georgia, serif;
        letter-spacing: 0.5px;
      "
    >
      Sign Up
    </h2>

    <div id="signup-form">
      <div style="margin-bottom: 16px">
        <input
          type="email"
          placeholder="Email"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            background: #111827;
            border: 1.5px solid #2563eb;
            border-radius: 6px;
            color: #c8ccd8;
            font-size: 14px;
            outline: none;
          "
          onfocus="this.style.borderColor = '#3b82f6'"
          onblur="this.style.borderColor = '#2563eb'"
        />
      </div>
      <div style="margin-bottom: 16px">
        <input
          type="text"
          placeholder="Username"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            background: #111827;
            border: 1.5px solid #1e3a6e;
            border-radius: 6px;
            color: #c8ccd8;
            font-size: 14px;
            outline: none;
          "
          onfocus="this.style.borderColor = '#3b82f6'"
          onblur="this.style.borderColor = '#1e3a6e'"
        />
      </div>
      <div style="margin-bottom: 16px">
        <input
          type="password"
          placeholder="Password"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            background: #111827;
            border: 1.5px solid #1e3a6e;
            border-radius: 6px;
            color: #c8ccd8;
            font-size: 14px;
            outline: none;
          "
          onfocus="this.style.borderColor = '#3b82f6'"
          onblur="this.style.borderColor = '#1e3a6e'"
        />
      </div>
      <div style="margin-bottom: 24px">
        <input
          type="password"
          placeholder="Confirm Password"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            background: #111827;
            border: 1.5px solid #1e3a6e;
            border-radius: 6px;
            color: #c8ccd8;
            font-size: 14px;
            outline: none;
          "
          onfocus="this.style.borderColor = '#3b82f6'"
          onblur="this.style.borderColor = '#1e3a6e'"
        />
      </div>
    </div>

    <div id="signin-form" style="display: none">
      <div style="margin-bottom: 16px">
        <input
          type="email"
          placeholder="Email"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            background: #111827;
            border: 1.5px solid #1e3a6e;
            border-radius: 6px;
            color: #c8ccd8;
            font-size: 14px;
            outline: none;
          "
          onfocus="this.style.borderColor = '#3b82f6'"
          onblur="this.style.borderColor = '#1e3a6e'"
        />
      </div>
      <div style="margin-bottom: 24px">
        <input
          type="password"
          placeholder="Password"
          style="
            width: 100%;
            box-sizing: border-box;
            padding: 12px 14px;
            background: #111827;
            border: 1.5px solid #1e3a6e;
            border-radius: 6px;
            color: #c8ccd8;
            font-size: 14px;
            outline: none;
          "
          onfocus="this.style.borderColor = '#3b82f6'"
          onblur="this.style.borderColor = '#1e3a6e'"
        />
      </div>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        gap: 0;
        justify-content: center;
      "
    >
      <button
        id="btn-signup"
        onclick="switchTo('signup')"
        style="
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 22px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: background 0.2s;
        "
      >
        Sign Up
      </button>
      <button
        id="btn-signin"
        onclick="switchTo('signin')"
        style="
          background: transparent;
          color: #94a3b8;
          border: none;
          padding: 10px 22px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        "
      >
        Sign In
      </button>
    </div>
  </div>
</div>

<script>
  function switchTo(page) {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const title = document.getElementById('form-title');
    const btnSignup = document.getElementById('btn-signup');
    const btnSignin = document.getElementById('btn-signin');

    if (page === 'signup') {
      signupForm.style.display = 'block';
      signinForm.style.display = 'none';
      title.textContent = 'Sign Up';
      btnSignup.style.background = '#3b82f6';
      btnSignup.style.color = '#fff';
      btnSignup.style.borderRadius = '6px';
      btnSignup.style.border = 'none';
      btnSignin.style.background = 'transparent';
      btnSignin.style.color = '#94a3b8';
      btnSignin.style.border = 'none';
    } else {
      signupForm.style.display = 'none';
      signinForm.style.display = 'block';
      title.textContent = 'Sign In';
      btnSignin.style.background = '#3b82f6';
      btnSignin.style.color = '#fff';
      btnSignin.style.borderRadius = '6px';
      btnSignin.style.border = 'none';
      btnSignup.style.background = 'transparent';
      btnSignup.style.color = '#94a3b8';
      btnSignup.style.border = 'none';
    }
  }
</script>
```

## File: src/api/apiClient.ts

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

## File: src/api/userService.ts

```typescript

```

## File: src/components/notebook/MockData.tsx

```typescript
export interface ProblemType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite: boolean;
}

export const mockProblems: ProblemType[] = [
  {
    id: '1',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    tags: ['KTLT', 'Array', 'Hash Table'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    description:
      'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.',
    tags: ['DSA', 'Linked List', 'Math'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Remove Element',
    description:
      'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.',
    tags: ['KTLT', 'Array', 'Two Pointers'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    description:
      'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    tags: ['DSA', 'Array', 'Binary Search'],
    difficulty: 'Hard',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Multiply Strings',
    description:
      'Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2.',
    tags: ['DSA', 'Math', 'String'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    tags: ['KTLT', 'String', 'Stack'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '7',
    title: 'Merge Two Sorted Lists',
    description:
      'Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.',
    tags: ['KTLT', 'Linked List'],
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '8',
    title: '3Sum',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that they add up to 0.',
    tags: ['DSA', 'Array', 'Two Pointers'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '9',
    title: 'N-Queens II',
    description:
      'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.',
    tags: ['DSA', 'Backtracking'],
    difficulty: 'Hard',
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Minimum Path Sum',
    description:
      'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum.',
    tags: ['DSA', 'Dynamic Programming', 'Matrix'],
    difficulty: 'Medium',
    isFavorite: true,
  },
  {
    id: '11',
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    tags: ['KTLT', 'Math', 'Dynamic Programming'],
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Sort List',
    description:
      'Given the head of a linked list, return the list after sorting it in ascending order.',
    tags: ['DSA', 'Linked List', 'Sorting'],
    difficulty: 'Medium',
    isFavorite: true,
  },
  {
    id: '13',
    title: 'Longest Palindromic Substring',
    description:
      'Given a string s, return the longest palindromic substring in s.',
    tags: ['DSA', 'String', 'Dynamic Programming'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '14',
    title: 'Reverse Linked List',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    tags: ['KTLT', 'Linked List'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '15',
    title: 'Container With Most Water',
    description:
      'Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    tags: ['DSA', 'Array', 'Two Pointers'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '16',
    title: 'Sudoku Solver',
    description:
      'Write a program to solve a Sudoku puzzle by filling the empty cells.',
    tags: ['DSA', 'Hash Table', 'Matrix', 'Backtracking'],
    difficulty: 'Hard',
    isFavorite: true,
  },
  {
    id: '17',
    title: 'First Missing Positive',
    description:
      'Given an unsorted integer array nums, return the smallest missing positive integer.',
    tags: ['DSA', 'Array', 'Hash Table'],
    difficulty: 'Hard',
    isFavorite: true,
  },
  {
    id: '18',
    title: 'Search Insert Position',
    description:
      'Given a sorted array of distinct integers and a target value, return the index if the target is found.',
    tags: ['KTLT', 'Array', 'Binary Search'],
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '19',
    title: 'Jump Game',
    description:
      "You are given an integer array nums. You are initially positioned at the array's first index.",
    tags: ['DSA', 'Array', 'Greedy'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '20',
    title: 'Merge Intervals',
    description:
      'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    tags: ['DSA', 'Array', 'Sorting'],
    difficulty: 'Medium',
    isFavorite: true,
  },
  {
    id: '21',
    title: 'Trapping Rain Water',
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap.',
    tags: ['DSA', 'Array', 'Two Pointers'],
    difficulty: 'Hard',
    isFavorite: true,
  },
  {
    id: '22',
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    tags: ['KTLT', 'Array', 'Dynamic Programming'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '23',
    title: 'Edit Distance',
    description:
      'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.',
    tags: ['DSA', 'String', 'Dynamic Programming'],
    difficulty: 'Hard',
    isFavorite: false,
  },
  {
    id: '24',
    title: 'Single Number',
    description:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    tags: ['KTLT', 'Array', 'Bit Manipulation'],
    difficulty: 'Easy',
    isFavorite: true,
  },
];
```

## File: src/components/notebook/Pagination.tsx

```typescript
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageItem = (page: number) => {
    const isActive = currentPage === page;
    return (
      <div
        key={page}
        onClick={() => onPageChange(page)}
        className={`flex justify-center items-center w-[50px] h-[50px] p-[10px] rounded-[20px] cursor-pointer transition-colors ${
          isActive
            ? 'bg-secondary-a70 text-white'
            : 'bg-tonal-a50 text-secondary-a10 hover:bg-tonal-a40'
        }`}
      >
        <span className="text-[20px] font-bold">{page}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center gap-[10px] mt-10">
      {[...Array(totalPages)].map((_, index) => renderPageItem(index + 1))}
    </div>
  );
};
```

## File: src/components/problem/ProblemFilter.tsx

```typescript
import React, { useState } from 'react';

interface ProblemFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedCourses: string[];
  setSelectedCourses: (courses: string[]) => void;
}

export const ProblemFilter = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  selectedCourses,
  setSelectedCourses,
}: ProblemFilterProps) => {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  const tagOptions = [
    'Array',
    'Math',
    'String',
    'DP',
    'Graph',
    'Stack',
    'Linked List',
    'Hash',
  ];
  const courseOptions = ['KTLT', 'DSA'];

  const handleTagSelect = (value: string) => {
    if (!selectedTags.includes(value))
      setSelectedTags([...selectedTags, value]);
    setIsTagOpen(false);
  };

  const handleCourseSelect = (value: string) => {
    if (!selectedCourses.includes(value))
      setSelectedCourses([...selectedCourses, value]);
    setIsCourseOpen(false);
  };

  const removeTag = (tag: string) =>
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  const removeCourse = (course: string) =>
    setSelectedCourses(selectedCourses.filter((c) => c !== course));

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex-1 h-[42px] bg-info-a0 rounded-[6px] px-3 flex items-center gap-2 border border-transparent focus-within:border-secondary-a70 transition-colors">
          <span className="text-white text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-white p8 placeholder:text-neutral-a50"
          />
        </div>

        <div className="relative w-[120px] h-[42px]">
          <div
            onClick={() => setIsTagOpen(!isTagOpen)}
            className="w-full h-full bg-info-a0 rounded-[6px] px-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-secondary-a70 transition-colors select-none"
          >
            <span className="text-white h7 font-bold">Tags</span>
            <span className="text-white text-xs opacity-70">▼</span>
          </div>

          {isTagOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-tonal-a20 rounded-[6px] border border-tonal-a30 overflow-hidden z-50 shadow-lg">
              {tagOptions.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="px-3 py-2 text-white p8 cursor-pointer hover:bg-primary-a20 transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-[120px] h-[42px]">
          <div
            onClick={() => setIsCourseOpen(!isCourseOpen)}
            className="w-full h-full bg-info-a0 rounded-[6px] px-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-secondary-a70 transition-colors select-none"
          >
            <span className="text-white h7 font-bold">Course</span>
            <span className="text-white text-xs opacity-70">▼</span>
          </div>

          {isCourseOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-tonal-a20 rounded-[6px] border border-tonal-a30 overflow-hidden z-50 shadow-lg">
              {courseOptions.map((course) => (
                <div
                  key={course}
                  onClick={() => handleCourseSelect(course)}
                  className="px-3 py-2 text-white p8 cursor-pointer hover:bg-primary-a20 transition-colors"
                >
                  {course}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(selectedTags.length > 0 || selectedCourses.length > 0) && (
        <div className="w-full flex flex-wrap gap-3 items-center mt-2">
          <span className="text-neutral-a50 p8 mr-2 italic">Filtered by:</span>
          {selectedCourses.map((course) => (
            <div
              key={course}
              className="flex items-center gap-2 px-3 py-1 bg-primary-a20 rounded-[20px]"
            >
              <span className="text-secondary-a10 p8 font-bold">{course}</span>
              <span
                onClick={() => removeCourse(course)}
                className="text-neutral-a50 hover:text-danger-a10 cursor-pointer font-bold ml-1 text-lg leading-none"
              >
                ×
              </span>
            </div>
          ))}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 px-3 py-1 bg-tonal-a20 border border-tonal-a30 rounded-[20px]"
            >
              <span className="text-white p8">{tag}</span>
              <span
                onClick={() => removeTag(tag)}
                className="text-neutral-a50 hover:text-danger-a10 cursor-pointer font-bold ml-1 text-lg leading-none"
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## File: src/components/problem/problemMockData.tsx

```typescript
export interface ProblemItem {
  id: number;
  name: string;
  tags: string[];
  group: string;
  difficulty: string;
}

export const mockProblemList: ProblemItem[] = [
  {
    id: 1,
    name: '#1. Two Sum',
    tags: ['Array', 'Math'],
    group: 'KTLT',
    difficulty: 'Hard',
  },
  {
    id: 2,
    name: '#2. Reverse String',
    tags: ['String'],
    group: 'DSA',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: '#3. Binary Search',
    tags: ['Array', 'Math'],
    group: 'KTLT',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: '#4. Max Subarray',
    tags: ['Array'],
    group: 'KTLT',
    difficulty: 'Medium',
  },
  {
    id: 5,
    name: '#5. Course Schedule',
    tags: ['Graph', 'Math'],
    group: 'DSA',
    difficulty: 'Medium',
  },
  {
    id: 6,
    name: '#6. Coin change',
    tags: ['DP'],
    group: 'DSA',
    difficulty: 'Hard',
  },
  {
    id: 7,
    name: '#7. Valid Parentheses',
    tags: ['Stack'],
    group: 'KTLT',
    difficulty: 'Easy',
  },
  {
    id: 8,
    name: '#8. Merge Intervals',
    tags: ['Array'],
    group: 'DSA',
    difficulty: 'Medium',
  },
  {
    id: 9,
    name: '#9. LRU Cache',
    tags: ['Linked List', 'Hash'],
    group: 'DSA',
    difficulty: 'Hard',
  },
  {
    id: 10,
    name: '#10. Climbing Stairs',
    tags: ['DP', 'Math'],
    group: 'KTLT',
    difficulty: 'Easy',
  },
];
```

## File: src/components/problem/ProblemTable.tsx

```typescript
import React from 'react';
import { ProblemItem } from '@/components/problem/problemMockData';

interface ProblemTableProps {
  problems: ProblemItem[];
}

export const ProblemTable = ({ problems }: ProblemTableProps) => {
  const getDifficultyColor = (diff: string) => {
    if (diff === 'Hard') return 'bg-danger-a0 text-white';
    if (diff === 'Medium') return 'bg-warning-a20 text-tonal-a0';
    return 'bg-success-a0 text-tonal-a0';
  };

  return (
    <div className="w-full flex flex-col border border-tonal-a30 rounded-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="grid grid-cols-4 bg-tonal-a20 border-b border-tonal-a30">
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Name
        </div>
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Tag
        </div>
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Group
        </div>
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Difficulty
        </div>
      </div>

      {/* Body */}
      {problems.length > 0 ? (
        problems.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 items-center py-4 ${index !== problems.length - 1 ? 'border-b border-tonal-a30' : ''}`}
          >
            <div className="text-center text-[#F2F2F2] font-semibold text-[18px]">
              {item.name}
            </div>

            <div className="flex justify-center flex-wrap gap-2 px-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#8CB6FF] text-black px-4 py-1 rounded-[100px] text-sm font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-center">
              <span className="bg-[#4D5B7C] text-white px-6 py-2 rounded-[100px] text-sm font-semibold">
                {item.group}
              </span>
            </div>

            <div className="flex justify-center">
              <span
                className={`px-6 py-1 rounded-[100px] text-sm font-bold ${getDifficultyColor(item.difficulty)}`}
              >
                {item.difficulty}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 text-center text-neutral-a50 text-lg">
          No exercises were found that match your filters.
        </div>
      )}
    </div>
  );
};
```

## File: src/components/ui/ChipBoard.tsx

```typescript
import ChipItem from './ChipItem';
interface ChipBoardProps {
  tags: string[];
  onRemove: (tag: string) => void;
}

const ChipBoard = ({ tags, onRemove }: ChipBoardProps) => {
  if (tags.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 bg-secondary-a10 px-2 py-2">
      {tags.map((tag) => (
        <ChipItem key={tag} label={tag} onRemove={() => onRemove(tag)} />
      ))}
    </div>
  );
};

export default ChipBoard;
```

## File: src/components/ui/ChipItem.tsx

```typescript
interface ChipItemProps {
  label: string;
  onRemove: () => void;
}

const ChipItem = ({ label, onRemove }: ChipItemProps) => {
  return (
    <div className="flex items-center px-3 py-1 gap-2 bg-[#8CB6FF] text-black p5 rounded-full ">
      <span>{label}</span>
      <button onClick={onRemove}>×</button>
    </div>
  );
};

export default ChipItem;
```

## File: src/components/ui/ExpandIcon.tsx

```typescript
export const ExpandIcon = (): JSX.Element => {
  return (
    <svg
      width="34"
      height="37"
      viewBox="0 0 34 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5899 18.1532H24.5243V24.2043H19.926V28.2384H27.5899V18.1532ZM9.19662 12.1022H13.7949V8.06811H6.13108V18.1532H9.19662V12.1022ZM30.6554 0H3.06554C1.37949 0 0 1.81532 0 4.03405V32.2724C0 34.4912 1.37949 36.3065 3.06554 36.3065H30.6554C32.3414 36.3065 33.7209 34.4912 33.7209 32.2724V4.03405C33.7209 1.81532 32.3414 0 30.6554 0ZM30.6554 32.2926H3.06554V4.01388H30.6554V32.2926Z"
        fill="#8CB6FF"
      />
    </svg>
  );
};

export default ExpandIcon;
```

## File: src/components/ui/SelectDropdown.tsx

```typescript
import { useState } from 'react';

interface SelectDropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

const SelectDropdown = ({ label, options, onSelect }: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 bg-info-a0 rounded h5"
      >
        {label}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-info-a0 border rounded shadow">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => (onSelect(option), setIsOpen(false))}
              className="block w-full text-left px-4 py-2 hover:bg-[#8CB6FF]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
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

## File: src/pages/CodeDescription.tsx

```typescript
import { CodeEditorSection } from './CodeEditorSection';
import { ProblemTabsSection } from './ProblemTabsSection';
import { TopNavigationSection } from './TopNavigationSection';

export const CodeDescription = (): JSX.Element => {
  return (
    <main
      className="relative w-[1440px] h-[1440px] bg-[#1d2535] overflow-hidden mx-auto shadow-2xl"
      data-id="code-description"
    >
      <TopNavigationSection />
      <div className="absolute top-[121px] left-0 flex w-[1440px] h-[1319px]">
        <section
          className="relative w-[723px] h-[1319px]"
          aria-label="Problem tabs"
          data-id="problem-tabs-section-container"
        >
          <ProblemTabsSection />
        </section>
        <section
          className="relative w-[717px] h-[1319px]"
          aria-label="Code editor"
          data-id="code-editor-section-container"
        >
          <CodeEditorSection />
        </section>
      </div>
    </main>
  );
};

export default CodeDescription;
```

## File: src/pages/CodeEditorSection.tsx

```typescript
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

type Language = 'javascript' | 'python' | 'cpp' | 'java';

interface CodeTemplates {
  [problemId: string]: {
    [lang in Language]: string;
  };
}

const TEMPLATES: CodeTemplates = {
  'two-sum': {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
    cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
  },
  'add-two-numbers': {
    javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  // Write your code here
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    let sum = carry;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
  }
  return dummy.next;
}`,
    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        dummy = ListNode(0)
        curr = dummy
        carry = 0
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            total = val1 + val2 + carry
            carry = total // 10
            curr.next = ListNode(total % 10)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next`,
    cpp: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your code here
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int val1 = l1 ? l1->val : 0;
            int val2 = l2 ? l2->val : 0;
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
            l1 = l1 ? l1->next : nullptr;
            l2 = l2 ? l2->next : nullptr;
        }
        return dummy->next;
    }
};`,
    java: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your code here
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`,
  },
  'longest-palindromic-substring': {
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  // Write your code here
  if (!s || s.length < 1) return "";
  let start = 0, end = 0;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(i, i);
    let len2 = expandAroundCenter(i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
}`,
    python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        if not s:
            return ""
        start, end = 0, 0
        def expand(left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return right - left - 1
        for i in range(len(s)):
            len1 = expand(i, i)
            len2 = expand(i, i + 1)
            length = max(len1, len2)
            if length > end - start:
                start = i - (length - 1) // 2
                end = i + length // 2
        return s[start:end + 1]`,
    cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Write your code here
        if (s.empty()) return "";
        int start = 0, end = 0;
        auto expand = [&](int left, int right) {
            while (left >= 0 && right < s.length() && s[left] == s[right]) {
                left--;
                right++;
            }
            return right - left - 1;
        };
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(i, i);
            int len2 = expand(i, i + 1);
            int len = max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substr(start, end - start + 1);
    }
};`,
    java: `class Solution {
    public String longestPalindrome(String s) {
        // Write your code here
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`,
  },
};

export const CodeEditorSection = (): JSX.Element => {
  const { problemId = 'two-sum' } = useParams<{ problemId: string }>();
  const [lang, setLang] = useState<Language>('javascript');
  const [code, setCode] = useState('');

  // Console panel state
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [runState, setRunState] = useState<
    'idle' | 'running' | 'success' | 'submitted' | 'wrong'
  >('idle');
  const [consoleLog, setConsoleLog] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Update code template based on problemId and selected language
  useEffect(() => {
    const templates = TEMPLATES[problemId] || TEMPLATES['two-sum'];
    setCode(templates[lang]);
    setRunState('idle');
    setConsoleLog('');
  }, [problemId, lang]);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const getLanguageLabel = (l: Language) => {
    switch (l) {
      case 'javascript':
        return 'JavaScript (ES6)';
      case 'python':
        return 'Python 3';
      case 'cpp':
        return 'C++20';
      case 'java':
        return 'Java 17';
    }
  };

  const lines = code.split('\n');

  // Trigger Mock Code Execution
  const handleRunCode = () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleLog('Compiling and running code against sample tests...');

    setTimeout(() => {
      setRunState('success');
      let resultText = '';
      if (problemId === 'two-sum') {
        resultText = `⚡ Test Case 1: nums = [2,7,11,15], target = 9
✔ Output: [0,1]
✔ Expected: [0,1]
✔ Status: Passed (0.01ms)

⚡ Test Case 2: nums = [3,2,4], target = 6
✔ Output: [1,2]
✔ Expected: [1,2]
✔ Status: Passed (0.01ms)

🎉 All sample tests passed successfully!`;
      } else if (problemId === 'add-two-numbers') {
        resultText = `⚡ Test Case 1: l1 = [2,4,3], l2 = [5,6,4]
✔ Output: [7,0,8]
✔ Expected: [7,0,8]
✔ Status: Passed (0.02ms)

🎉 Sample test passed successfully!`;
      } else {
        resultText = `⚡ Test Case 1: s = "babad"
✔ Output: "bab"
✔ Expected: "bab" or "aba"
✔ Status: Passed (0.05ms)

🎉 Sample test passed successfully!`;
      }
      setConsoleLog(resultText);
    }, 1200);
  };

  // Trigger Mock Full Submission
  const handleSubmitCode = () => {
    setIsConsoleOpen(true);
    setRunState('running');
    setConsoleLog('Running full suite of 52 hidden test cases...');

    setTimeout(() => {
      setRunState('submitted');
      setConsoleLog(`🏆 Submission Accepted!
🎉 Status: Solved
✔ 52/52 test cases passed.
🚀 Runtime: 64 ms (Beats 94.2% of submissions)
💾 Memory: 42.4 MB (Beats 88.5% of submissions)

Great job! You have earned +100 XP and saved notes to your personalized tutor profile.`);
    }, 2000);
  };

  return (
    <div
      className="absolute top-0 left-0 w-[717px] h-[1319px] bg-[#0d131f] border-l border-tonal-a20 flex flex-col select-none"
      data-id="code-editor-section"
    >
      {/* Editor Header: Lang and Reset */}
      <div className="h-[60px] border-b border-tonal-a20 bg-[#0d131f] flex items-center justify-between px-6">
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-tonal-a20 text-white font-semibold py-1.5 px-3 rounded-lg border border-tonal-a30 text-sm focus:border-secondary-a70 outline-none cursor-pointer"
          >
            <option value="javascript">{getLanguageLabel('javascript')}</option>
            <option value="python">{getLanguageLabel('python')}</option>
            <option value="cpp">{getLanguageLabel('cpp')}</option>
            <option value="java">{getLanguageLabel('java')}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            const templates = TEMPLATES[problemId] || TEMPLATES['two-sum'];
            setCode(templates[lang]);
          }}
          className="text-neutral-a400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
          title="Reset Code Boilerplate"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12"
            />
          </svg>
          Reset Code
        </button>
      </div>

      {/* Editor Text Area and Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-sm leading-relaxed p-4 bg-[#0a0e17]">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="w-12 text-neutral-a600 text-right pr-3 select-none overflow-hidden text-sm pt-2"
          style={{ lineHeight: '24px' }}
        >
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 bg-transparent text-[#e2e8f0] resize-none outline-none border-none overflow-y-auto font-mono text-sm leading-relaxed pt-2 pl-1 whitespace-pre pr-2 selection:bg-secondary-a90/30 select-text"
          style={{
            lineHeight: '24px',
            fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          }}
          spellCheck="false"
          placeholder="// Type your code here..."
        />
      </div>

      {/* Console Drawer Panel */}
      <div
        className={`bg-[#070b12] border-t border-tonal-a20 transition-all duration-300 flex flex-col z-10 ${
          isConsoleOpen ? 'h-[400px]' : 'h-11'
        }`}
      >
        {/* Console Drawer Header */}
        <div
          className="h-11 border-b border-tonal-a20/60 px-6 flex items-center justify-between cursor-pointer hover:bg-tonal-a10/40"
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
        >
          <span className="text-neutral-a300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            Console Output
            {runState === 'running' && (
              <span className="w-2 h-2 rounded-full bg-secondary-a70 animate-ping" />
            )}
          </span>
          <button
            type="button"
            className="text-neutral-a400 hover:text-white cursor-pointer"
          >
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${isConsoleOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Console content */}
        {isConsoleOpen && (
          <div className="flex-1 p-6 overflow-y-auto font-mono text-xs leading-relaxed text-neutral-a200 bg-[#070b12]">
            {runState === 'running' ? (
              <div className="flex items-center gap-3">
                <svg
                  className="animate-spin h-5 w-5 text-secondary-a70"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-neutral-a300 font-bold">
                  {consoleLog}
                </span>
              </div>
            ) : runState === 'success' || runState === 'submitted' ? (
              <pre className="whitespace-pre-wrap">{consoleLog}</pre>
            ) : (
              <div className="text-neutral-a500 italic">
                Press "Run Code" to compile and run sample test cases, or
                "Submit" to test hidden cases.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Actions Bottom Bar */}
      <div className="h-[70px] bg-[#0d131f] border-t border-tonal-a20 px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
          className="text-neutral-a300 hover:text-white px-3 py-2 rounded-lg hover:bg-tonal-a20 text-sm font-bold transition-all cursor-pointer"
        >
          Console
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunCode}
            disabled={runState === 'running'}
            className="h-10 px-5 bg-tonal-a20 border border-tonal-a30 hover:border-secondary-a70 hover:bg-tonal-a30 text-white font-bold rounded-lg transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Run Code
          </button>
          <button
            type="button"
            onClick={handleSubmitCode}
            disabled={runState === 'running'}
            className="h-10 px-6 bg-success-a0 text-tonal-a0 hover:bg-success-a10 font-bold rounded-lg transition-all text-sm cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorSection;
```

## File: src/pages/ForgetPassword.tsx

```typescript
import React, { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgetPassword = (): JSX.Element => {
  const emailId = useId();
  const verificationId = useId();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
  });

  const handleChange =
    (field: 'email' | 'verificationCode') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleBack = () => {
    navigate('/signup'); // Go back to signup/signin page
  };

  const handleResend = () => {
    alert('Đã gửi lại mã xác minh!');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email.trim() || !formData.verificationCode.trim()) {
      alert('Vui lòng điền đầy đủ Email và Mã xác minh!');
      return;
    }
    alert('Mã xác minh hợp lệ, đang tiến hành đặt lại mật khẩu...');
    navigate('/signup');
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
      {/* Title - Centered */}
      <header className="flex justify-center items-center mb-10">
        <h1 className="text-[#f2f2f2] text-5xl md:text-6xl [font-family:'HYWenHei-85W',Helvetica] font-normal tracking-[0] leading-[normal]">
          Forget Password
        </h1>
      </header>

      {/* Form Container - Centered and Relative wrapper to keep exact absolute coordinates inside */}
      <form
        className="relative w-full max-w-[710px] h-[289px]"
        onSubmit={handleSubmit}
      >
        {/* Email Field Wrapper */}
        <div className="absolute top-0 left-0 w-full h-14 shadow-[1px_4px_4px_#0c24ac]">
          <div className="absolute w-full top-0 left-0 h-14 flex items-center bg-surface-tonal-tonal-a10 rounded-[10px] overflow-hidden border border-solid border-surface-tonal-tonal-a0 cursor-text">
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange('email')}
              aria-label="Email"
              className="peer w-full h-full pl-6 pr-6 pt-[18px] pb-2 [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] bg-transparent border-0 outline-none caret-secondary-secondary-a70"
            />
            <span className="absolute left-6 top-[19px] [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0">
              Email
            </span>
          </div>
        </div>

        {/* Verification Code Field Wrapper */}
        <div className="absolute top-[116px] left-0 w-[calc(100%-170px)] md:w-[555px] h-14 shadow-[1px_4px_4px_#0c24ac]">
          <div className="absolute w-full top-0 left-0 h-14 flex items-center bg-surface-tonal-tonal-a10 rounded-[10px] overflow-hidden border border-solid border-surface-tonal-tonal-a0 cursor-text">
            <input
              id={verificationId}
              name="verificationCode"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder=" "
              value={formData.verificationCode}
              onChange={handleChange('verificationCode')}
              aria-label="Verification code"
              className="peer w-full h-full pl-6 pr-6 pt-[18px] pb-2 [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] bg-transparent border-0 outline-none caret-secondary-secondary-a70"
            />
            <span className="absolute left-6 top-[19px] [font-family:'HYWenHei-85W',Helvetica] font-normal text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0">
              Verification code
            </span>
          </div>
        </div>

        {/* Resend Button */}
        <button
          type="button"
          onClick={handleResend}
          className="flex w-[150px] md:w-[155px] h-14 items-center justify-center gap-2.5 p-2.5 absolute top-[116px] right-0 md:left-[555px] bg-[#1d2535] rounded-[10px] shadow-[1px_4px_4px_#0c24ac] cursor-pointer hover:bg-[#283247] transition-colors"
          aria-label="Resend verification code"
        >
          <span className="relative w-fit [font-family:'HYWenHei-85W',Helvetica] font-normal text-secondary-secondary-a70 text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Resend
          </span>
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="flex w-[118px] h-14 items-center justify-center gap-2.5 p-2.5 absolute top-[232px] left-0 bg-surface-tonal-tonal-a20 rounded-[10px] border border-solid border-secondary-secondary-a70 shadow-[1px_4px_4px_#0c24ac] cursor-pointer hover:bg-surface-tonal-tonal-a30 transition-colors"
          aria-label="Go back"
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'HYWenHei-85W',Helvetica] font-normal text-secondary-secondary-a70 text-[28px] tracking-[0] leading-[normal]">
            Back
          </span>
        </button>

        {/* Continue Submit Button */}
        <button
          type="submit"
          className="flex w-[179px] h-14 items-center justify-center gap-2.5 p-2.5 absolute top-[229px] right-0 md:left-[531px] bg-surface-tonal-tonal-a20 rounded-[10px] border border-solid border-secondary-secondary-a70 shadow-[1px_4px_4px_#0c24ac] cursor-pointer hover:bg-surface-tonal-tonal-a30 transition-colors"
          aria-label="Continue"
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'HYWenHei-85W',Helvetica] font-normal text-secondary-secondary-a70 text-[28px] tracking-[0] leading-[normal]">
            Continue
          </span>
        </button>
      </form>
    </main>
  );
};

export default ForgetPassword;
```

## File: src/pages/Ide.tsx

```typescript
import { MainNavigation } from '@/components/ui/MainNavigation';

export const Ide = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none gap-10">
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>
      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-center items-center overflow-hidden select-none gap-10">
        <div className="self-stretch flex-1 flex flex-row justify-center items-center py-1 gap-10">
          <div>
            <p className="text-neutral-a50 h4 mb-10">Code Editor:</p>
            <textarea
              placeholder="Enter your code here"
              className="px-4 py-2 bg-black ide4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ide;
```

## File: src/pages/ProblemTabsSection.tsx

```typescript
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface Submission {
  id: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
  language: string;
  runtime: string;
  memory: string;
  time: string;
  code: string;
}

export const ProblemTabsSection = (): JSX.Element => {
  const { problemId = 'two-sum' } = useParams<{ problemId: string }>();
  const [activeTab, setActiveTab] = useState<'desc' | 'ai' | 'subs'>('desc');

  // AI Tutor state
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'two-sum': [
      {
        sender: 'ai',
        text: 'Xin chào! Mình là AI Tutor. Để giải bài Two Sum tối ưu nhất O(n), bạn nên sử dụng Hash Map để lưu giá trị đã duyệt qua kèm index. Bằng cách này, khi duyệt qua số hiện tại, bạn chỉ cần kiểm tra xem `target - nums[i]` đã có trong Hash Map chưa. Bạn có cần hướng dẫn chi tiết hơn không?',
        timestamp: '9:00 AM',
      },
    ],
    'add-two-numbers': [
      {
        sender: 'ai',
        text: 'Chào bạn! Bài Add Two Numbers yêu cầu cộng hai số biểu diễn dưới dạng Linked List ngược. Điểm mấu chốt là bạn cần lặp qua cả hai danh sách liên kết, tính tổng các node tương ứng cộng với biến nhớ (carry). Nhớ xử lý trường hợp khi duyệt hết các node nhưng biến nhớ vẫn còn khác 0 nhé!',
        timestamp: '9:05 AM',
      },
    ],
    'longest-palindromic-substring': [
      {
        sender: 'ai',
        text: 'Chào bạn! Để tìm chuỗi đối xứng dài nhất, cách tối ưu không gian là mở rộng từ tâm (Expand Around Center). Có 2n - 1 tâm (bao gồm cả tâm đơn lẻ và tâm giữa hai ký tự). Độ phức tạp thời gian là O(n^2) và bộ nhớ là O(1). Hãy hỏi mình nếu bạn muốn xem mã giả (pseudocode) nhé!',
        timestamp: '9:10 AM',
      },
    ],
  });

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Submissions data
  const submissionsData: Record<string, Submission[]> = {
    'two-sum': [
      {
        id: 'SUB-9821',
        status: 'Accepted',
        language: 'JavaScript',
        runtime: '72 ms',
        memory: '42.1 MB',
        time: '3 hours ago',
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      },
      {
        id: 'SUB-9120',
        status: 'Wrong Answer',
        language: 'JavaScript',
        runtime: 'N/A',
        memory: 'N/A',
        time: 'Yesterday',
        code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}`,
      },
    ],
    'add-two-numbers': [
      {
        id: 'SUB-4122',
        status: 'Time Limit Exceeded',
        language: 'Python',
        runtime: 'N/A',
        memory: 'N/A',
        time: '2 days ago',
        code: `class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # infinite loop mock
        while l1:
            pass`,
      },
    ],
    'longest-palindromic-substring': [],
  };

  const currentMessages = useMemo(() => {
    return (
      messages[problemId] || [
        {
          sender: 'ai',
          text: 'Chào bạn! Mình có thể giúp gì cho bạn trong việc giải bài tập này?',
          timestamp: 'Just now',
        },
      ]
    );
  }, [messages, problemId]);

  const currentSubmissions = submissionsData[problemId] || [];

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputVal,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [problemId]: [...(prev[problemId] || []), userMsg],
    }));
    setInputVal('');
    setIsTyping(true);

    // AI Mock Response
    setTimeout(() => {
      let aiText =
        'Cảm ơn câu hỏi của bạn. Mình khuyên bạn nên kiểm tra lại các điều kiện biên và cấu trúc vòng lặp.';
      if (
        inputVal.toLowerCase().includes('gợi ý') ||
        inputVal.toLowerCase().includes('hint')
      ) {
        if (problemId === 'two-sum') {
          aiText =
            'Gợi ý: Hãy khởi tạo một Map rỗng. Khi duyệt qua `nums[i]`, lấy `target - nums[i]`. Nếu Map đã lưu giá trị này, hãy lấy index của nó ra và trả về kết quả `[map.get(complement), i]`.';
        } else if (problemId === 'add-two-numbers') {
          aiText =
            'Gợi ý: Sử dụng một nút giả (dummy node) làm đầu danh sách kết quả. Khai báo biến `carry = 0`. Lặp đến khi cả hai list đều null và `carry == 0`.';
        } else {
          aiText =
            'Gợi ý: Lặp qua từng ký tự trong chuỗi, gọi hàm kiểm tra tính đối xứng bằng cách mở rộng sang hai bên từ vị trí hiện tại (cho cả chuỗi đối xứng lẻ và chẵn).';
        }
      } else if (
        inputVal.toLowerCase().includes('mã') ||
        inputVal.toLowerCase().includes('code') ||
        inputVal.toLowerCase().includes('giải')
      ) {
        aiText =
          'Mình khuyên bạn nên thử tự suy nghĩ thuật toán trước nhé! Gợi ý: Hãy phân tích các ví dụ Input/Output để tìm ra quy luật, hoặc hỏi mình các bước cụ thể hơn thay vì xin trực tiếp mã nguồn.';
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [problemId]: [...(prev[problemId] || []), aiMsg],
      }));
      setIsTyping(false);
    }, 1500);
  };

  // Render problem details
  const renderProblemDetails = () => {
    switch (problemId) {
      case 'longest-palindromic-substring':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white h3 font-bold">
                5. Longest Palindromic Substring
              </h1>
              <span className="px-2.5 py-0.5 bg-danger-a0/20 text-danger-a0 text-xs font-bold rounded">
                Hard
              </span>
            </div>
            <p className="text-neutral-a100 p6 leading-relaxed">
              Given a string{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                s
              </code>
              , return the longest palindromic substring in{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                s
              </code>
              . A substring is a contiguous sequence of characters within the
              string.
            </p>

            {/* Example 1 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 1:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> s = "babad"{'\n'}
                <strong>Output:</strong> "bab"{'\n'}
                <strong>Explanation:</strong> "aba" is also a valid answer.
              </pre>
            </div>

            {/* Example 2 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 2:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> s = "cbbd"{'\n'}
                <strong>Output:</strong> "bb"
              </pre>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Constraints:</span>
              <ul className="list-disc pl-5 text-neutral-a300 p7 flex flex-col gap-1.5">
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    1 &lt;= s.length &lt;= 1000
                  </code>
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    s
                  </code>{' '}
                  consists of only digits and English letters.
                </li>
              </ul>
            </div>
          </div>
        );

      case 'add-two-numbers':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white h3 font-bold">2. Add Two Numbers</h1>
              <span className="px-2.5 py-0.5 bg-warning-a0/20 text-warning-a0 text-xs font-bold rounded">
                Medium
              </span>
            </div>
            <p className="text-neutral-a100 p6 leading-relaxed">
              You are given two non-empty linked lists representing two
              non-negative integers. The digits are stored in reverse order, and
              each of their nodes contains a single digit. Add the two numbers
              and return the sum as a linked list.
              {'\n'}
              {'\n'}
              You may assume the two numbers do not contain any leading zero,
              except the number 0 itself.
            </p>

            {/* Example 1 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 1:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]{'\n'}
                <strong>Output:</strong> [7,0,8]{'\n'}
                <strong>Explanation:</strong> 342 + 465 = 807.
              </pre>
            </div>

            {/* Example 2 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 2:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto">
                <strong>Input:</strong> l1 = [0], l2 = [0]{'\n'}
                <strong>Output:</strong> [0]
              </pre>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Constraints:</span>
              <ul className="list-disc pl-5 text-neutral-a300 p7 flex flex-col gap-1.5">
                <li>
                  The number of nodes in each linked list is in the range{' '}
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    [1, 100]
                  </code>
                  .
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    0 &lt;= Node.val &lt;= 9
                  </code>
                </li>
                <li>
                  It is guaranteed that the list represents a number that does
                  not have leading zeros.
                </li>
              </ul>
            </div>
          </div>
        );

      case 'two-sum':
      default:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white h3 font-bold">1. Two Sum</h1>
              <span className="px-2.5 py-0.5 bg-success-a0/20 text-success-a0 text-xs font-bold rounded">
                Easy
              </span>
            </div>
            <p className="text-neutral-a100 p6 leading-relaxed">
              Given an array of integers{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                nums
              </code>{' '}
              and an integer{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                target
              </code>
              , return indices of the two numbers such that they add up to{' '}
              <code className="bg-tonal-a20 px-1.5 py-0.5 rounded text-secondary-a30">
                target
              </code>
              .{'\n'}
              {'\n'}
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
              {'\n'}
              {'\n'}
              You can return the answer in any order.
            </p>

            {/* Example 1 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 1:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> nums = [2,7,11,15], target = 9{'\n'}
                <strong>Output:</strong> [0,1]{'\n'}
                <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
                return [0, 1].
              </pre>
            </div>

            {/* Example 2 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 2:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto">
                <strong>Input:</strong> nums = [3,2,4], target = 6{'\n'}
                <strong>Output:</strong> [1,2]
              </pre>
            </div>

            {/* Example 3 */}
            <div className="flex flex-col gap-2 bg-tonal-a20 p-4 rounded-xl border border-tonal-a30">
              <span className="text-white font-bold text-sm">Example 3:</span>
              <pre className="text-neutral-a300 font-mono text-sm leading-relaxed overflow-x-auto">
                <strong>Input:</strong> nums = [3,3], target = 6{'\n'}
                <strong>Output:</strong> [0,1]
              </pre>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Constraints:</span>
              <ul className="list-disc pl-5 text-neutral-a300 p7 flex flex-col gap-1.5">
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    2 &lt;= nums.length &lt;= 10^4
                  </code>
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    -10^9 &lt;= nums[i] &lt;= 10^9
                  </code>
                </li>
                <li>
                  <code className="bg-tonal-a20 px-1 rounded text-secondary-a30">
                    -10^9 &lt;= target &lt;= 10^9
                  </code>
                </li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-[723px] h-[1319px] bg-tonal-a10 border-r border-tonal-a20 flex flex-col select-none"
      data-id="problem-tabs-section"
    >
      {/* Tabs Header */}
      <div className="h-[60px] border-b border-tonal-a20 flex px-6 items-center gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('desc')}
          className={`h-full text-base font-bold flex items-center border-b-4 px-2 transition-all duration-200 cursor-pointer ${
            activeTab === 'desc'
              ? 'text-secondary-a30 border-secondary-a50'
              : 'text-neutral-a400 border-transparent hover:text-neutral-a100'
          }`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`h-full text-base font-bold flex items-center border-b-4 px-2 transition-all duration-200 cursor-pointer gap-2 ${
            activeTab === 'ai'
              ? 'text-secondary-a30 border-secondary-a50'
              : 'text-neutral-a400 border-transparent hover:text-neutral-a100'
          }`}
        >
          <span>AI Tutor</span>
          <span className="w-2 h-2 rounded-full bg-success-a0 animate-pulse" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('subs')}
          className={`h-full text-base font-bold flex items-center border-b-4 px-2 transition-all duration-200 cursor-pointer ${
            activeTab === 'subs'
              ? 'text-secondary-a30 border-secondary-a50'
              : 'text-neutral-a400 border-transparent hover:text-neutral-a100'
          }`}
        >
          Submissions
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === 'desc' && renderProblemDetails()}

        {activeTab === 'ai' && (
          <div className="flex flex-col h-full gap-4">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 max-h-[1050px] pr-2">
              {currentMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col w-fit max-w-[85%] rounded-2xl px-4 py-3 border ${
                    msg.sender === 'user'
                      ? 'self-end bg-secondary-a90 text-white border-secondary-a70 rounded-tr-none'
                      : 'self-start bg-tonal-a20 text-neutral-a50 border-tonal-a30 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  <span className="text-[10px] text-neutral-a400 self-end mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="self-start bg-tonal-a20 text-neutral-a50 border border-tonal-a30 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-neutral-a300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-neutral-a300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-neutral-a300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Field */}
            <form
              onSubmit={handleSendMessage}
              className="flex gap-2 items-center bg-tonal-a20 border border-tonal-a30 rounded-xl p-2 mt-auto"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask AI Tutor: 'gợi ý thuật toán'..."
                className="flex-1 bg-transparent text-white placeholder-neutral-a400 border-none outline-none py-2 px-3 text-sm"
              />
              <button
                type="submit"
                className="p-2 bg-secondary-a90 hover:bg-secondary-a70 text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Send"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9-7-9-7v14z"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'subs' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-white h5 font-bold mb-2">Submission History</h2>
            {currentSubmissions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {currentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 bg-tonal-a20 border border-tonal-a30 rounded-xl flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                            sub.status === 'Accepted'
                              ? 'bg-success-a0/20 text-success-a0'
                              : 'bg-danger-a0/20 text-danger-a0'
                          }`}
                        >
                          {sub.status}
                        </span>
                        <span className="text-neutral-a300 text-sm">
                          {sub.language}
                        </span>
                      </div>
                      <span className="text-neutral-a400 text-xs">
                        {sub.time}
                      </span>
                    </div>

                    <div className="flex gap-6 text-sm text-neutral-a300">
                      <div>
                        Runtime:{' '}
                        <strong className="text-white">{sub.runtime}</strong>
                      </div>
                      <div>
                        Memory:{' '}
                        <strong className="text-white">{sub.memory}</strong>
                      </div>
                    </div>

                    <details className="mt-1 cursor-pointer">
                      <summary className="text-secondary-a50 hover:text-secondary-a70 text-xs font-bold transition-colors select-none">
                        View Code Submission
                      </summary>
                      <pre className="mt-3 p-3 bg-[#0a0e15] border border-tonal-a30 rounded-lg text-xs text-neutral-a200 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                        <code>{sub.code}</code>
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-a400 text-sm">
                No submissions yet. Write code and hit Submit to run tests!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemTabsSection;
```

## File: src/pages/SignIn.tsx

```typescript
import { FormEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Sign } from '@/components/ui/Sign';

const signInFields = [
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
  },
] as const;

export const SignIn = (): JSX.Element => {
  const formId = useId();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password) {
      alert('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }
    if (!email.includes('@')) {
      alert('Email không hợp lệ!');
      return;
    }
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
      <header className="flex justify-center items-center">
        <h1 className="text-[#e0e0e0] text-6xl h0 tracking-[0] leading-[normal] whitespace-nowrap">
          Sign In
        </h1>
      </header>

      <form
        id={formId}
        onSubmit={handleSubmit}
        className="flex w-full max-w-[710px] h-[172px] relative mt-[60px] flex-col items-center gap-[60px] transition-all duration-300"
      >
        <Button className="hidden" type="submit">
          Submit
        </Button>

        {signInFields.map((field) => {
          const inputId = `${formId}-${field.id}`;

          return (
            <div key={field.id} className="relative self-stretch w-full">
              <div className="relative w-full h-14 bg-surface-tonal-tonal-a10 rounded-[10px] overflow-hidden border border-solid border-surface-tonal-tonal-a0 shadow-[1px_4px_4px_#0c24ac]">
                <input
                  id={inputId}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  aria-label={field.label}
                  placeholder=" "
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="peer absolute inset-0 z-10 h-full w-full rounded-[10px] px-6 pt-[18px] pb-2 p6 text-neutral-neutral-a50 caret-secondary-secondary-a70 bg-transparent border-0 outline-none"
                />
                <label
                  htmlFor={inputId}
                  className="absolute top-[19px] left-6 p7 text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0"
                >
                  {field.label}
                </label>
              </div>

              {field.id === 'password' && (
                <div className="absolute right-0 mt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/forget-password')}
                    className="text-neutral-neutral-a50/60 hover:text-secondary-secondary-a70 transition-colors p8 underline cursor-pointer bg-transparent border-none p-0"
                  >
                    Forget Password
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </form>

      <Sign activeTab="signin" />
    </main>
  );
};

export default SignIn;
```

## File: src/pages/Survey.tsx

```typescript
import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = [
  {
    id: 'duoi-6-thang',
    label: 'Dưới 6 tháng',
  },
  {
    id: 'duoi-1-nam',
    label: 'Dưới 1 năm',
  },
  {
    id: 'tu-1-den-2-nam',
    label: 'Từ 1 đến 2 năm',
  },
  {
    id: 'tren-2-nam',
    label: 'Trên 2 năm',
  },
];

const RadioIcon = ({ checked }: { checked: boolean }) => (
  <svg
    className={`w-6 h-6 shrink-0 transition-all duration-200 ${
      checked ? 'text-secondary-secondary-a90' : 'text-neutral-neutral-a50/40'
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <circle cx="12" cy="12" r="10" />
    {checked && <circle cx="12" cy="12" r="5" fill="currentColor" />}
  </svg>
);

export const Survey = (): JSX.Element => {
  const groupId = useId();
  const navigate = useNavigate();

  // step tracks current question index: 1, 2, 3, 4
  const [step, setStep] = useState(1);

  // Track selected options for each step separately
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({
    1: options[1].id,
    2: options[1].id,
    3: options[1].id,
    4: options[1].id,
  });

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/signup');
    }
  };

  const handleNext = () => {
    console.log(`Step ${step} answered:`, selectedOptions[step]);
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log('Survey completed, answers:', selectedOptions);
      // Proceed to the dashboard after completing the 4th question
      navigate('/dashboard');
    }
  };

  // Dynamically calculate progress percentage (25%, 50%, 75%, 100%)
  const progressPercent = step * 25;

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
      <section
        className="w-full max-w-[830px] h-[878px] relative"
        aria-labelledby={`${groupId}-title`}
      >
        {/* Title */}
        <h1
          id={`${groupId}-title`}
          className="absolute top-[7px] left-[calc(50%_-_120px)] w-[239px] text-center [font-family:'HYWenHei-85W',Helvetica] font-normal text-[#f2f2f2] text-6xl tracking-[0] leading-[normal]"
        >
          Survey
        </h1>

        {/* Progress Bar (25% -> 50% -> 75% -> 100%) */}
        <div
          className="flex w-[calc(100%_-_253px)] md:w-[577px] h-[66px] items-center justify-center gap-5 absolute top-[136px] left-[120px]"
          aria-label="Survey progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
        >
          <div className="relative flex-1 grow bg-[#ddeeff] rounded-[100px] overflow-hidden border border-solid border-neutral-neutral-a800 h-6">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-[#8bc5ff] rounded-[100px] transition-all duration-300"
            />
          </div>
        </div>

        {/* Question Text */}
        <p className="absolute w-[calc(100%_-_253px)] top-[271px] left-[120px] [font-family:'HYWenHei-85W',Helvetica] font-normal text-[#8bc5ff] text-2xl tracking-[0] leading-[normal]">
          Question {step}: Bạn đã học code được bao lâu rồi?
        </p>

        {/* Radio Options List */}
        <fieldset className="flex flex-col w-[calc(100%_-_254px)] items-start gap-10 absolute top-[360px] left-[121px] border-0 p-0 m-0 min-w-0">
          <legend className="sr-only">Chọn thời gian bạn đã học code</legend>
          {options.map((option) => {
            const inputId = `${groupId}-${option.id}`;
            const checked = selectedOptions[step] === option.id;

            return (
              <label
                key={option.id}
                htmlFor={inputId}
                className={`h-[63px] px-6 gap-4 self-stretch w-full rounded border border-solid flex items-center relative cursor-pointer transition-colors duration-200 ${
                  checked
                    ? 'border-secondary-secondary-a90 bg-surface-tonal-tonal-a20'
                    : 'border-surface-tonal-tonal-a0 bg-surface-tonal-tonal-a10 hover:border-secondary-secondary-a50'
                }`}
              >
                <input
                  id={inputId}
                  type="radio"
                  name={`${groupId}-${step}`}
                  value={option.id}
                  checked={checked}
                  onChange={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [step]: option.id,
                    }))
                  }
                  className="sr-only"
                />
                <RadioIcon checked={checked} />
                <span className="justify-center w-fit [font-family:'HYWenHei-85W',Helvetica] font-normal text-[#8bc5ff] text-2xl text-center tracking-[0] leading-[normal] flex items-center relative">
                  {option.label}
                </span>
              </label>
            );
          })}
        </fieldset>

        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="flex w-[212px] h-12 items-center justify-center gap-2.5 p-2.5 absolute top-[772px] left-[121px] bg-surface-tonal-tonal-a20 rounded-[10px] border border-solid border-secondary-secondary-a70 cursor-pointer hover:bg-surface-tonal-tonal-a30 transition-colors"
          aria-label="Back"
        >
          <span className="relative w-fit [font-family:'Montserrat-Bold',Helvetica] font-bold text-secondary-secondary-a70 text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Back
          </span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="flex w-[212px] h-12 items-center justify-center gap-2.5 p-2.5 absolute top-[772px] left-[calc(100%_-_333px)] md:left-[485px] bg-surface-tonal-tonal-a20 rounded-[10px] border border-solid border-secondary-secondary-a70 cursor-pointer hover:bg-surface-tonal-tonal-a30 transition-colors"
          aria-label="Next"
        >
          <span className="relative w-fit [font-family:'Montserrat-Bold',Helvetica] font-bold text-secondary-secondary-a70 text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            {step < 4 ? 'Next' : 'Finish'}
          </span>
        </button>
      </section>
    </main>
  );
};

export default Survey;
```

## File: src/pages/TopNavigationSection.tsx

```typescript
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo2 from '@/components/ui/Logo2';
import UserIcon from '@/components/ui/UserIcon';

export const TopNavigationSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { problemId } = useParams<{ problemId: string }>();

  // Format problem title
  const getProblemTitle = (id?: string) => {
    if (!id) return 'Two Sum';
    return id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Stopwatch state
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');
  };

  return (
    <header
      className="absolute top-0 left-0 w-[1440px] h-[120px] bg-tonal-a0 border-b border-tonal-a20 flex items-center justify-between px-8 select-none z-20"
      data-id="top-navigation-section"
    >
      {/* Left Area: Back, Logo, Breadcrumb */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => navigate('/problems')}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-tonal-a30 hover:border-secondary-a50 hover:bg-tonal-a20 text-neutral-a200 hover:text-white transition-all cursor-pointer"
          aria-label="Back to problems"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Small logo container */}
        <div
          className="h-16 w-20 overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="scale-65 origin-center">
            <Logo2 />
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-tonal-a30" />

        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <span
            onClick={() => navigate('/problems')}
            className="text-neutral-a400 hover:text-secondary-a50 cursor-pointer font-medium transition-colors"
          >
            Problems
          </span>
          <span className="text-neutral-a600">/</span>
          <span className="text-white font-bold text-base">
            {getProblemTitle(problemId)}
          </span>
        </nav>
      </div>

      {/* Center Area: Stopwatch Timer */}
      <div className="flex items-center gap-4 bg-tonal-a10 border border-tonal-a20 px-5 py-2.5 rounded-full shadow-inner">
        <svg
          className={`w-5 h-5 ${isRunning ? 'text-secondary-a70 animate-pulse' : 'text-neutral-a400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span className="text-white font-mono font-bold text-lg tracking-wider min-w-[70px]">
          {formatTime(seconds)}
        </span>

        <div className="flex items-center gap-1.5 ml-2 border-l border-tonal-a30 pl-3">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="text-neutral-a300 hover:text-white transition-colors cursor-pointer"
            title={isRunning ? 'Pause Timer' : 'Start Timer'}
          >
            {isRunning ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setSeconds(0);
              setIsRunning(false);
            }}
            className="text-neutral-a300 hover:text-danger-a10 transition-colors cursor-pointer ml-1"
            title="Reset Timer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Area: Status and Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-white font-semibold text-sm">John Doe</span>
          <span className="text-success-a0 text-xs font-bold">PRO Member</span>
        </div>
        <UserIcon />
      </div>
    </header>
  );
};

export default TopNavigationSection;
```

## File: src/routes/index.tsx

```typescript

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

## File: src/components/dashboard/Problem.tsx

```typescript
interface ProblemProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
  title?: string;
  onReviewClick?: () => void;
}

export const Problem = ({
  difficulty = 'Easy',
  tags = [],
  title = '',
  onReviewClick,
}: ProblemProps): JSX.Element => {
  return (
    <div className="w-full h-24 px-8 bg-surface-a20 rounded-[20px] flex justify-between items-center overflow-hidden">
      <div className="flex flex-col justify-center items-start gap-2.5">
        <div className="text-white p5">{title}</div>
        <div className="flex justify-start items-center gap-2.5">
          <div className="h-6 px-3 py-1 bg-teal-400/40 rounded-sm flex justify-center items-center">
            <span className="text-success-a0 p8">{difficulty}</span>
          </div>
          <div className="h-6 px-3 py-1 bg-clr-info-a0 rounded-sm flex justify-center items-center">
            <span className="text-info-a20 p8">{tags[0]}</span>
          </div>
          <div className="h-6 px-3 py-1 bg-clr-info-a0 rounded-sm flex justify-center items-center">
            <span className="text-info-a20 p8">{tags[1]}</span>
          </div>
        </div>
      </div>
      <div
        className="text-secondary-a90 p7 cursor-pointer"
        onClick={onReviewClick}
      >
        Review now &gt;
      </div>
    </div>
  );
};

export default Problem;
```

## File: src/components/dashboard/Suggest.tsx

```typescript
import { useNavigate } from 'react-router-dom';
import { ExpandIcon } from '@/components/ui/ExpandIcon';
import { Problem } from '@/components/dashboard/Problem';

interface SuggestProps {
  onExpandClick?: () => void;
  onReviewClick?: () => void;
  title?: string;
}

export const Suggest = ({
  onExpandClick,
  title = '',
}: SuggestProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="w-145 min-h-140 p-8 bg-tonal-a20 rounded-[10px] flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-secondary-a50 h2 m-0">{title}</h2>
        <div
          className="w-8 h-9 flex items-center justify-center cursor-pointer rounded-sm"
          onClick={onExpandClick}
        >
          <ExpandIcon />
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <Problem
          difficulty="Easy"
          tags={['Array', 'Hash Table']}
          title="Two Sum"
          onReviewClick={() => navigate('/problems/two-sum')}
        />
        <Problem
          difficulty="Medium"
          tags={['Linked List', 'Two Pointers']}
          title="Add Two Numbers"
          onReviewClick={() => navigate('/problems/add-two-numbers')}
        />
        <Problem
          difficulty="Hard"
          tags={['Dynamic Programming', 'Graph']}
          title="Longest Palindromic Substring"
          onReviewClick={() =>
            navigate('/problems/longest-palindromic-substring')
          }
        />
      </div>
    </div>
  );
};

export default Suggest;
```

## File: src/components/notebook/NotebookFilter.tsx

```typescript
import React, { useState } from 'react';

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedCourses: string[];
  setSelectedCourses: (courses: string[]) => void;
}

export const NotebookFilter = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  selectedCourses,
  setSelectedCourses,
}: FilterProps) => {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  const tagOptions = ['Array', 'Math', 'Linked List', 'Hash Table'];
  const courseOptions = ['KTLT', 'DSA'];

  const handleTagSelect = (value: string) => {
    if (!selectedTags.includes(value))
      setSelectedTags([...selectedTags, value]);
    setIsTagOpen(false);
  };

  const handleCourseSelect = (value: string) => {
    if (!selectedCourses.includes(value))
      setSelectedCourses([...selectedCourses, value]);
    setIsCourseOpen(false);
  };

  const removeTag = (tag: string) =>
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  const removeCourse = (course: string) =>
    setSelectedCourses(selectedCourses.filter((c) => c !== course));

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex-1 h-[42px] bg-info-a0 rounded-[6px] px-3 flex items-center gap-2 border border-transparent focus-within:border-secondary-a70 transition-colors">
          <span className="p6 text-neutral-a50">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-neutral-a50 p6 placeholder:text-neutral-a50"
          />
        </div>

        <div className="relative w-[120px] h-[42px]">
          <div
            onClick={() => setIsTagOpen(!isTagOpen)}
            className="w-full h-full bg-info-a0 rounded-[6px] px-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-secondary-a70 transition-colors select-none"
          >
            <span className="text-white h7 font-bold">Tags</span>
            <span className="text-white text-xs opacity-70">▼</span>
          </div>

          {isTagOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-tonal-a20 rounded-[6px] border border-tonal-a30 overflow-hidden z-50 shadow-lg">
              {tagOptions.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="px-3 py-2 text-white p8 cursor-pointer hover:bg-primary-a20 transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-[120px] h-[42px]">
          <div
            onClick={() => setIsCourseOpen(!isCourseOpen)}
            className="w-full h-full bg-info-a0 rounded-[6px] px-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-secondary-a70 transition-colors select-none"
          >
            <span className="text-white h7 font-bold">Course</span>
            <span className="text-white text-xs opacity-70">▼</span>
          </div>

          {isCourseOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-tonal-a20 rounded-[6px] border border-tonal-a30 overflow-hidden z-50 shadow-lg">
              {courseOptions.map((course) => (
                <div
                  key={course}
                  onClick={() => handleCourseSelect(course)}
                  className="px-3 py-2 text-white p8 cursor-pointer hover:bg-primary-a20 transition-colors"
                >
                  {course}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(selectedTags.length > 0 || selectedCourses.length > 0) && (
        <div className="w-full flex flex-wrap gap-3 items-center mt-2">
          <span className="text-neutral-a50 p8 mr-2 italic">Filtered by:</span>
          {selectedCourses.map((course) => (
            <div
              key={course}
              className="flex items-center gap-2 px-3 py-1 bg-primary-a20 rounded-[20px]"
            >
              <span className="text-secondary-a10 p8 font-bold">{course}</span>
              <span
                onClick={() => removeCourse(course)}
                className="text-neutral-a50 hover:text-danger-a10 cursor-pointer font-bold ml-1 text-lg leading-none"
              >
                ×
              </span>
            </div>
          ))}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 px-3 py-1 bg-tonal-a20 border border-tonal-a30 rounded-[20px]"
            >
              <span className="text-white p8">{tag}</span>
              <span
                onClick={() => removeTag(tag)}
                className="text-neutral-a50 hover:text-danger-a10 cursor-pointer font-bold ml-1 text-lg leading-none"
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## File: src/components/notebook/NotebookHeader.tsx

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotebookHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="font-bold text-[40px] text-[#F2F2F2] leading-normal h1">
        Notebook
      </h1>
      <button
        onClick={() => navigate('/create-problem')}
        className="flex justify-center items-center px-10 py-3 gap-3 rounded-[10px] border border-secondary-a70 bg-tonal-a20 text-secondary-a10 h6 cursor-pointer hover:opacity-80 transition-opacity"
      >
        Create New Problem
      </button>
    </div>
  );
};
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

## File: src/components/ui/UserIcon.tsx

```typescript
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

## File: src/pages/CreateProblem.tsx

```typescript
import { useState } from 'react';
import SelectDropdown from '@/components/ui/SelectDropdown';
import ChipBoard from '@/components/ui/ChipBoard';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const TAG_OPTIONS = ['Array', 'Math', 'Linked List', 'Hash Table'];
const GROUP_OPTIONS = ['KTLT', 'DSA'];
const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

export const CreateProblem = (): JSX.Element => {
  const [name, setName] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [code, setCode] = useState(
    'int main() {\n  // Your code here\n  return 0;\n}',
  );

  const addChip = (prefix: string, value: string) => {
    const chip = `${prefix}: ${value}`;
    if (!chips.includes(chip)) {
      setChips((prev) => [...prev, chip]);
    }
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  const handleCancel = useNavigate();
  const handleCreate = () => {
    // Handle the creation logic here, e.g., send data to the server
    console.log('Creating problem with:', { name, chips, code });
    // After creation, navigate back to the notebook or another page
    handleCancel('/notebook');
  };

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-30 py-20 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <div className="bg-tonal-a20 w-full rounded-lg flex flex-col px-30 py-10 gap-10">
        <h1 className="text-neutral-a50 h1 text-center tracking-normal leading-tight uppercase">
          CREATING NEW PROBLEM
        </h1>

        <div className="flex items-center gap-4">
          <label htmlFor="problem-name" className="text-neutral-a50 h4">
            Name:
          </label>
          <input
            id="problem-name"
            type="text"
            placeholder="Enter problem name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 bg-secondary-a10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p4"
          />
        </div>

        <div className="flex gap-10">
          <SelectDropdown
            label="Select Tag"
            options={TAG_OPTIONS}
            onSelect={(value) => addChip('Tag', value)}
          />
          <SelectDropdown
            label="Select Group"
            options={GROUP_OPTIONS}
            onSelect={(value) => addChip('Group', value)}
          />
          <SelectDropdown
            label="Select Difficulty"
            options={DIFFICULTY_OPTIONS}
            onSelect={(value) => addChip('Difficulty', value)}
          />
        </div>

        <ChipBoard tags={chips} onRemove={removeChip} />

        <div>
          <p className="text-neutral-a50 h4 mb-10">Code Editor:</p>
          <textarea
            placeholder="Enter your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-2 bg-black ide4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
          />
        </div>

        <div className="flex justify-between items-center w-full mt-6">
          <Button
            className="w-fit flex items-center justify-center rounded-lg border-2 border-secondary-a70 px-6 py-2 h2 text-center"
            onClick={() => {
              // Handle save logic here
              handleCancel('/notebook');
            }}
          >
            {' '}
            Cancel
          </Button>
          <Button
            className="w-fit flex items-center justify-center rounded-lg border-2 border-secondary-a70 px-6 py-2 h2 text-center"
            onClick={() => {
              // Handle save logic here
              handleCreate();
            }}
          >
            {' '}
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
```

## File: src/pages/SignUp.tsx

```typescript
import { FormEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Sign } from '@/components/ui/Sign';

const signUpFields = [
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'username', label: 'Username', type: 'text', autoComplete: 'username' },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    id: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    autoComplete: 'new-password',
  },
] as const;

export const SignUp = (): JSX.Element => {
  const formId = useId();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (!email.trim() || !username.trim() || !password || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (!email.includes('@')) {
      alert('Email không hợp lệ!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    navigate('/survey');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a1222] px-4 py-10 select-none">
      <header className="flex justify-center items-center">
        <h1 className="text-[#e0e0e0] text-6xl h0 tracking-[0] leading-[normal] whitespace-nowrap">
          Sign Up
        </h1>
      </header>

      <form
        id={formId}
        onSubmit={handleSubmit}
        className="flex w-full max-w-[710px] h-[404px] relative mt-[60px] flex-col items-center gap-[60px] transition-all duration-300"
      >
        <Button className="hidden" type="submit">
          Submit
        </Button>

        {signUpFields.map((field) => {
          const inputId = `${formId}-${field.id}`;

          return (
            <div key={field.id} className="relative self-stretch w-full">
              <div className="relative w-full h-14 bg-surface-tonal-tonal-a10 rounded-[10px] overflow-hidden border border-solid border-surface-tonal-tonal-a0 shadow-[1px_4px_4px_#0c24ac]">
                <input
                  id={inputId}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  aria-label={field.label}
                  placeholder=" "
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="peer absolute inset-0 z-10 h-full w-full rounded-[10px] px-6 pt-[18px] pb-2 p6 text-neutral-neutral-a50 caret-secondary-secondary-a70 bg-transparent border-0 outline-none"
                />
                <label
                  htmlFor={inputId}
                  className="absolute top-[19px] left-6 p7 text-neutral-neutral-a50 text-base tracking-[0] leading-[normal] whitespace-nowrap pointer-events-none transition-opacity duration-150 peer-placeholder-shown:opacity-100 opacity-0"
                >
                  {field.label}
                </label>
              </div>
            </div>
          );
        })}
      </form>

      <Sign activeTab="signup" />
    </main>
  );
};

export default SignUp;
```

## File: src/vite-env.d.ts

```typescript
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
```

## File: tsconfig.app.tsbuildinfo

```
{"root":["./src/app.tsx","./src/main.tsx","./src/vite-env.d.ts","./src/components/dashboard/problem.tsx","./src/components/dashboard/suggest.tsx","./src/components/ui/button.tsx","./src/components/ui/expandicon.tsx","./src/components/ui/logo.tsx","./src/components/ui/logo2.tsx","./src/components/ui/mainnavigation.tsx","./src/components/ui/tab.tsx","./src/components/ui/usericon.tsx","./src/pages/codedescription.tsx","./src/pages/codeeditorsection.tsx","./src/pages/dashboard.tsx","./src/pages/forgetpassword.tsx","./src/pages/home.tsx","./src/pages/notebook.tsx","./src/pages/problem.tsx","./src/pages/problemtabssection.tsx","./src/pages/signup.tsx","./src/pages/survey.tsx","./src/pages/topnavigationsection.tsx","./src/routes/index.tsx"],"version":"5.6.3"}
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

## File: src/components/notebook/NotebookProblem.tsx

```typescript
interface NotebookProblemProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const NotebookProblem = ({
  id,
  title,
  description,
  tags,
  difficulty,
  isFavorite = false,
  onToggleFavorite,
}: NotebookProblemProps) => {
  const getDifficultyBg = () => {
    if (difficulty === 'Easy') return 'bg-success-a0';
    if (difficulty === 'Medium') return 'bg-warning-a20';
    return 'bg-danger-a0';
  };

  return (
    <div className="flex flex-col bg-primary-a0 rounded-[20px] p-5 gap-4 h-full">
      <div className="flex justify-between items-start">
        <span className="h4 text-secondary-a10">{id}.</span>

        <div
          onClick={onToggleFavorite}
          className="flex items-center gap-1 p8 text-neutral-a50 cursor-pointer hover:text-white transition-colors select-none"
        >
          <span>{isFavorite ? '★ Favorited' : '☆ Favorite'}</span>
        </div>
      </div>

      <h3 className="h4 text-neutral-a50 m-0">{title}</h3>

      <div className="bg-primary-a20 rounded-[10px] p-3 flex-1">
        <p className="p8 text-neutral-a50 line-clamp-10 m-0">{description}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <span className="h7 text-neutral-a50">Tags</span>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag, index) => (
            <span key={index} className="p9 text-neutral-a50">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end mt-auto pt-4">
        <div className="flex flex-col gap-2">
          <span className="h7 text-neutral-a50">Difficulty</span>
          <div
            className={`px-3 pt-0 pb-1 rounded-[40px] flex justify-center items-center w-fit ${getDifficultyBg()}`}
          >
            <span className="p9 font-bold text-tonal-a0">{difficulty}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 p6 text-secondary-a10 cursor-pointer">
          ↗ Open
        </div>
      </div>
    </div>
  );
};
```

## File: src/components/ui/Logo2.tsx

```typescript
export const Logo2 = (): JSX.Element => {
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
          d="M42.0754 104.147C42.073 104.147 42.0701 104.146 42.0676 104.146C45.7489 104.144 49.4302 104.141 53.1116 104.138C49.4328 104.141 45.7541 104.145 42.0754 104.147ZM126.047 37.0048C129.165 37.0052 131.484 38.8869 131.992 41.8739C132.111 42.5706 132.105 43.3002 132.106 44.0146C132.124 61.7872 132.135 79.5603 132.148 97.3329C132.151 101.74 130.009 104.141 126.033 104.142C124.788 104.142 123.543 104.141 122.297 104.141C126.088 104.129 128.129 101.858 128.126 97.6952C128.114 80.8678 128.104 64.0402 128.087 47.2128C128.086 46.5365 128.092 45.8459 127.979 45.1864C127.492 42.3583 125.269 40.5775 122.282 40.5771C108.922 40.5758 95.5616 40.5761 82.2014 40.5761V40.6444C68.8414 40.6444 55.4814 40.6457 42.1213 40.6444C38.4183 40.644 36.3526 42.881 36.3167 46.9315C36.3161 45.9 36.3151 44.8684 36.3147 43.8368C36.3128 39.4833 38.4744 37.0768 42.3752 37.0771C56.3204 37.0783 70.266 37.0771 84.2112 37.0771V37.0048C98.1564 37.0048 112.102 37.0035 126.047 37.0048ZM41.344 85.4706C41.5669 85.9647 42.2304 85.87 42.7327 85.87C55.3816 85.8717 68.031 85.8681 80.6799 85.8651C80.7092 85.9457 80.7252 86.0381 80.7219 86.1444C80.7087 86.5713 80.4313 86.7964 80.05 86.83C79.8677 86.8459 79.6833 86.8378 79.5002 86.8378C67.1549 86.8407 54.8085 86.8443 42.4631 86.8427C41.8681 86.8427 41.0369 86.9794 41.0598 86.0302C41.0677 85.7119 41.1804 85.5494 41.344 85.4706Z"
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

export default Logo2;
```

## File: src/pages/Dashboard.tsx

```typescript
import { useNavigate } from 'react-router-dom';
import { Suggest } from '@/components/dashboard/Suggest';
import { MainNavigation } from '@/components/ui/MainNavigation';

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>
      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col justify-between items-stretch overflow-hidden select-none gap-10">
        <div className="self-stretch flex-1 flex flex-row justify-center items-center py-1 gap-10">
          <div>
            <Suggest
              onExpandClick={() => {
                navigate('/problems');
              }}
              onReviewClick={() => {
                const cardId = '0';
                navigate(cardId ? '' : '/ide');
              }}
              title={'Suggested Problems'}
            />
          </div>
          <div>
            <Suggest
              onExpandClick={() => {
                navigate('/notebook');
              }}
              onReviewClick={() => {}}
              title="Your Notebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
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

## File: src/pages/Problem.tsx

```typescript
import React, { useState, useEffect } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { ProblemFilter } from '@/components/problem/ProblemFilter';
import { ProblemTable } from '@/components/problem/ProblemTable';
import { Pagination } from '@/components/notebook/Pagination';
import { mockProblemList } from '@/components/problem/problemMockData';

export const Problem = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCourses]);

  const filteredProblems = mockProblemList.filter((problem) => {
    const matchSearch = problem.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => problem.tags.includes(tag));

    const matchCourses =
      selectedCourses.length === 0 || selectedCourses.includes(problem.group);

    return matchSearch && matchTags && matchCourses;
  });

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = filteredProblems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>

      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-10 flex flex-col items-center overflow-hidden select-none">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">
          <h1
            className="font-bold text-[40px] text-[#F2F2F2] leading-normal"
            style={{ fontFamily: "'SFU Futura', sans-serif" }}
          >
            Problem
          </h1>

          <ProblemFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />

          <ProblemTable problems={currentProblems} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
```

## File: src/components/ui/MainNavigation.tsx

```typescript
import React from 'react';
import Logo2 from '@/components/ui/Logo2';
import Tab from '@/components/ui/Tab';
import UserIcon from '@/components/ui/UserIcon';
import { useNavigate, useLocation } from 'react-router-dom';

export const MainNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from current URL pathname
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/problems') || path.startsWith('/problem'))
      return 'PROBLEM';
    if (path.startsWith('/notebook')) return 'NOTEBOOK';
    return 'DASHBOARD';
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-full bg-tonal-a10 rounded-[5px] inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
      <div className="self-stretch h-28 px-8 bg-tonal-a0 inline-flex flex-row justify-between items-center overflow-hidden">
        <div
          className="flex items-center justify-start px-10 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <Logo2 />
        </div>

        <div className="flex items-center gap-2 h-full">
          <Tab
            isActive={activeTab === 'DASHBOARD'}
            onClick={() => navigate('/dashboard')}
          >
            DASHBOARD
          </Tab>

          <Tab
            isActive={activeTab === 'PROBLEM'}
            onClick={() => navigate('/problems')}
          >
            PROBLEM
          </Tab>

          <Tab
            isActive={activeTab === 'NOTEBOOK'}
            onClick={() => navigate('/notebook')}
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

  /* Anima Compatibility Colors */
  --color-neutral-neutral-a50: var(--color-neutral-a50);
  --color-neutral-neutral-a100: var(--color-neutral-a100);
  --color-neutral-neutral-a200: var(--color-neutral-a200);
  --color-neutral-neutral-a300: var(--color-neutral-a300);
  --color-neutral-neutral-a400: var(--color-neutral-a400);
  --color-neutral-neutral-a500: var(--color-neutral-a500);
  --color-neutral-neutral-a600: var(--color-neutral-a600);
  --color-neutral-neutral-a700: var(--color-neutral-a700);
  --color-neutral-neutral-a800: var(--color-neutral-a800);
  --color-neutral-neutral-a900: var(--color-neutral-a900);

  --color-primary-primary-a0: var(--color-primary-a0);
  --color-primary-primary-a10: var(--color-primary-a10);
  --color-primary-primary-a20: var(--color-primary-a20);
  --color-primary-primary-a30: var(--color-primary-a30);
  --color-primary-primary-a40: var(--color-primary-a40);
  --color-primary-primary-a50: var(--color-primary-a50);
  --color-primary-primary-a60: var(--color-primary-a60);

  --color-secondary-secondary-a10: var(--color-secondary-a10);
  --color-secondary-secondary-a30: var(--color-secondary-a30);
  --color-secondary-secondary-a50: var(--color-secondary-a50);
  --color-secondary-secondary-a70: var(--color-secondary-a70);
  --color-secondary-secondary-a90: var(--color-secondary-a90);

  --color-status-danger-danger-a0: var(--color-danger-a0);
  --color-status-danger-danger-a10: var(--color-danger-a10);
  --color-status-danger-danger-a20: var(--color-danger-a20);

  --color-status-discovery-discovery-a10: var(--color-discovery-a10);
  --color-status-discovery-discovery-a30: var(--color-discovery-a30);
  --color-status-discovery-discovery-a50: var(--color-discovery-a50);
  --color-status-discovery-discovery-a70: var(--color-discovery-a70);
  --color-status-discovery-discovery-a90: var(--color-discovery-a90);

  --color-status-info-info-a0: var(--color-info-a0);
  --color-status-info-info-a10: var(--color-info-a10);
  --color-status-info-info-a20: var(--color-info-a20);

  --color-status-success-success-a0: var(--color-success-a0);
  --color-status-success-success-a10: var(--color-success-a10);
  --color-status-success-success-a20: var(--color-success-a20);

  --color-status-warning-warning-a0: var(--color-warning-a0);
  --color-status-warning-warning-a10: var(--color-warning-a10);
  --color-status-warning-warning-a20: var(--color-warning-a20);

  --color-surface-surface-a0: var(--color-surface-a0);
  --color-surface-surface-a10: var(--color-surface-a10);
  --color-surface-surface-a20: var(--color-surface-a20);
  --color-surface-surface-a30: var(--color-surface-a30);
  --color-surface-surface-a40: var(--color-surface-a40);
  --color-surface-surface-a50: var(--color-surface-a50);

  --color-surface-tonal-tonal-a0: var(--color-tonal-a0);
  --color-surface-tonal-tonal-a10: var(--color-tonal-a10);
  --color-surface-tonal-tonal-a20: var(--color-tonal-a20);
  --color-surface-tonal-tonal-a30: var(--color-tonal-a30);
  --color-surface-tonal-tonal-a40: var(--color-tonal-a40);
  --color-surface-tonal-tonal-a50: var(--color-tonal-a50);

  /* Anima Compatibility Font Families */
  --font-h0: 'SFU Futura', sans-serif;
  --font-h00: 'SFU Futura', sans-serif;
  --font-heading-h1: 'SFU Futura', sans-serif;
  --font-heading-h2: 'SFU Futura', sans-serif;
  --font-heading-h3: 'SFU Futura', sans-serif;
  --font-heading-h4: 'SFU Futura', sans-serif;
  --font-heading-h5: 'SFU Futura', sans-serif;
  --font-heading-h6: 'SFU Futura', sans-serif;
  --font-heading-h7: 'SFU Futura', sans-serif;
  --font-heading-h8: 'SFU Futura', sans-serif;
  --font-IDE-1: 'JetBrains Mono', monospace;
  --font-IDE-2: 'JetBrains Mono', monospace;
  --font-IDE-3: 'JetBrains Mono', monospace;
  --font-IDE-4: 'JetBrains Mono', monospace;
  --font-paragraph-p1: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p2: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p3: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p4: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p5: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p6: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p7: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p8: 'UTM Neo Sans Intel', sans-serif;
  --font-paragraph-p9: 'UTM Neo Sans Intel', sans-serif;
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

@font-face {
  font-family: 'HYWenHei-85W';
  src: url('/fonts/zhcn.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
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

## File: src/pages/Notebook.tsx

```typescript
import { useState, useEffect, useMemo } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { NotebookHeader } from '@/components/notebook/NotebookHeader';
import { NotebookFilter } from '@/components/notebook/NotebookFilter';
import { NotebookProblem } from '@/components/notebook/NotebookProblem';
import { Pagination } from '@/components/notebook/Pagination';
import {
  mockProblems as initialProblems,
  ProblemType,
} from '@/components/notebook/MockData';

export const Notebook = (): JSX.Element => {
  const [problems, setProblems] = useState<ProblemType[]>(initialProblems);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCourses]);

  const handleToggleFavorite = (id: string) => {
    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.id === id
          ? { ...problem, isFavorite: !problem.isFavorite }
          : problem,
      ),
    );
  };

  const processedProblems = useMemo(() => {
    const result = problems.filter((problem) => {
      const matchSearch = problem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => problem.tags.includes(tag));
      const matchCourses =
        selectedCourses.length === 0 ||
        selectedCourses.every((course) => problem.tags.includes(course));
      return matchSearch && matchTags && matchCourses;
    });
    result.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    return result;
  }, [problems, searchQuery, selectedTags, selectedCourses]);

  const totalPages = Math.ceil(processedProblems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = processedProblems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>

      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col items-center overflow-hidden select-none gap-10 pb-20">
        <div className="w-full max-w-300 flex flex-col gap-10 mt-5">
          <NotebookHeader />

          <NotebookFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />

          {currentProblems.length > 0 ? (
            <div className="w-full grid grid-cols-3 gap-20">
              {currentProblems.map((problem) => (
                <NotebookProblem
                  key={problem.id}
                  id={problem.id}
                  title={problem.title}
                  description={problem.description}
                  tags={problem.tags}
                  difficulty={problem.difficulty}
                  isFavorite={problem.isFavorite}
                  onToggleFavorite={() => handleToggleFavorite(problem.id)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-20 text-neutral-a50 p6">
              No exercises were found that match your filters.
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notebook;
```

## File: src/pages/Home.tsx

```typescript
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
                navigate('/signup');
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

## File: src/App.tsx

```typescript
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Notebook from './pages/Notebook';
import Problem from './pages/Problem';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';
import { Survey } from './pages/Survey';
import Ide from './pages/Ide';
import { CreateProblem } from './pages/CreateProblem';
// import CodeDescription from './pages/CodeDescription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notebook" element={<Notebook />} />

      <Route path="/problems" element={<Problem />} />
      <Route path="/problems/:problemSlug" element={<Ide />} />
      <Route path="/create-problem" element={<CreateProblem />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/survey" element={<Survey />} />
    </Routes>
  );
}

export default App;
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
    "axios": "^1.18.0",
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
