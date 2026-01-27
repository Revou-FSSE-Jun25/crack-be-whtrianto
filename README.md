# BookEase Backend

Robust REST API for the BookEase flight booking platform. Built with Node.js, Express, and Prisma.

## Link Deploy BackEnd
https://crackbe-production.up.railway.app/

## Technology Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js (v5)
-   **Database ORM**: Prisma (v6) - Type-safe database access
-   **Language**: TypeScript
-   **Security**:
    -   `helmet` - HTTP headers security
    -   `bcryptjs` - Password hashing
    -   `jsonwebtoken` (JWT) - Authentication
    -   `express-rate-limit` - Rate limiting
    -   `cors` - Cross-Origin Resource Sharing
-   **Documentation**: Swagger (`swagger-jsdoc`, `swagger-ui-express`)
-   **Logging**: Morgan

## API Features

-   **Authentication**: Register, Login, Get Current User (Me)
-   **Services (Flights)**: CRUD operations for flight services
-   **Bookings**: Manage flight bookings and status updates
-   **Users**: Admin management of user accounts and roles

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Database Setup**
    Ensure you have a database configured in your `.env` file (e.g., MySQL/PostgreSQL).
    ```bash
    npx prisma generate
    npx prisma db push
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The server typically runs on port `5000` (or as defined in `.env`).

4.  **View API Documentation**
    Visit `http://localhost:5000/api/docs` to see the interactive API documentation (Swagger UI).

## Scripts

-   `npm run dev` - Start development server with hot-reload (`ts-node-dev`)
-   `npm run build` - Compile TypeScript to JavaScript
-   `npm start` - Run the production build

## 🚀 Deployment ke Railway

Railway adalah platform yang recommended untuk deploy backend ini karena mudah digunakan dan menyediakan MySQL database service.

### Prerequisites

1. **Akun Railway** - Daftar di [railway.app](https://railway.app)
2. **GitHub Account** - Untuk connect repository (opsional, bisa juga via Railway CLI)

### Metode 1: Deploy via Railway Dashboard (Recommended)

1. **Buat Project di Railway:**
   - Login ke [railway.app](https://railway.app)
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo" atau "Empty Project"

2. **Setup Database MySQL:**
   - Di Railway dashboard, klik "New" → "Database" → "Add MySQL"
   - Tunggu hingga MySQL service selesai dibuat
   - Klik MySQL service → tab "Variables"
   - Copy value dari `MYSQL_URL` atau `DATABASE_URL` (format: `mysql://user:password@host:port/database`)

3. **Deploy Backend Service:**
   - Jika deploy dari GitHub:
     - Pilih repository dan branch
     - Set **Root Directory** ke `bookease-backend`
   - Jika deploy manual:
     - Klik "New" → "GitHub Repo" atau "Empty Service"
     - Connect repository atau upload code

4. **Setup Environment Variables:**
   - Di service backend, buka tab "Variables"
   - Tambahkan environment variables berikut:
     ```
     PORT=5000
     DATABASE_URL=<paste_mysql_url_dari_step_2>
     JWT_SECRET=<generate_secret_key_yang_kuat>
     SWAGGER_SERVER_URL=<url_backend_railway_setelah_deploy>
     ```
   - **Catatan:**
     - `DATABASE_URL`: Paste connection string dari MySQL service
     - `JWT_SECRET`: Generate secret key yang kuat (bisa pakai: `openssl rand -base64 32`)
     - `SWAGGER_SERVER_URL`: Akan diisi setelah deploy (contoh: `https://your-app.railway.app`)

5. **Setup Build & Start Commands:**
   - Railway biasanya auto-detect, tapi pastikan:
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`

6. **Deploy:**
   - Railway akan otomatis deploy setelah setup
   - Tunggu hingga build selesai
   - Copy URL yang diberikan Railway (contoh: `https://your-app.railway.app`)

7. **Update SWAGGER_SERVER_URL:**
   - Setelah mendapatkan URL backend, update environment variable `SWAGGER_SERVER_URL` dengan URL tersebut
   - Railway akan otomatis redeploy

### Metode 2: Deploy via Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize Project:**
   ```bash
   cd bookease-backend
   railway init
   ```

4. **Setup Database:**
   - Di Railway dashboard, tambahkan MySQL service
   - Copy connection string

5. **Setup Environment Variables:**
   ```bash
   railway variables set DATABASE_URL=<mysql_connection_string>
   railway variables set JWT_SECRET=<your_secret_key>
   railway variables set PORT=5000
   railway variables set SWAGGER_SERVER_URL=<url_setelah_deploy>
   ```

6. **Deploy:**
   ```bash
   railway up
   ```

### Setup Database dengan Prisma

Setelah deploy, Railway akan otomatis run build command. Pastikan Prisma sudah generate client:

```bash
# Railway akan otomatis run:
npm install
npm run build
# Prisma generate akan otomatis run saat npm install jika ada postinstall script
```

Jika perlu setup database schema manual:
- Bisa connect ke Railway MySQL via Railway dashboard → MySQL service → "Connect" tab
- Atau gunakan Prisma Studio: `npx prisma studio` (jika ada akses)

### Verifikasi Deployment

1. **Test API Endpoint:**
   ```bash
   curl https://your-app.railway.app/api/services
   ```
   Harus return data services (bisa kosong jika belum ada data)

2. **Test Swagger Documentation:**
   - Buka `https://your-app.railway.app/api/docs`
   - Harus menampilkan Swagger UI dengan API documentation

3. **Test Authentication:**
   ```bash
   curl -X POST https://your-app.railway.app/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
   ```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port untuk server (Railway auto-assign, tapi bisa set manual) | `5000` |
| `DATABASE_URL` | MySQL connection string dari Railway MySQL service | `mysql://user:pass@host:port/db` |
| `JWT_SECRET` | Secret key untuk JWT token (harus kuat dan random) | Generate dengan `openssl rand -base64 32` |
| `SWAGGER_SERVER_URL` | URL backend untuk Swagger documentation | `https://your-app.railway.app` |

### Troubleshooting

#### Build Error

1. **Cek Build Logs:**
   - Buka Railway dashboard → Service → "Deployments" tab
   - Lihat error di build logs

2. **Cek Node Version:**
   - Railway biasanya auto-detect Node version
   - Bisa set manual di `package.json`:
     ```json
     "engines": {
       "node": ">=18.0.0"
     }
     ```

#### Database Connection Error

1. **Cek DATABASE_URL:**
   - Pastikan format connection string benar
   - Pastikan sudah copy dari Railway MySQL service variables

2. **Cek Database Service:**
   - Pastikan MySQL service sudah running di Railway
   - Cek status di Railway dashboard

#### CORS Error

Backend sudah dikonfigurasi untuk allow semua origin (`origin: "*"`). Jika perlu restrict ke domain tertentu, update di `src/index.ts`:

```typescript
app.use(cors({ 
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true 
}));
```

### Production URL

Setelah deploy berhasil, URL backend production Anda akan seperti:
```
https://your-app.railway.app
```

**Catatan:** 
- Railway memberikan URL dengan format `https://<service-name>.railway.app`
- URL ini bisa di-custom dengan domain sendiri (paid plan)
- Pastikan URL ini digunakan di frontend environment variable `VITE_API_URL`

### Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway MySQL Guide](https://docs.railway.app/databases/mysql)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)