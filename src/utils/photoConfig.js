export const FILTERS = [
  { id: 'normal', name: 'Normal', css: 'none' },
  { id: 'bw', name: 'Black & White', css: 'grayscale(1) contrast(1.08)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.45) contrast(0.95) saturate(0.9)' },
  { id: 'warm', name: 'Warm', css: 'sepia(0.16) saturate(1.28) brightness(1.04)' },
  { id: 'cool', name: 'Cool', css: 'saturate(1.1) hue-rotate(175deg) brightness(1.02)' },
  { id: 'bright', name: 'Bright', css: 'brightness(1.18) contrast(1.02)' },
  { id: 'contrast', name: 'Contrast', css: 'contrast(1.28) saturate(1.08)' },
];

export const FRAMES = [
  { id: 'clean', name: 'Clean White', tone: '#ffffff', accent: '#111827' },
  { id: 'birthday', name: 'Birthday', tone: '#ffec99', accent: '#ff4d8d' },
  { id: 'birthday-cake', name: 'Birthday Kue', tone: '#fff1f2', accent: '#f43f5e' },
  { id: 'wedding', name: 'Wedding', tone: '#fffaf0', accent: '#c8a96a' },
  { id: 'wedding-cake', name: 'Wedding Kue', tone: '#fff7ed', accent: '#b48a5a' },
  { id: 'retro', name: 'Retro Strip', tone: '#f6efe4', accent: '#e05a47' },
  { id: 'fun', name: 'Fun Colorful', tone: '#d9f99d', accent: '#1d4ed8' },
  { id: 'holiday-beach', name: 'Holiday Pantai', tone: '#dff8ff', accent: '#f59e0b' },
  { id: 'holiday-mountain', name: 'Holiday Gunung', tone: '#ecfdf5', accent: '#15803d' },
  { id: 'holiday-island', name: 'Holiday Pulau', tone: '#e0f2fe', accent: '#0f766e' },
];

export const PHOTO_MODES = [
  { id: 'single', name: 'Single', count: 1, description: '1 foto final' },
  { id: 'card-4', name: '4 Shots', count: 4, description: 'Card 2 x 2' },
  { id: 'card-6', name: '6 Shots', count: 6, description: 'Card 2 x 3' },
];

export const SAWERIA_QR_URL = 'https://saweria.co/widgets/qr?streamKey=7755a5f97b72d7496a127ffe24b563e8';
export const SAWERIA_PAGE_URL = 'https://saweria.co/FaukoDev';
export const SAWERIA_ALERT_URL = 'https://saweria.co/widgets/alert?streamKey=7755a5f97b72d7496a127ffe24b563e8';

export function getFilterStyle(filterId) {
  return FILTERS.find((filter) => filter.id === filterId)?.css ?? 'none';
}

export function createDownloadName(date = new Date()) {
  const stamp = date.toISOString().replace(/\.\d{3}Z$/, '').replace('T', '-').replaceAll(':', '-');
  return `potobox-${stamp}.png`;
}

export function getPhotoCardLayout(count) {
  if (count === 6) {
    return {
      columns: 2,
      rows: 3,
      width: 1200,
      height: 1800,
      gap: 34,
      padding: 62,
      footer: 130,
    };
  }

  return {
    columns: 2,
    rows: 2,
    width: 1200,
    height: 1600,
    gap: 34,
    padding: 62,
    footer: 130,
  };
}

