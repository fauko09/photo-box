import { useState } from 'react';
import { composePhotoCard, createDownloadName, SAWERIA_ALERT_URL, SAWERIA_PAGE_URL } from '../utils/photoConfig.js';

export default function DownloadButton({ photos, filter, frame, mode }) {
  const [isExporting, setIsExporting] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [hasVisitedSaweria, setHasVisitedSaweria] = useState(false);
  const [hasConfirmedPayment, setHasConfirmedPayment] = useState(false);

  const download = async () => {
    setShowSupportModal(false);
    setIsExporting(true);
    try {
      const dataUrl = await composePhotoCard({
        photos,
        filterId: filter.id,
        frameId: frame.id,
        modeCount: mode.count,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = createDownloadName();
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setIsExporting(false);
    }
  };

  const openModal = () => {
    setHasVisitedSaweria(false);
    setHasConfirmedPayment(false);
    setShowSupportModal(true);
  };

  const openSaweria = () => {
    setHasVisitedSaweria(true);
    window.open(SAWERIA_PAGE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button className="primary-action compact" type="button" onClick={openModal} disabled={isExporting}>
        {isExporting ? 'Preparing...' : 'Download PNG'}
      </button>

      {showSupportModal ? (
        <div className="support-modal-backdrop" role="presentation" aria-hidden="false">
          <section className="support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title">
            <button className="modal-close" type="button" aria-label="Close support modal" onClick={() => setShowSupportModal(false)}>
              x
            </button>
            <div>
              <p className="eyebrow modal-eyebrow">Support developer</p>
              <h2 id="support-title">Support developer dulu</h2>
              <p>
                Saweria tidak bisa dibuka di dalam modal karena diblokir browser. Klik tombol kunjungi, selesaikan support di tab Saweria, lalu kembali ke modal ini untuk konfirmasi.
              </p>
            </div>

            <div className="alert-widget-card">
              <iframe
                title="Saweria alert developer Potobox"
                src={SAWERIA_ALERT_URL}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <label className={hasVisitedSaweria ? 'payment-confirm is-ready' : 'payment-confirm'}>
              <input
                type="checkbox"
                checked={hasConfirmedPayment}
                disabled={!hasVisitedSaweria}
                onChange={(event) => setHasConfirmedPayment(event.target.checked)}
              />
              <span>Saya sudah bayar/support developer di Saweria</span>
            </label>

            <div className="modal-actions">
              <button className="secondary-action" type="button" onClick={openSaweria}>
                Kunjungi Saweria
              </button>
              <button className="primary-action compact" type="button" onClick={download} disabled={isExporting || !hasConfirmedPayment}>
                {isExporting ? 'Preparing...' : 'Download setelah support'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
