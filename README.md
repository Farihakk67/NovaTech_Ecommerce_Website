# NovaTech — Premium eCommerce Platform

A production-quality, fully responsive eCommerce website for the fictional consumer electronics brand **NovaTech**. Built as a portfolio-worthy frontend project demonstrating modern React architecture, premium UI/UX design, comprehensive eCommerce features, Docker containerization, automated testing, and CI/CD.

![NovaTech Preview](./docs/screenshots/hero.png)

## Project Overview

NovaTech is a complete eCommerce experience featuring 30 electronics products across 10 categories. The design is entirely original — modern, elegant, premium, and minimal — crafted to impress technical recruiters and stand out in frontend design challenges.

The project follows professional software engineering practices including Docker deployment, ESLint/Prettier code quality tooling, Husky pre-commit hooks, Vitest unit tests, and GitHub Actions CI/CD.

## Features

### Core Pages

- **Home** — Hero, featured products, categories, why choose us, trending, testimonials, newsletter, brand logos, CTA
- **Shop** — Product grid with search, filtering, sorting, and pagination
- **Product Details** — Gallery, specs, reviews, quantity selector, related products, breadcrumbs
- **About** — Company story, mission, vision, values, stats, team, timeline
- **Contact** — Validated form, map, contact info, social links

### eCommerce Features

- Shopping cart with responsive drawer
- Wishlist with localStorage persistence
- Live product search
- Category, price, and rating filters
- Product sorting (6 options)
- Pagination, quick view modal
- Product badges, discount labels
- Recently viewed products

### UX & Design

- Dark mode with custom palette
- Framer Motion animations
- Loading skeletons, toast notifications
- Back to top button, lazy-loaded images
- Glassmorphism effects, 8px spacing system

### Professional Engineering

- Docker multi-stage production build
- ESLint + Prettier + Husky + lint-staged
- Vitest + React Testing Library (32 tests)
- GitHub Actions CI pipeline
- Vercel & Netlify deployment ready

## Tech Stack

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| React 19              | UI library                  |
| Vite 8                | Build tool & dev server     |
| TypeScript            | Type safety                 |
| Tailwind CSS 4        | Utility-first styling       |
| React Router 7        | Client-side routing         |
| Framer Motion         | Animations                  |
| React Icons           | Iconography                 |
| Context API           | State management            |
| Vitest                | Unit & component testing    |
| React Testing Library | Component test utilities    |
| ESLint + Prettier     | Code quality & formatting   |
| Husky + lint-staged   | Pre-commit automation       |
| Docker + Nginx        | Production containerization |
| GitHub Actions        | CI/CD pipeline              |

## Folder Structure

```
src/
├── components/
│   ├── cart/          # Cart drawer
│   ├── common/        # Toast, breadcrumb, skeletons, scroll reveal
│   ├── home/          # Home page sections
│   ├── layout/        # Navbar, footer
│   ├── product/       # Product cards, quick view, recently viewed
│   └── ui/            # Reusable primitives (Button, Input, Badge)
├── context/           # Cart, wishlist, theme, toast, recently viewed
├── data/              # Products, categories, company data
├── hooks/             # useLocalStorage, useDebounce, useScrollPosition
├── layouts/           # Main layout wrapper
├── pages/             # Route pages
├── services/          # Storage utilities
├── styles/            # Global CSS and Tailwind theme
├── test/              # Test setup and utilities
├── types/             # TypeScript interfaces
├── utils/             # Formatting, filtering, sorting helpers
└── constants/         # App-wide constants
```

## Installation

```bash
# Clone the repository
git clone https://github.com/Farihakk67/NovaTech_Ecommerce_Website.git
cd NovaTech_Ecommerce_Website

# Install dependencies
npm install
```

## Available Scripts

| Script                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Start development server at http://localhost:5173 |
| `npm run build`         | Type-check and build for production               |
| `npm run preview`       | Preview production build locally                  |
| `npm run lint`          | Run ESLint across the project                     |
| `npm run lint:fix`      | Auto-fix ESLint issues                            |
| `npm run format`        | Format code with Prettier                         |
| `npm run format:check`  | Check formatting without writing                  |
| `npm run test`          | Run tests in watch mode                           |
| `npm run test:run`      | Run all tests once                                |
| `npm run test:coverage` | Run tests with coverage report                    |

