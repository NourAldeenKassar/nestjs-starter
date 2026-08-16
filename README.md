# NestJS Starter

Production-ready NestJS starter with authentication, email, rate limiting, Docker, and CI/CD.

## What's Included

- **NestJS 11** with TypeScript
- **Prisma 7** ORM with PostgreSQL
- **JWT Authentication** (register, login, protected routes)
- **Rate Limiting** via @nestjs/throttler (5 req/min on login)
- **Email** via Resend SDK (plug-and-play email service)
- **Docker** multi-stage build with auto-migration on startup
- **CI/CD** with GitHub Actions (test, build, push to GHCR)
- **Dependabot** for automated dependency updates
- **Pre-push hook** to block pushes with failing tests

## Getting Started

```bash
# Clone and set up
git clone git@github.com:NourAldeenKassar/nestjs-starter.git my-project
cd my-project
rm -rf .git && git init

# Install and configure
npm install
cp .env.example .env

# Start dev (runs PostgreSQL in Docker + NestJS in watch mode)
npm run dev

# Run first migration
npx prisma migrate dev --name init

# Seed default user (optional): admin@example.com / password123
npx prisma db seed
```

## Docker

```bash
# Local development
docker compose up

# Production build
docker build -t my-app .
docker run -e DATABASE_URL=... -e JWT_SECRET=... -p 3000:3000 my-app
```

The Docker image runs migrations automatically on startup.

## CI/CD

The GitHub Actions pipeline runs on every push to main:

1. **build** -- installs, lints, builds, tests
2. **docker** -- builds and pushes image to `ghcr.io/<your-org>/<your-repo>:latest`

Uses GHCR (GitHub Container Registry) with `GITHUB_TOKEN` -- no extra secrets needed.

## Email (Resend)

A ready-to-use `EmailService` is included. To enable:

1. Create an account at [resend.com](https://resend.com)
2. Add your API key to `.env`: `RESEND_API_KEY=re_...`
3. Verify your domain in Resend (add DNS records)
4. Import `EmailModule` in any module, inject `EmailService`

```typescript
// Example usage
await this.email.sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Hello</h1>',
  from: 'App <hello@yourdomain.com>', // optional, defaults to Resend sandbox
});
```

## Pre-push Hook

Blocks pushes to main if tests fail:

```bash
cp scripts/pre-push.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start DB + app in watch mode |
| `npm run build` | Build for production |
| `npm run start:prod` | Run production build |
| `npm test` | Run unit tests |
| `npm run lint` | Lint and fix |
