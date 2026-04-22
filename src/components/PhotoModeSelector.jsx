export default function PhotoModeSelector({ modes, selectedId, capturedCount, onSelect }) {
  return (
    <section className="control-group">
      <div>
        <h2>Mode</h2>
        <p>Pilih single shot atau card photobox multi-foto.</p>
      </div>
      <div className="mode-grid">
        {modes.map((mode) => (
          <button
            className={mode.id === selectedId ? 'mode-button is-selected' : 'mode-button'}
            key={mode.id}
            type="button"
            onClick={() => onSelect(mode.id)}
          >
            <strong>{mode.name}</strong>
            <span>{mode.description}</span>
          </button>
        ))}
      </div>
      {capturedCount > 0 ? <p className="capture-progress-note">{capturedCount} foto tersimpan di sesi ini.</p> : null}
    </section>
  );
}