export function drawFrame(ctx, frameId, width, height) {
  const frame = FRAMES.find((item) => item.id === frameId) ?? FRAMES[0];
  const border = Math.max(22, Math.round(Math.min(width, height) * 0.045));

  ctx.save();
  ctx.lineWidth = border;
  ctx.strokeStyle = frame.tone;
  ctx.strokeRect(border / 2, border / 2, width - border, height - border);

  if (frameId === 'clean') {
    ctx.lineWidth = Math.max(2, border * 0.08);
    ctx.strokeStyle = 'rgba(17, 24, 39, 0.2)';
    ctx.strokeRect(border, border, width - border * 2, height - border * 2);
  }

  if (frameId === 'birthday') {
    drawConfetti(ctx, width, height, border);
    drawRibbonText(ctx, 'HAPPY DAY', width, height, frame.accent);
  }

  if (frameId === 'birthday-cake') {
    drawConfetti(ctx, width, height, border);
    drawCake(ctx, width / 2, height - border * 1.65, border, frame.accent);
    drawRibbonText(ctx, 'BIRTHDAY CAKE', width, height, frame.accent);
  }

  if (frameId === 'wedding') {
    drawCornerFlorals(ctx, width, height, border, frame.accent);
    drawRibbonText(ctx, 'LOVE', width, height, frame.accent);
  }

  if (frameId === 'wedding-cake') {
    drawCornerFlorals(ctx, width, height, border, frame.accent);
    drawCake(ctx, width / 2, height - border * 1.65, border, frame.accent);
    drawRibbonText(ctx, 'SWEET LOVE', width, height, frame.accent);
  }

  if (frameId === 'retro') {
    ctx.fillStyle = frame.tone;
    ctx.fillRect(0, 0, border * 1.35, height);
    ctx.fillRect(width - border * 1.35, 0, border * 1.35, height);
    ctx.fillStyle = frame.accent;
    for (let y = border; y < height - border; y += border * 1.4) {
      ctx.fillRect(border * 0.42, y, border * 0.42, border * 0.55);
      ctx.fillRect(width - border * 0.84, y, border * 0.42, border * 0.55);
    }
  }

  if (frameId === 'fun') {
    drawFunFrame(ctx, width, height, border);
  }

  if (frameId === 'holiday-beach') {
    drawHolidayBeach(ctx, width, height, border);
    drawRibbonText(ctx, 'BEACH HOLIDAY', width, height, frame.accent);
  }

  if (frameId === 'holiday-mountain') {
    drawHolidayMountain(ctx, width, height, border);
    drawRibbonText(ctx, 'MOUNTAIN HOLIDAY', width, height, frame.accent);
  }

  if (frameId === 'holiday-island') {
    drawHolidayIsland(ctx, width, height, border);
    drawRibbonText(ctx, 'ISLAND HOLIDAY', width, height, frame.accent);
  }

  ctx.restore();
}

export async function composePhoto({ photo, filterId, frameId, mimeType = 'image/png' }) {
  const image = await loadImage(photo);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.filter = getFilterStyle(filterId);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';
  drawFrame(ctx, frameId, canvas.width, canvas.height);

  return canvas.toDataURL(mimeType, 0.95);
}

export async function composePhotoCard({ photos, filterId, frameId, modeCount, mimeType = 'image/png' }) {
  if (!photos?.length) return null;
  if (photos.length === 1) {
    return composePhoto({
      photo: photos[0].src,
      filterId,
      frameId,
      mimeType,
    });
  }

  const layout = getPhotoCardLayout(modeCount || photos.length);
  const canvas = document.createElement('canvas');
  canvas.width = layout.width;
  canvas.height = layout.height;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fffdf8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#17202a';
  ctx.font = '800 52px Inter, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Potobox', canvas.width / 2, canvas.height - 58);

  const imageAreaHeight = canvas.height - layout.padding * 2 - layout.footer;
  const cellWidth = (canvas.width - layout.padding * 2 - layout.gap * (layout.columns - 1)) / layout.columns;
  const cellHeight = (imageAreaHeight - layout.gap * (layout.rows - 1)) / layout.rows;

  const loadedImages = await Promise.all(photos.map((photo) => loadImage(photo.src)));

  loadedImages.forEach((image, index) => {
    const row = Math.floor(index / layout.columns);
    const column = index % layout.columns;
    const x = layout.padding + column * (cellWidth + layout.gap);
    const y = layout.padding + row * (cellHeight + layout.gap);

    ctx.save();
    ctx.beginPath();
    roundRect(ctx, x, y, cellWidth, cellHeight, 24);
    ctx.clip();
    ctx.filter = getFilterStyle(filterId);
    drawImageCover(ctx, image, x, y, cellWidth, cellHeight);
    ctx.filter = 'none';
    ctx.restore();

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(23, 32, 42, 0.12)';
    roundRect(ctx, x, y, cellWidth, cellHeight, 24);
    ctx.stroke();
  });

  drawFrame(ctx, frameId, canvas.width, canvas.height);
  return canvas.toDataURL(mimeType, 0.95);
}

