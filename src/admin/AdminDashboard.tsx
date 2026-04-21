import { useMemo, useState } from 'react';
import { AdminGuard } from './AdminGuard';
import { AudioSettings } from './AudioSettings';
import { GameSettings } from './GameSettings';
import { MusicLibrarySettings } from './MusicLibrarySettings';
import {
  getDefaultAdminSettings,
  loadAdminSettings,
  saveAdminSettings,
  type AdminSettings,
} from './adminSettingsStore';

export function AdminDashboard() {
  const [settings, setSettings] = useState<AdminSettings>(() => loadAdminSettings());
  const [status, setStatus] = useState<string>('');

  const dirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(loadAdminSettings());
  }, [settings]);

  const update = (next: AdminSettings) => {
    setSettings(next);
    setStatus('Unsaved changes');
  };

  const handleSave = () => {
    const persisted = saveAdminSettings(settings);
    setSettings(persisted);
    setStatus('Settings saved');
  };

  const handleReset = () => {
    setSettings(getDefaultAdminSettings());
    setStatus('Reset to defaults (not yet saved)');
  };

  return (
    <AdminGuard>
      <main style={{ display: 'grid', gap: 20, maxWidth: 720 }}>
        <h1>Admin Dashboard</h1>

        <AudioSettings
          value={settings.audio}
          onChange={(audio) => update({ ...settings, audio })}
        />

        <GameSettings
          value={settings.game}
          onChange={(game) => update({ ...settings, game })}
        />

        <MusicLibrarySettings value={settings.musicLibrary} />

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" onClick={handleSave}>
            Save Settings
          </button>
          <button type="button" onClick={handleReset}>
            Restore Defaults
          </button>
          {dirty ? <span>●</span> : null}
        </div>

        {status ? <p aria-live="polite">{status}</p> : null}
      </main>
    </AdminGuard>
  );
}
