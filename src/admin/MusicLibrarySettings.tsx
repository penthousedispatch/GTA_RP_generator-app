import type { MusicLibrarySettingsState } from './adminSettingsStore';

type MusicLibrarySettingsProps = {
  value: MusicLibrarySettingsState;
};

export function MusicLibrarySettings({ value }: MusicLibrarySettingsProps) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2>Music Library Settings</h2>
      <p>
        Placeholder panel for future track management. Admins will be able to
        add or replace in-game tracks from here.
      </p>
      <div
        style={{
          border: '1px dashed #777',
          borderRadius: 8,
          padding: 12,
          display: 'grid',
          gap: 8,
        }}
      >
        <strong>Current custom tracks: {value.customTracks.length}</strong>
        <button type="button" disabled>
          Add Track (Coming Soon)
        </button>
        <button type="button" disabled>
          Replace Track (Coming Soon)
        </button>
      </div>
    </section>
  );
}
