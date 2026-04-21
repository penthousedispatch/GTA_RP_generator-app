import type { AudioSettingsState } from './adminSettingsStore';

type AudioSettingsProps = {
  value: AudioSettingsState;
  onChange: (next: AudioSettingsState) => void;
};

function slider(
  label: string,
  value: number,
  onChange: (next: number) => void,
  id: string,
) {
  return (
    <label htmlFor={id} style={{ display: 'grid', gap: 6 }}>
      <span>{label}: {value}%</span>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function AudioSettings({ value, onChange }: AudioSettingsProps) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2>Audio Settings</h2>
      {slider('Master Volume', value.master, (master) => onChange({ ...value, master }), 'master-volume')}
      {slider('Music Volume', value.music, (music) => onChange({ ...value, music }), 'music-volume')}
      {slider('SFX Volume', value.sfx, (sfx) => onChange({ ...value, sfx }), 'sfx-volume')}
    </section>
  );
}
