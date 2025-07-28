# Kullanıcı Giriş Ekranı

## Amaç
Kullanıcıların sisteme güvenli şekilde giriş yapmasını sağlamak.

## Giriş Alanları
- Email
- Şifre

## Doğrulama
- Şifre hash ile karşılaştırılır
- JWT veya session ile oturum yönetimi sağlanır

## İlgili Veri Tabloları
- `persons` (user = 1 olanlar kullanıcı)
  - `email`
  - `password`
  - `user`

## Akış
1. Kullanıcı email ve şifre girer
2. Şifre doğrulanır
3. Token/session oluşturulur

# Proje Oluşturma, Listeleme, Düzenleme

## Amaç
Kullanıcılar proje tanımlayabilir, detaylarını yönetebilir.

## Özellikler
- Proje oluşturma
- Proje listeleme
- Proje detay ve düzenleme ekranı

## İlgili Veri Tabloları
- `projects`
  - `name`
  - `job_category`
  - `user_id_create`

## Akış
1. Kullanıcı proje oluşturur
2. Proje listesi gösterilir
3. İstenirse proje güncellenebilir

# Aday Oluşturma, Listeleme, Düzenleme

## Amaç
Adayların sisteme girilmesi ve yönetilmesi

## Özellikler
- Aday oluşturma
- Aday düzenleme
- Aday listeleme

## İlgili Veri Tabloları
- `persons` (user = 0 olanlar aday)
  - `name`, `surname`, `email`, `gender`, `dob`
- `cvs`, `person_experiences`, `person_educations` gibi detay tablolar

## Akış
1. Yeni aday formu doldurulur
2. Sistem `persons` tablosuna kayıt yapar
3. Liste ekranında filtrelenebilir şekilde görüntülenir

# Projeye Aday Ekleme ve Listeleme

## Amaç
Adayların projelere atanabilmesi ve listelenebilmesi

## İlgili Veri Tabloları
- `activities` (is_task=0 && action=PROJECT_ASSIGN vb.)
  - `project_id`
  - `person_id`

## Akış
1. Kullanıcı bir projeyi seçer
2. Aday listesi gösterilir
3. Aday seçilerek projeye atanır
4. İlişkili adaylar projede listelenebilir

# Projeye Atanmış Adayların Task Yönetimi

## Amaç
Her projedeki aday için görev (task) oluşturulması ve izlenmesi

## Özellikler
- Task oluşturma (soru listesiyle birlikte)
- Task durumu güncelleme
- Task tamamlama sonrası senaryoya göre yeni task açma

## İlgili Veri Tabloları
- `activities` (is_task=1)
  - `project_id`
  - `person_id`
  - `action`, `status`, `reason`, `date_due`
- `questions`, `replies` (task içeriği)

## Akış
1. Projeye atanmış aday seçilir
2. Yeni task açılır → `activities` kaydı yapılır
3. Sorular ve cevap alanları gösterilir
4. Cevaplar `replies` tablosuna yazılır
5. Task kapatılır → status güncellenir

# Teknoloji Yığını (Tech Stack)

## Backend: NestJS (Node.js)
- En güncel NestJS sürümü kullanılır.
- API-first yaklaşımı ile RESTful endpoint'ler oluşturulacak.
- Routes: `src/app.module.ts` ve ilgili controller dosyaları
- Middleware: auth, tenant (her müşteri için db ayrımı)
- Business logic `src/services/` veya `src/actions/` içinde
- Validation: Class-validator ve class-transformer
- Auth: JWT veya Passport (Token Based)

## Frontend: Next.js (React 18+)
- App Router (Next 13+)
- API çağrıları: `axios` veya `fetch`
- SSR destekli sayfalar
- TailwindCSS kullanılacak
- Dosya yapısı:
  - `app/login/`
  - `app/projects/`
  - `app/candidates/`
  - `app/tasks/`

## Database: PostgreSQL
- NestJS TypeORM veya Prisma kullanılarak migration ve seeder'lar oluşturulur
- Her müşteri için ayrı veritabanı (multi-tenant yapı)
- Ana tablolar: `projects`, `persons`, `activities`, `questions`, `replies`

## Docker
- `nginx`, `node`, `postgres`
- `docker-compose.yaml` servisleri içerir
- `.env`, `.env.example` ayrı tanımlanır