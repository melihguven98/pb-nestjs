# Teknoloji Yığını (Tech Stack): NestJS + NextJS + Redis + PostgreSQL

## Genel Mimari

- Frontend: Next.js (App Router)
- Backend: NestJS (REST API)
- Database: PostgreSQL (TypeORM)
- Cache & Queue: Redis
- API iletişimi: JSON + Token auth (JWT)
- Container: Docker, docker-compose
- Clean Architecture prensiplerine göre modüler yapı
- Monorepo önerilir: `apps/frontend`, `apps/backend`, `libs/shared` yapısıyla

---

## Backend: NestJS

### Temel Özellikler

- Framework: NestJS (TypeScript tabanlı Node.js)
- Clean Architecture katmanları:
  - `domain/` → Entity, interface tanımları
  - `application/` → Use-case servisleri
  - `infrastructure/` → Veritabanı, mail, queue gibi dış bağımlılıklar
  - `presentation/` → Controller ve HTTP endpoint tanımları
- API endpoint'leri RESTful (isteğe bağlı GraphQL sonradan eklenebilir)
- DTO ve class-validator ile type-safe veri doğrulama
- Middleware: `auth`, `logging`, `rate-limit`
- Interceptor: response formatlama
- Exception filters: global error handling

### Veri Erişimi

- ORM: TypeORM (alternatif olarak Prisma düşünülebilir)
- PostgreSQL ilişkileri `@OneToMany`, `@ManyToOne`, `@JoinColumn`
- Transaction desteği: `QueryRunner` ile

### Auth

- JWT tabanlı authentication
- Route guard’lar ile rol bazlı erişim (`RolesGuard`)
- Passport modülü ile auth stratejileri

### Queue

- `@nestjs/bull` ile Redis tabanlı queue işlemleri
- Worker işlemleri ayrı modüllerde

### Örnek Klasör Yapısı (backend/src)

```bash
src/
├── application/
│   └── use-cases/
├── domain/
│   ├── entities/
│   └── interfaces/
├── infrastructure/
│   ├── database/
│   ├── mail/
│   └── redis/
├── presentation/
│   ├── controllers/
│   └── dtos/
├── config/
├── main.ts
└── app.module.ts
```

---

## Frontend: Next.js (App Router)

### Yapı

- Next 13+ App Router
- TailwindCSS ile styling
- Server Components kullanımı desteklenir
- Route yapısı:
  - `/login`
  - `/projects`
  - `/projects/[id]/candidates`
  - `/tasks/[id]`

### API İletişimi

- Backend API ile token bazlı iletişim (`Authorization: Bearer <token>`)
- API çağrıları `fetch`, `axios`, `swr` ile yapılabilir
- Server-side auth (middleware + cookies) veya client-based token

### Auth

- `next-auth` (JWT strateji) veya kendi token middleware sistemi
- Oturum bilgilerinin `cookies` ile tutulması önerilir

### Örnek Klasör Yapısı (frontend/app)

```bash
app/
├── login/
├── projects/
│   └── [id]/candidates/
├── tasks/
│   └── [id]/
├── layout.tsx
└── page.tsx
```

---

## Database: PostgreSQL

### Yapı

- Her müşteri için ayrı tenant olabilir (subdomain veya schema based)
- Ana tablolar:
  - `users`
  - `projects`
  - `candidates`
  - `tasks`
  - `questions`
  - `replies`

### Geliştirme

- Migration dosyaları TypeORM CLI ile oluşturulur
- Seeder desteği (örnek kullanıcı, proje, aday verisi)

---

## Redis

### Kullanım Amaçları

- Queue: görev zamanlama ve async task için BullMQ
- Cache: sık erişilen veri veya session bilgisi
- Rate limiting

---

## Docker

### Yapı

- `docker-compose.yml` içinde:
  - frontend (nextjs)
  - backend (nestjs)
  - db (postgres)
  - redis
- Ortak `.env` dosyası ile tüm servislerin yapılandırılması

---

## CI/CD Süreçleri

### Araçlar

- GitHub Actions veya GitLab CI
- Docker Hub veya GitHub Container Registry ile image yönetimi
- Otomatik test, build ve deploy adımları

### Örnek Pipeline Adımları

1. **Lint & Test**: Her push sonrası `eslint` ve `jest`
2. **Build**: Next.js ve NestJS ayrı image olarak build edilir
3. **Push**: Docker registry'e image push
4. **Deploy**: staging veya production ortamına otomatik deploy

### Ortamlar

- `.env.production`, `.env.staging` dosyaları
- Terraform veya Ansible ile altyapı yönetimi (opsiyonel)
- Health check endpoint: `/healthz` ile CI kontrolleri

---

