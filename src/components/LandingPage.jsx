export default function LandingPage({ onStart }) {
  return (
    <main className="landing">
      <div className="hero-visual" aria-hidden="true">
        <div className="photo-stack photo-stack-a" />
        <div className="photo-stack photo-stack-b" />
        <div className="camera-orbit">
          <span />
        </div>
      </div>

      <section className="hero-content">
        <p className="eyebrow">Browser photobooth</p>
        <h1>Potobox</h1>
        <p className="hero-copy">
          Ambil foto dari kamera, pilih filter, pasang frame, lalu download hasilnya langsung dari browser.
        </p>
        <button className="primary-action" type="button" onClick={onStart}>
          Mulai Foto
        </button>
      </section>

      <section className="feature-strip" aria-label="Potobox features">
        <span>Live camera</span>
        <span>7 filters</span>
        <span>10 frames</span>
        <span>PNG export</span>
      </section>
    </main>
  );
}
