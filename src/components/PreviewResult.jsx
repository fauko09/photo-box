import FrameOverlay from './FrameOverlay.jsx';

export default function PreviewResult({ photos, filter, frame, mode }) {
  if (photos.length > 1) {
    return (
      <section className="studio-stage">
        <div className={`photo-card-preview card-count-${mode.count}`}>
          <div className="photo-card-grid">
            {photos.map((photo, index) => (
              <div className="photo-card-cell" key={`${photo.src}-${index}`}>
                <img className="captured-photo" src={photo.src} alt={`Potobox shot ${index + 1}`} style={{ filter: filter.css }} />
              </div>
            ))}
          </div>
          <strong>Potobox</strong>
          <FrameOverlay frameId={frame.id} />
        </div>
      </section>
    );
  }

  const [photo] = photos;

  return (
    <section className="studio-stage">
      <div className="media-frame">
        <img className="captured-photo" src={photo.src} alt="Final Potobox preview" style={{ filter: filter.css }} />
        <FrameOverlay frameId={frame.id} />
      </div>
    </section>
  );
}