function drawImageCover(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawnWidth = image.naturalWidth * scale;
  const drawnHeight = image.naturalHeight * scale;
  const offsetX = x + (width - drawnWidth) / 2;
  const offsetY = y + (height - drawnHeight) / 2;
  ctx.drawImage(image, offsetX, offsetY, drawnWidth, drawnHeight);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawRibbonText(ctx, text, width, height, color) {
  const fontSize = Math.max(18, Math.round(width * 0.035));
  ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.fillText(text, width / 2, height - fontSize * 1.15);
}

function drawConfetti(ctx, width, height, border) {
  const colors = ['#ff4d8d', '#22c55e', '#38bdf8', '#f97316', '#a855f7'];
  for (let index = 0; index < 42; index += 1) {
    const x = (index * 89) % width;
    const y = index % 2 === 0 ? (index * 41) % (border * 3) : height - ((index * 37) % (border * 3));
    ctx.fillStyle = colors[index % colors.length];
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(index * 0.35);
    ctx.fillRect(-border * 0.08, -border * 0.22, border * 0.16, border * 0.44);
    ctx.restore();
  }
}

function drawCornerFlorals(ctx, width, height, border, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(3, border * 0.09);
  const size = border * 2.15;
  [
    [border * 0.75, border * 0.75, 1, 1],
    [width - border * 0.75, border * 0.75, -1, 1],
    [border * 0.75, height - border * 0.75, 1, -1],
    [width - border * 0.75, height - border * 0.75, -1, -1],
  ].forEach(([x, y, sx, sy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + sy * size);
    ctx.quadraticCurveTo(x + sx * size * 0.6, y + sy * size * 0.45, x + sx * size, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(200, 169, 106, 0.26)';
    ctx.beginPath();
    ctx.ellipse(x + sx * size * 0.42, y + sy * size * 0.38, border * 0.28, border * 0.16, 0.8, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFunFrame(ctx, width, height, border) {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
  for (let i = 0; i < 26; i += 1) {
    ctx.fillStyle = colors[i % colors.length];
    const radius = border * (0.18 + (i % 3) * 0.04);
    const x = i % 2 === 0 ? border * 0.65 : width - border * 0.65;
    const y = border + ((height - border * 2) / 25) * i;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCake(ctx, centerX, baseY, border, color) {
  const width = border * 2.1;
  const layerHeight = border * 0.34;
  ctx.fillStyle = '#fff7ed';
  roundRect(ctx, centerX - width / 2, baseY - layerHeight * 2, width, layerHeight, layerHeight * 0.28);
  ctx.fill();
  ctx.fillStyle = color;
  roundRect(ctx, centerX - width * 0.4, baseY - layerHeight * 3, width * 0.8, layerHeight, layerHeight * 0.28);
  ctx.fill();
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(centerX - border * 0.04, baseY - layerHeight * 3.65, border * 0.08, border * 0.32);
  ctx.beginPath();
  ctx.arc(centerX, baseY - layerHeight * 3.75, border * 0.1, 0, Math.PI * 2);
  ctx.fill();
}

function drawHolidayBeach(ctx, width, height, border) {
  ctx.fillStyle = 'rgba(14, 165, 233, 0.18)';
  ctx.fillRect(0, 0, width, border * 1.2);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(width - border * 1.5, border * 1.25, border * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = Math.max(4, border * 0.12);
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    const y = height - border * (1.4 + i * 0.36);
    ctx.moveTo(border * 0.9, y);
    ctx.quadraticCurveTo(width * 0.33, y - border * 0.28, width * 0.58, y);
    ctx.quadraticCurveTo(width * 0.78, y + border * 0.24, width - border * 0.9, y);
    ctx.stroke();
  }
}

function drawHolidayMountain(ctx, width, height, border) {
  ctx.fillStyle = 'rgba(21, 128, 61, 0.18)';
  ctx.fillRect(0, 0, width, border * 1.2);
  const baseY = height - border * 0.72;
  [
    [border * 0.9, baseY, width * 0.25, height - border * 3.6, width * 0.48, baseY],
    [width * 0.42, baseY, width * 0.68, height - border * 3.25, width - border * 0.8, baseY],
  ].forEach((points) => {
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    ctx.lineTo(points[2], points[3]);
    ctx.lineTo(points[4], points[5]);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(points[2], points[3]);
    ctx.lineTo(points[2] - border * 0.32, points[3] + border * 0.62);
    ctx.lineTo(points[2] + border * 0.34, points[3] + border * 0.62);
    ctx.closePath();
    ctx.fill();
  });
}

function drawHolidayIsland(ctx, width, height, border) {
  ctx.fillStyle = 'rgba(15, 118, 110, 0.16)';
  ctx.fillRect(0, 0, width, border * 1.2);
  const trunkX = width - border * 1.7;
  const trunkY = height - border * 1.15;
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = border * 0.14;
  ctx.beginPath();
  ctx.moveTo(trunkX, trunkY);
  ctx.quadraticCurveTo(trunkX + border * 0.28, trunkY - border * 0.8, trunkX, trunkY - border * 1.5);
  ctx.stroke();
  ctx.fillStyle = '#0f766e';
  for (let i = 0; i < 5; i += 1) {
    ctx.save();
    ctx.translate(trunkX, trunkY - border * 1.58);
    ctx.rotate(-0.9 + i * 0.45);
    ctx.beginPath();
    ctx.ellipse(border * 0.42, 0, border * 0.55, border * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height - border * 0.72, width * 0.22, border * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}
