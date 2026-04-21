import type {
  Difficulty,
  GameSettingsState,
} from './adminSettingsStore';

type GameSettingsProps = {
  value: GameSettingsState;
  onChange: (next: GameSettingsState) => void;
};

const difficultyOptions: Difficulty[] = ['easy', 'normal', 'hard'];

export function GameSettings({ value, onChange }: GameSettingsProps) {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2>Game Settings</h2>

      <label htmlFor="difficulty" style={{ display: 'grid', gap: 6 }}>
        <span>Difficulty</span>
        <select
          id="difficulty"
          value={value.difficulty}
          onChange={(event) =>
            onChange({ ...value, difficulty: event.target.value as Difficulty })
          }
        >
          {difficultyOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="control-sensitivity" style={{ display: 'grid', gap: 6 }}>
        <span>Control Sensitivity: {value.controlSensitivity}%</span>
        <input
          id="control-sensitivity"
          type="range"
          min={0}
          max={100}
          value={value.controlSensitivity}
          onChange={(event) =>
            onChange({ ...value, controlSensitivity: Number(event.target.value) })
          }
        />
      </label>

      <label htmlFor="vibration-enabled" style={{ display: 'flex', gap: 8 }}>
        <input
          id="vibration-enabled"
          type="checkbox"
          checked={value.vibrationEnabled}
          onChange={(event) =>
            onChange({ ...value, vibrationEnabled: event.target.checked })
          }
        />
        <span>Controller Vibration Enabled</span>
      </label>
    </section>
  );
}
