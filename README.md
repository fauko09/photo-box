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

## Nginx

Contoh konfigurasi Nginx tersedia di `nginx.conf`. Arahkan `root` ke folder `dist` hasil build.
