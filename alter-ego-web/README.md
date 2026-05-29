# ⚡ Alter Ego Esports Website

Website resmi tim esports **Alter Ego** Indonesia — dark, futuristic, dan eksklusif.

![Alter Ego](https://via.placeholder.com/1200x400/0A0A0A/E63946?text=ALTER+EGO+ESPORTS)

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Validation | express-validator |

---

## 📁 Struktur Folder

```
alter-ego-web/
├── frontend/                   # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Responsive navbar
│   │   │   └── Footer.jsx      # Footer dengan social links
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state (JWT)
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Roster.jsx      # Grid pemain + filter game
│   │   │   ├── Member.jsx      # Login/Register + News feed
│   │   │   ├── BAGallery.jsx   # Brand Ambassador gallery
│   │   │   └── Collab.jsx      # Form kolaborasi brand
│   │   ├── services/
│   │   │   └── api.js          # Axios instance + API helpers
│   │   ├── App.jsx             # Router setup
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind + custom styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                    # Node.js + Express API
    ├── prisma/
    │   ├── schema.prisma       # Database schema
    │   └── seed.js             # Seed data
    ├── src/
    │   ├── middleware/
    │   │   └── auth.js         # JWT middleware
    │   ├── routes/
    │   │   ├── auth.js         # Register + Login
    │   │   ├── roster.js       # Roster players
    │   │   ├── news.js         # Exclusive news (protected)
    │   │   ├── ba.js           # Brand Ambassador photos
    │   │   └── collab.js       # Collab submissions
    │   └── index.js            # Express server
    ├── .env.example
    └── package.json
```

---

## 🚀 Setup & Instalasi

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm atau yarn

---

### 1. Clone & Setup

```bash
# Clone repo
git clone <repo-url>
cd alter-ego-web
```

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy env file
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/alter_ego_db"
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

```bash
# Generate Prisma client
npm run prisma:generate

# Jalankan migrasi database
npm run prisma:migrate

# Seed data awal (roster, news, BA photos)
npm run prisma:seed

# Jalankan server development
npm run dev
```

Server berjalan di: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

App berjalan di: `http://localhost:5173`

> **Note:** Vite sudah dikonfigurasi untuk proxy `/api` ke `http://localhost:5000`, jadi tidak perlu konfigurasi CORS tambahan saat development.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@alterego.id | admin123 |
| Member | member@alterego.id | member123 |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Deskripsi |
|--------|----------|--------|-----------|
| POST | `/api/auth/register` | Public | Daftar akun baru |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | Protected | Info user saat ini |

### Roster
| Method | Endpoint | Access | Deskripsi |
|--------|----------|--------|-----------|
| GET | `/api/roster` | Public | Semua pemain |
| GET | `/api/roster?game=MLBB` | Public | Filter by game |
| GET | `/api/roster/:id` | Public | Detail pemain |
| POST | `/api/roster` | Admin | Tambah pemain |

### News
| Method | Endpoint | Access | Deskripsi |
|--------|----------|--------|-----------|
| GET | `/api/news` | **Protected** | Semua berita (butuh login) |
| GET | `/api/news/:id` | **Protected** | Detail berita |
| POST | `/api/news` | Admin | Tambah berita |

### Brand Ambassador
| Method | Endpoint | Access | Deskripsi |
|--------|----------|--------|-----------|
| GET | `/api/ba` | Public | Semua foto BA |
| GET | `/api/ba/:id` | Public | Detail foto BA |
| POST | `/api/ba` | Admin | Tambah foto BA |

### Collab
| Method | Endpoint | Access | Deskripsi |
|--------|----------|--------|-----------|
| POST | `/api/collab` | Public | Submit form kolaborasi |
| GET | `/api/collab` | Admin | Lihat semua submissions |
| PATCH | `/api/collab/:id` | Admin | Update status submission |

---

## 🎨 Design System

### Colors
```css
--ae-black:  #0A0A0A   /* Background utama */
--ae-card:   #111111   /* Card background */
--ae-border: #222222   /* Border */
--ae-red:    #E63946   /* Accent merah AE */
--ae-gray:   #888888   /* Text sekunder */
--ae-light:  #CCCCCC   /* Text primer */
```

### Tailwind Custom Classes
- `.ae-btn-primary` — Tombol merah utama
- `.ae-btn-outline` — Tombol outline merah
- `.ae-card` — Card dengan dark theme
- `.ae-input` — Input field dark
- `.ae-label` — Label form
- `.ae-badge` — Badge/chip kecil
- `.ae-section-title` — Judul section besar

---

## 🗄️ Database Schema

```prisma
User            - id, name, email, password, role (MEMBER/ADMIN)
RosterPlayer    - id, name, role, game (MLBB/VALORANT/CS2), imageUrl, bio
News            - id, title, content, imageUrl, isPublished
BAPhoto         - id, name, imageUrl, caption, product
CollabSubmission - id, brandName, email, collabType, message, status
```

---

## 📦 Build Production

```bash
# Frontend
cd frontend
npm run build
# Output: frontend/dist/

# Backend
cd backend
NODE_ENV=production npm start
```

---

## 🔧 Prisma Commands

```bash
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Jalankan migrasi
npm run prisma:studio     # Buka Prisma Studio (GUI database)
npm run prisma:seed       # Seed data awal
```

---

## 📝 Halaman Website

| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| Home | `/` | Landing page dengan hero, stats, achievements |
| Roster | `/roster` | Grid pemain dengan filter game |
| Member | `/member` | Login/Register + berita eksklusif |
| BA Gallery | `/ba-gallery` | Galeri foto Brand Ambassador |
| Collab | `/collab` | Form pengajuan kolaborasi brand |

---

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit: `git commit -m 'feat: tambah fitur X'`
4. Push: `git push origin feature/nama-fitur`
5. Buat Pull Request

---

<div align="center">
  <strong>⚡ ALTER EGO ESPORTS ⚡</strong><br>
  <em>Bersama Menuju Puncak Kejayaan</em>
</div>
