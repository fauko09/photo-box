import { useMemo, useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import CameraView from './components/CameraView.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import FrameSelector from './components/FrameSelector.jsx';
import PhotoModeSelector from './components/PhotoModeSelector.jsx';
import PreviewResult from './components/PreviewResult.jsx';
import DownloadButton from './components/DownloadButton.jsx';
import { FILTERS, FRAMES, PHOTO_MODES } from './utils/photoConfig.js';

const DEFAULT_SELECTIONS = {
  filterId: FILTERS[0].id,
  frameId: FRAMES[0].id,
  photoModeId: PHOTO_MODES[0].id,
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [selections, setSelections] = useState(DEFAULT_SELECTIONS);

  const selectedState = useMemo(
    () => ({
      filter: FILTERS.find((filter) => filter.id === selections.filterId) ?? FILTERS[0],
      frame: FRAMES.find((frame) => frame.id === selections.frameId) ?? FRAMES[0],
      photoMode:
        PHOTO_MODES.find((mode) => mode.id === selections.photoModeId) ?? PHOTO_MODES[0],
    }),
    [selections],
  );

  const updateSelection = (key, value) => {
    setSelections((current) => ({ ...current, [key]: value }));
    if (key === 'photoModeId') {
      setCapturedPhotos([]);
    }
  };

  const handleCapture = (photo) => {
    setCapturedPhotos((current) => [...current, photo].slice(0, selectedState.photoMode.count));
  };

  const isCaptureComplete = capturedPhotos.length >= selectedState.photoMode.count;

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand-button" type="button" onClick={() => setCapturedPhotos([])}>
          <span className="brand-mark">P</span>
          <span>Potobox</span>
        </button>
        <span className="privacy-note">Client-only. No upload. No database.</span>
      </header>

      <section className="workspace" aria-label="Potobox photo studio">
        <div className="stage-column">
          {isCaptureComplete ? (
            <PreviewResult
              photos={capturedPhotos}
              filter={selectedState.filter}
              frame={selectedState.frame}
              mode={selectedState.photoMode}
            />
          ) : (
            <CameraView
              filter={selectedState.filter}
              frame={selectedState.frame}
              mode={selectedState.photoMode}
              capturedCount={capturedPhotos.length}
              onCapture={handleCapture}
            />
          )}

          <div className="action-row">
            {isCaptureComplete ? (
              <>
                <button className="secondary-action" type="button" onClick={() => setCapturedPhotos([])}>
                  Retake
                </button>
                <DownloadButton
                  photos={capturedPhotos}
                  filter={selectedState.filter}
                  frame={selectedState.frame}
                  mode={selectedState.photoMode}
                />
              </>
            ) : null}
          </div>
        </div>

        <aside className="control-panel" aria-label="Photo controls">
          <PhotoModeSelector
            modes={PHOTO_MODES}
            selectedId={selections.photoModeId}
            capturedCount={capturedPhotos.length}
            onSelect={(id) => updateSelection('photoModeId', id)}
          />
          <FilterPanel
            filters={FILTERS}
            selectedId={selections.filterId}
            onSelect={(id) => updateSelection('filterId', id)}
          />
          <FrameSelector
            frames={FRAMES}
            selectedId={selections.frameId}
            onSelect={(id) => updateSelection('frameId', id)}
          />
        </aside>
      </section>
    </main>
  );
}
