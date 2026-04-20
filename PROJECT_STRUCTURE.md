# Project Folder Structure Documentation

## Root-Level Files

- **eslint.config.mjs**: ESLint configuration for code linting and style enforcement.
- **next-env.d.ts**: TypeScript definitions for Next.js.
- **next.config.ts**: Next.js configuration file.
- **package.json**: Project metadata, scripts, and dependencies.
- **README.md**: Project overview and instructions.
- **tsconfig.json**: TypeScript compiler configuration.

## Folders

### public/
- Static assets served directly (images, robots.txt, sitemap.xml, etc.).
- Subfolders like `Images/`, `logos/` organize images by feature or page.

### scripts/
- Utility scripts for project maintenance (e.g., `update-page-metadata.mjs`).

### src/
- Main source code for the application.

#### src/app/
- Next.js app directory (routing, pages, layouts, global styles).
- Each subfolder (e.g., `About-us/`, `Blogs/`, `Careers/`) represents a route/page.
- `globals.css`, `homepage.module.css`, etc.: Global and page-specific styles.

#### src/assets/
- Project-specific static assets (banners, logos, etc.) used in components.

#### src/components/
- Reusable React components organized by feature or page.
- Subfolders group related components (e.g., `About-Us/`, `BlogPage/`, `Common/`).
- `Common/`: Shared UI elements (buttons, banners, cards, etc.).

#### src/styles/
- Global CSS files for design tokens and typography.

---

This structure helps maintain clarity, scalability, and separation of concerns in your Next.js project. Each folder and file has a specific responsibility, making the codebase easier to navigate and maintain.
