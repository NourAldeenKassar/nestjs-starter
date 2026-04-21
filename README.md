# NestJS Starter

Opinionated NestJS starter template with authentication, Prisma, PostgreSQL, and Docker.

## What's Included

- **NestJS 11** with TypeScript (strict mode)
- **Prisma 7** ORM with PostgreSQL
- **JWT Authentication** (register, login, protected routes)
- **Docker** multi-stage build + docker-compose
- **GitHub Actions** CI (lint, build, test)
- **ESLint** + **Prettier** configured
- **Jest** unit + e2e test setup

## Getting Started

### 1. Use this template

Click **"Use this template"** on GitHub, or clone directly:

```bash
git clone git@github.com:NourAldeenKassar/nestjs-starter.git my-project
cd my-project
rm -rf .git && git init
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

```bash
cp .env.example .env
```

### 4. Run in development

```bash
npm run dev
```

This starts PostgreSQL in Docker and runs NestJS in watch mode.

### 5. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 6. Seed the database (optional)

```bash
npx prisma db seed
```

Default user: `admin@example.com` / `password123`

## Running with Full Docker

```bash
docker compose up
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Get JWT token |
| GET | `/auth/me` | Yes | Current user |
| GET | `/users` | Yes | List users |
| GET | `/users/:id` | Yes | Get user by ID |

### Auth Header

```
Authorization: Bearer <token>
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start DB + app in watch mode |
| `npm run build` | Build for production |
| `npm run start:prod` | Run production build |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run e2e tests |
| `npm run lint` | Lint and fix |
| `npm run format` | Format with Prettier |

## Prisma

### Create a migration

```bash
npx prisma migrate dev --name describe_your_change
```

### Apply migrations (after pulling new code)

```bash
npx prisma migrate dev
```

### Apply migrations in production

```bash
npx prisma migrate deploy
```

### Reset database

```bash
npx prisma migrate reset
```

### Open database GUI

```bash
npx prisma studio
```

### Push schema without migration (prototyping)

```bash
npx prisma db push
```

### Common workflow

1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name what_you_changed`
3. Use `PrismaService` in your NestJS services

## Project Structure

```
src/
├── main.ts
├── app.module.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.guard.ts
│   ├── jwt.strategy.ts
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.controller.ts
└── prisma/
    ├── prisma.module.ts
    └── prisma.service.ts
prisma/
├── schema.prisma
└── seed.ts
```
