# Potobox

Potobox adalah web photobooth frontend berbasis React + Vite. Aplikasi berjalan sepenuhnya di browser untuk mengambil foto dari kamera, memilih filter, memilih frame, membuat card 1/4/6 foto, dan mengunduh hasil sebagai PNG.

## Fitur

- Capture foto dari kamera browser.
- Switch kamera depan/belakang.
- Mode single, 4 shots, dan 6 shots.
- Filter foto: normal, black & white, vintage, warm, cool, bright, contrast.
- Frame photobooth modern, birthday, wedding, retro, fun, dan holiday.
- Download hasil PNG di sisi client.
- Modal support Saweria sebelum download.
- Tanpa backend, database, login, atau upload server.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output production akan tersedia di folder `dist/`.

## PM2

Jalankan production preview dengan auto build setiap start/restart:

```bash
pm2 start ecosystem.config.cjs
```

Perintah PM2 tersebut menjalankan:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

Di Windows, jangan ubah `script` PM2 ke `src`. Gunakan `ecosystem.config.cjs` apa adanya karena file ini menjalankan `scripts/pm2-start.cjs` untuk build dan preview secara cross-platform.

Perintah umum:

```bash
pm2 restart potobox
pm2 logs potobox
pm2 stop potobox
```

## Nginx

Contoh konfigurasi Nginx tersedia di `nginx.conf`. Arahkan `root` ke folder `dist` hasil build.
