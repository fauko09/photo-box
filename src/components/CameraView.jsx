import { useEffect, useRef, useState } from 'react';
import FrameOverlay from './FrameOverlay.jsx';
import { captureVideoFrame, getCameraStream } from '../utils/camera.js';

export default function CameraView({ filter, frame, mode, capturedCount, onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [facingMode, setFacingMode] = useState('user');
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      setIsReady(false);
      setError('');
      stopStream(streamRef.current);

      try {
        const stream = await getCameraStream(facingMode);
        if (cancelled) {
          stopStream(stream);
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsReady(true);
        }
      } catch (cameraError) {
        setError(cameraError.message || 'Kamera tidak bisa diakses. Pastikan izin kamera sudah diberikan.');
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      stopStream(streamRef.current);
    };
  }, [facingMode]);

  const capture = () => {
    if (!videoRef.current || !isReady) return;
    const photo = captureVideoFrame(videoRef.current, { mirror: facingMode === 'user' });
    onCapture({
      src: photo,
      mediaWidth: videoRef.current.videoWidth || 0,
      mediaHeight: videoRef.current.videoHeight || 0,
    });
  };

  return (
    <section className="studio-stage">
      <div className="media-frame">
        <video
          ref={videoRef}
          className={facingMode === 'user' ? 'camera-feed is-mirrored' : 'camera-feed'}
          playsInline
          muted
          style={{ filter: filter.css }}
        />
        <FrameOverlay frameId={frame.id} />

        {!isReady && !error ? <div className="stage-status">Menyalakan kamera...</div> : null}
        {error ? <div className="stage-status stage-error">{error}</div> : null}
      </div>

      <div className="camera-actions">
        <span className="shot-counter">
          Shot {capturedCount + 1}/{mode.count}
        </span>
        <button className="secondary-action" type="button" onClick={() => setFacingMode((mode) => (mode === 'user' ? 'environment' : 'user'))}>
          Switch Camera
        </button>
        <button className="capture-button" type="button" onClick={capture} disabled={!isReady}>
          <span />
          {mode.count > 1 ? 'Take Photo' : 'Capture'}
        </button>
      </div>
    </section>
  );
}

function stopStream(stream) {
  stream?.getTracks().forEach((track) => track.stop());
}
