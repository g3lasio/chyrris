# Chyrris Technologies - Futuristic AI Solutions Platform

## Overview

Chyrris Technologies is a modern web application showcasing AI-powered solutions for corporate finance and executive management. The platform features a futuristic, Iron Man-inspired interface with HUD-style elements, particle effects, and holographic design patterns. It serves as both a company portfolio and a launching point for various AI applications, including the Tzotzil Bible app - a bilingual Bible with AI assistant capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18+ with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **Styling:** Tailwind CSS v4 with custom theming
- **UI Components:** Radix UI primitives with shadcn/ui components
- **Animations:** Framer Motion for sophisticated UI transitions
- **State Management:** TanStack Query (React Query) for server state

**Design System:**
- Custom futuristic theme with Iron Man-inspired color palette (blues, golds, reds, teals)
- HUD-style components with holographic effects
- Particle backgrounds and scan line animations
- Responsive design with mobile-first approach
- Custom fonts: Quantico and Rajdhani for tech aesthetic

**Component Architecture:**
- Shared UI components (`@/components/ui/*`) based on Radix primitives
- Custom visual effects components (ParticleBackground, ScanEffect, HolographicCard, etc.)
- Page-level components organized by route
- Section-based layout (Hero, About, Technologies, Applications, Contact, Footer)

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Build Tool:** Vite for development, esbuild for production
- **Development:** tsx for TypeScript execution

**API Design:**
- RESTful API endpoints under `/api` prefix
- Contact form submission endpoint (`POST /api/contact`)
- Zod schema validation for request/response data
- In-memory storage abstraction with interface pattern for future database integration

**Chosen Approach:**
- Monorepo structure with shared types between client and server
- Server-side rendering preparation with Vite middleware in development
- Static file serving in production
- Path aliases for clean imports (`@/`, `@shared/`)

**Rationale:**
- Express provides flexibility for API development while maintaining simplicity
- Vite offers superior development experience with HMR and fast builds
- TypeScript throughout ensures type safety across the stack
- Shared schema enables consistent validation on both client and server

### Data Storage Solutions

**Current Implementation:**
- In-memory storage (`MemStorage` class) for development
- Storage interface pattern (`IStorage`) for easy database swapping

**Database Configuration:**
- **ORM:** Drizzle ORM configured for PostgreSQL
- **Provider:** Neon serverless PostgreSQL
- **Schema Location:** `shared/schema.ts`
- **Migrations:** Drizzle Kit with migrations in `/migrations` directory

**Database Schema:**
- Users table with id, username, password fields
- Zod schemas derived from Drizzle tables for validation
- Session management prepared with `connect-pg-simple`

**Design Decision:**
The application is architected to support PostgreSQL through Drizzle ORM, though the database may not be currently provisioned. The storage abstraction layer allows seamless transition from in-memory to database-backed storage without changing business logic.

### Internationalization (i18n)

**Implementation:**
- Custom language context provider (`LanguageProvider`)
- Support for English and Spanish
- Translation files: `client/src/translations/en.ts` and `es.ts`
- Language preference persisted in localStorage
- Browser language detection for initial language selection
- Language switcher component with multiple variants (minimal, default, full)

**Approach Benefits:**
- Lightweight custom solution avoids heavy i18n library dependencies
- Type-safe translations through TypeScript
- Consistent API across all components via React Context
- Easy to extend to additional languages

### Build and Deployment

**Development:**
- Vite dev server with HMR
- Express backend with auto-reload via tsx
- Concurrent client/server development

**Production:**
- Vite builds optimized client bundle to `dist/public`
- esbuild bundles server code to `dist/index.js`
- Static file serving from production build
- Environment-based configuration

**Scripts:**
- `npm run dev` - Development mode
- `npm run build` - Production build
- `npm start` - Production server
- `npm run db:push` - Database schema push

## External Dependencies

### Third-Party Services

**Database:**
- Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- Connection via `DATABASE_URL` environment variable
- Configured but may require provisioning

**Development Tools:**
- Replit-specific integrations for development environment
- Vite plugin for runtime error overlay
- Cartographer plugin for Replit code navigation

### Key NPM Packages

**UI and Styling:**
- `@radix-ui/*` - Accessible UI primitives
- `tailwindcss` - Utility-first CSS framework
- `framer-motion` - Animation library
- `lucide-react` - Icon system
- `class-variance-authority` - Component variant handling

**Data Management:**
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `drizzle-orm` - PostgreSQL ORM
- `drizzle-zod` - Zod schema generation from Drizzle

**Utilities:**
- `date-fns` - Date manipulation
- `nanoid` - Unique ID generation
- `cmdk` - Command menu primitives

**Backend:**
- `express` - Web server framework
- `connect-pg-simple` - PostgreSQL session store

### External Assets

- Unsplash images for visual content
- Google Fonts: Quantico and Rajdhani
- Custom logo at `/chyrris-logo.png`

### Deployed Applications

The Chyrris Technologies platform showcases three main applications in the Applications section:

**Tzotzil Bible (Deployed):**
- Production URL: https://bible.chyrris.com/
- Status: Live and accessible
- Description: Bilingual Bible application with Spanish and Tzotzil dialect translations
- Features AI assistant capabilities for spiritual guidance

**Owl Fenc App (Deployed):**
- Production URL: https://app.owlfenc.com
- Status: Live and accessible
- Description: AI-powered estimation generator for contractors
- Provides precise cost calculations and material requirements for construction projects

**Andy AI (In Development):**
- Status: Not yet deployed
- Description: Corporate finance management and credit optimization platform
- Planned features: Advanced AI for financial analysis, prediction, and optimization

**Link Implementation:**
- External links (to deployed apps) open in new tabs with `target="_blank"` and `rel="noopener noreferrer"`
- AppCard component automatically detects external URLs (starting with http/https) and renders them as external links
- Internal routes use wouter's Link component for client-side navigation

### API Integrations

Currently, the application uses internal APIs only. Future integrations may include:
- AI/ML services for the Nevin assistant in Tzotzil Bible app
- Email services for contact form notifications
- Analytics platforms for usage tracking