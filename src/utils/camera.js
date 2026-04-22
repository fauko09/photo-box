export async function getCameraStream(facingMode = 'user') {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('Browser ini belum mendukung akses kamera.');
  }

  return navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: facingMode },
      width: { ideal: 1440 },
      height: { ideal: 1080 },
    },
    audio: false,
  });
}

export function captureVideoFrame(video, { mirror = false } = {}) {
  const width = video.videoWidth || 1280;
  const height = video.videoHeight || 720;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0, width, height);

  return canvas.toDataURL('image/png', 0.95);
}
