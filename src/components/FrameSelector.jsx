export default function FrameSelector({ frames, selectedId, onSelect }) {
  return (
    <section className="control-group">
      <div>
        <h2>Frame</h2>
        <p>Overlay frame ikut masuk ke hasil download.</p>
      </div>
      <div className="option-grid">
        {frames.map((frame) => (
          <button
            className={frame.id === selectedId ? 'option-button is-selected' : 'option-button'}
            key={frame.id}
            type="button"
            onClick={() => onSelect(frame.id)}
          >
            <span className="frame-swatch" style={{ '--tone': frame.tone, '--accent': frame.accent }} />
            {frame.name}
          </button>
        ))}
      </div>
    </section>
  );
}
