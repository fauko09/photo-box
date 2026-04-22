import { describe, expect, it } from 'vitest';
import {
  FILTERS,
  FRAMES,
  PHOTO_MODES,
  SAWERIA_ALERT_URL,
  SAWERIA_PAGE_URL,
  SAWERIA_QR_URL,
  createDownloadName,
  getPhotoCardLayout,
  getFilterStyle,
} from '../src/utils/photoConfig.js';

describe('photo configuration', () => {
  it('provides the required filter, frame, and photo mode choices', () => {
    expect(FILTERS.map((filter) => filter.id)).toEqual([
      'normal',
      'bw',
      'vintage',
      'warm',
      'cool',
      'bright',
      'contrast',
    ]);
    expect(FRAMES.map((frame) => frame.id)).toEqual([
      'clean',
      'birthday',
      'birthday-cake',
      'wedding',
      'wedding-cake',
      'retro',
      'fun',
      'holiday-beach',
      'holiday-mountain',
      'holiday-island',
    ]);
    expect(PHOTO_MODES.map((mode) => mode.count)).toEqual([1, 4, 6]);
    expect(SAWERIA_QR_URL).toBe('https://saweria.co/widgets/qr?streamKey=7755a5f97b72d7496a127ffe24b563e8');
    expect(SAWERIA_PAGE_URL).toBe('https://saweria.co/FaukoDev');
    expect(SAWERIA_ALERT_URL).toBe('https://saweria.co/widgets/alert?streamKey=7755a5f97b72d7496a127ffe24b563e8');
  });

  it('returns card layouts for 4 and 6 photo modes', () => {
    expect(getPhotoCardLayout(4)).toMatchObject({
      columns: 2,
      rows: 2,
      width: 1200,
      height: 1600,
    });
    expect(getPhotoCardLayout(6)).toMatchObject({
      columns: 2,
      rows: 3,
      width: 1200,
      height: 1800,
    });
  });

  it('returns browser CSS filter styles for selected filters', () => {
    expect(getFilterStyle('normal')).toBe('none');
    expect(getFilterStyle('bw')).toContain('grayscale');
    expect(getFilterStyle('unknown')).toBe('none');
  });

  it('creates stable png download filenames', () => {
    expect(createDownloadName(new Date('2026-04-21T10:30:05Z'))).toBe(
      'potobox-2026-04-21-10-30-05.png',
    );
  });
});
