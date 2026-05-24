# Dashboard v1 - Fullstack Project Documentation

Selamat datang di dokumentasi proyek **Dashboard v1**. Proyek ini adalah aplikasi web fullstack yang dirancang untuk manajemen buku dan kategori, dilengkapi dengan sistem autentikasi.

## 🚀 Gambaran Umum Proyek
Proyek ini terdiri dari dua bagian utama:
- **Backend**: API server berbasis Node.js/Express menggunakan runtime Bun.
- **Frontend**: Aplikasi Single Page Application (SPA) berbasis React yang dibangun dengan Vite.

---

## 🛠️ Stack Teknologi

### Backend
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Language**: TypeScript
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Autentikasi**: JWT (JSON Web Token) dengan HTTP-only Cookies & Bcrypt untuk hashing password.
- **Tools**: `tsup` (bundling), `tsx` (running).

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management & Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/)

---

## ⚙️ Persiapan Lingkungan (Setup)

### Prasyarat
- [Bun](https://bun.sh/docs/installation) terinstal di mesin Anda.
- PostgreSQL berjalan (atau gunakan Docker).

### Konfigurasi Backend
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal dependensi:
   ```bash
   bun install
   ```
3. Buat file `.env` dan sesuaikan variabel berikut:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   PORT=3000
   JWT_SECRET="secret_key_anda"
   ```
4. Jalankan migrasi database:
   ```bash
   bun run db:migrate:dev
   ```
5. Jalankan server:
   ```bash
   bun run dev
   ```

### Konfigurasi Frontend
1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Instal dependensi:
   ```bash
   bun install
   ```
3. Jalankan aplikasi:
   ```bash
   bun run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

---

## 📂 Struktur Folder Utama

### Backend
- `prisma/`: Skema database dan file migrasi.
- `src/server.ts`: Titik masuk utama API dan definisi rute.
- `middleware/`: Logika perantara (seperti `authMiddleware`).
- `types/`: Definisi tipe TypeScript untuk request/response.

### Frontend
- `src/components/`: Komponen UI yang dapat digunakan kembali (termasuk shadcn/ui).
- `src/hooks/`: Custom hooks untuk fetching data (Books, Categories).
- `src/layout/`: Layout aplikasi (MainLayout, AuthLayout).
- `src/screens/`: Halaman-halaman utama aplikasi.
- `src/services/`: Logika komunikasi API menggunakan Axios.
- `src/routes/`: Konfigurasi routing aplikasi.

---

## ✨ Fitur Saat Ini
- **Autentikasi**: Registrasi, Login, Logout, dan rute yang diproteksi (`ProtectedRoute`).
- **Dashboard**: Visualisasi data (dalam pengembangan).
- **Manajemen Buku**: CRUD Buku (Create, Read, Update, Soft Delete).
- **Manajemen Kategori**: CRUD Kategori (Create, Read, Update, Soft Delete).
- **UI/UX**: Desain responsif, Dark Mode, Sidebar navigasi, dan tabel data yang interaktif.

---

## 📝 Catatan Pengembangan
- Proyek ini menggunakan **Soft Delete** untuk Buku dan Kategori melalui kolom `deletedAt` di database.
- Autentikasi menggunakan cookie `token` yang bersifat `httpOnly` untuk keamanan tambahan.
- Frontend menggunakan `MainLayout` untuk halaman terproteksi yang menyertakan Sidebar dan TopBar.

---

*Dokumentasi ini akan diperbarui secara berkala seiring dengan perkembangan fitur baru.*