## Docker Setup

The application uses a multi-stage Docker build with Nginx for production serving.

```bash
# Build the Docker image
docker build -t novatech-store .

# Run the container
docker run -p 3000:80 novatech-store
```

The application will be accessible at:

```
http://localhost:3000
```

### Docker Architecture

- **Stage 1 (builder):** Node.js 20 Alpine — installs dependencies and builds the Vite production bundle
- **Stage 2 (production):** Nginx 1.27 Alpine — serves static files with gzip, caching, and SPA routing

## Testing Instructions

Tests are written with Vitest and React Testing Library.

```bash
# Run all tests
npm run test:run

# Run tests in watch mode during development
npm run test

# Generate coverage report
npm run test:coverage
```

### Test Coverage

| Area           | Test File                  | Tests                                 |
| -------------- | -------------------------- | ------------------------------------- |
| Navbar         | `Navbar.test.tsx`          | Navigation, mobile menu, search, cart |
| Product Card   | `ProductCard.test.tsx`     | Rendering, cart, wishlist, quick view |
| Product Search | `productSearch.test.ts`    | Search by name, category, tags        |
| Shopping Cart  | `CartContext.test.tsx`     | Add, remove, persist, drawer          |
| Wishlist       | `WishlistContext.test.tsx` | Add, remove, toggle, persist          |
| Dark Mode      | `ThemeContext.test.tsx`    | Toggle, persist, navbar integration   |

## Deployment Guide

### Vercel (Recommended)

1. Push the repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no extra configuration needed
4. `vercel.json` handles SPA routing

```bash
npm install -g vercel
vercel
```

### Netlify

1. Connect your GitHub repository at [netlify.com](https://netlify.com)
2. Build settings are configured in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. SPA redirects are handled automatically

```bash
npm run build
# Deploy the dist/ folder via Netlify CLI or dashboard
```

### Docker (Self-Hosted)

```bash
docker build -t novatech-store .
docker run -d -p 3000:80 --name novatech novatech-store
```

## CI/CD

GitHub Actions runs automatically on push and pull requests to `main`/`master`:

1. Install dependencies (`npm ci`)
2. Run ESLint (`npm run lint`)
3. Run all tests (`npm run test:run`)
4. Build production bundle (`npm run build`)

Workflow file: `.github/workflows/ci.yml`

## Git Workflow

Suggested conventional commit history:

```
feat: initialize project with Vite, React, TypeScript, and Tailwind CSS
feat: add product data, types, and utility functions
feat: implement context providers for cart, wishlist, theme, and toast
feat: build reusable UI components and layout (navbar, footer)
feat: create home page with hero, featured products, and testimonials
feat: implement shop page with filtering, sorting, and pagination
feat: add product detail page with gallery, reviews, and related products
feat: build about and contact pages with form validation
feat: add dark mode, animations, lazy loading, and accessibility
test: add component and context tests with Vitest
chore: configure Docker multi-stage build with Nginx
chore: setup ESLint, Prettier, Husky, and lint-staged
ci: add GitHub Actions workflow for lint, test, and build
docs: update README with Docker, testing, and deployment guide
```

## Future Improvements

- [ ] Backend integration (REST API or GraphQL)
- [ ] User authentication and order history
- [ ] Payment gateway integration (Stripe)
- [ ] Product comparison feature
- [ ] Multi-language support (i18n)
- [ ] PWA with offline support
- [ ] E2E tests with Playwright
- [ ] Storybook for component documentation
- [ ] Admin dashboard for product management
- [ ] Kubernetes deployment manifests

## Screenshots

> Place screenshots in `docs/screenshots/` after running the project.

| Page           | File                             |
| -------------- | -------------------------------- |
| Home Hero      | `docs/screenshots/hero.png`      |
| Shop           | `docs/screenshots/shop.png`      |
| Product Detail | `docs/screenshots/product.png`   |
| Dark Mode      | `docs/screenshots/dark-mode.png` |
| Mobile         | `docs/screenshots/mobile.png`    |

## License

This project is for portfolio and educational purposes.

---

Built with precision for professional portfolios. **NovaTech — Engineered for Tomorrow.**
