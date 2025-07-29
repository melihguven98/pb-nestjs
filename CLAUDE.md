# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Peoplebox ATS (Applicant Tracking System) built with NestJS backend, Next.js frontend, PostgreSQL database, and Redis for caching/queuing. The project uses Docker Compose for local development with nginx as reverse proxy.

## Development Commands

### Backend (NestJS)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Development
npm run start:dev        # Watch mode development server
npm run start:debug      # Debug mode with watch
npm run build           # Build for production
npm run start:prod      # Run production build

# Testing
npm run test            # Unit tests
npm run test:watch      # Unit tests in watch mode
npm run test:e2e        # End-to-end tests
npm run test:cov        # Test coverage

# Code quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier formatting
```

### Frontend (Next.js)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Development
npm run dev             # Development server (port 3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Next.js linting
```

### Docker Development
```bash
# Run entire stack
docker-compose up -d

# Build and run
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs backend
docker-compose logs frontend
```

Access points:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Full stack via nginx: http://localhost:8000
- PostgreSQL: localhost:5432

## Architecture

### Current Structure
The project is in early development stage with basic NestJS and Next.js scaffolding:

**Backend** (`backend/src/`):
- Standard NestJS structure with `app.controller.ts`, `app.service.ts`, `app.module.ts`
- TypeORM integration configured
- PostgreSQL database connection

**Frontend** (`frontend/src/app/`):
- Next.js 15 with App Router
- TailwindCSS for styling
- TypeScript configuration

### Planned Architecture (from context.md)
The project will follow Clean Architecture principles:

**Backend Structure**:
- `domain/` - Entities and interfaces
- `application/` - Use-case services
- `infrastructure/` - Database, mail, queue external dependencies
- `presentation/` - Controllers and DTOs

**Key Features to Implement**:
- JWT-based authentication
- TypeORM with PostgreSQL
- Redis for caching and queues
- Role-based access control
- Clean Architecture layers

### Database
- PostgreSQL 16 with TypeORM
- Future tables: users, projects, candidates, tasks, questions, replies
- Multi-tenant support planned (subdomain or schema-based)

### Services Architecture
- **Backend**: NestJS API server (port 3001 in Docker)
- **Frontend**: Next.js application (port 3000 in Docker)
- **Database**: PostgreSQL 16 (port 5432)
- **Reverse Proxy**: nginx routes `/api/*` to backend, everything else to frontend

## Environment Setup
- Uses `.env` file for environment variables
- Docker Compose handles service orchestration
- Both backend and frontend have separate package.json files

## Testing Strategy
- Backend: Jest for unit tests, Supertest for e2e tests
- Frontend: Next.js built-in testing capabilities
- Coverage reports available via `npm run test:cov`