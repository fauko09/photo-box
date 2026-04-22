export default function FrameOverlay({ frameId }) {
  return <div className={`frame-overlay frame-${frameId}`} aria-hidden="true" />;
}
