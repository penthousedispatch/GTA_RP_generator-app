export const ADMIN_SETTINGS_SCHEMA_VERSION = 1;

const ADMIN_SETTINGS_STORAGE_KEY = 'gta_rp_admin_settings';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface AudioSettingsState {
  master: number;
  music: number;
  sfx: number;
}

export interface GameSettingsState {
  difficulty: Difficulty;
  controlSensitivity: number;
  vibrationEnabled: boolean;
}

export interface MusicLibrarySettingsState {
  customTracks: Array<{
    id: string;
    title: string;
    source?: string;
  }>;
}

export interface AdminSettings {
  schemaVersion: number;
  audio: AudioSettingsState;
  game: GameSettingsState;
  musicLibrary: MusicLibrarySettingsState;
}

const defaultSettings: AdminSettings = {
  schemaVersion: ADMIN_SETTINGS_SCHEMA_VERSION,
  audio: {
    master: 80,
    music: 70,
    sfx: 75,
  },
  game: {
    difficulty: 'normal',
    controlSensitivity: 50,
    vibrationEnabled: true,
  },
  musicLibrary: {
    customTracks: [],
  },
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

function sanitizeSettings(input: Partial<AdminSettings>): AdminSettings {
  return {
    schemaVersion: ADMIN_SETTINGS_SCHEMA_VERSION,
    audio: {
      master: clamp(input.audio?.master ?? defaultSettings.audio.master),
      music: clamp(input.audio?.music ?? defaultSettings.audio.music),
      sfx: clamp(input.audio?.sfx ?? defaultSettings.audio.sfx),
    },
    game: {
      difficulty:
        input.game?.difficulty === 'easy' ||
        input.game?.difficulty === 'hard' ||
        input.game?.difficulty === 'normal'
          ? input.game.difficulty
          : defaultSettings.game.difficulty,
      controlSensitivity: clamp(
        input.game?.controlSensitivity ?? defaultSettings.game.controlSensitivity,
      ),
      vibrationEnabled:
        typeof input.game?.vibrationEnabled === 'boolean'
          ? input.game.vibrationEnabled
          : defaultSettings.game.vibrationEnabled,
    },
    musicLibrary: {
      customTracks: Array.isArray(input.musicLibrary?.customTracks)
        ? input.musicLibrary.customTracks.map((track, index) => ({
            id: track.id || `track-${index + 1}`,
            title: track.title || `Track ${index + 1}`,
            source: track.source,
          }))
        : defaultSettings.musicLibrary.customTracks,
    },
  };
}

function migrateSettings(parsed: unknown): AdminSettings {
  if (!parsed || typeof parsed !== 'object') {
    return defaultSettings;
  }

  const raw = parsed as Partial<AdminSettings>;
  const incomingVersion =
    typeof raw.schemaVersion === 'number' ? raw.schemaVersion : 0;

  switch (incomingVersion) {
    case ADMIN_SETTINGS_SCHEMA_VERSION:
      return sanitizeSettings(raw);
    default:
      return sanitizeSettings(raw);
  }
}

function writeConfigFile(settings: AdminSettings): void {
  try {
    // Optional config-file persistence for environments that expose Node/Electron APIs.
    const globalRef = globalThis as typeof globalThis & {
      __GTA_RP_WRITE_ADMIN_CONFIG__?: (data: AdminSettings) => void;
    };

    if (typeof globalRef.__GTA_RP_WRITE_ADMIN_CONFIG__ === 'function') {
      globalRef.__GTA_RP_WRITE_ADMIN_CONFIG__(settings);
    }
  } catch {
    // Local storage is the primary persistence path; config file persistence is best effort.
  }
}

export function loadAdminSettings(): AdminSettings {
  try {
    const raw = window.localStorage.getItem(ADMIN_SETTINGS_STORAGE_KEY);
    if (!raw) {
      return defaultSettings;
    }

    return migrateSettings(JSON.parse(raw));
  } catch {
    return defaultSettings;
  }
}

export function saveAdminSettings(settings: AdminSettings): AdminSettings {
  const normalized = sanitizeSettings(settings);

  window.localStorage.setItem(
    ADMIN_SETTINGS_STORAGE_KEY,
    JSON.stringify(normalized),
  );
  writeConfigFile(normalized);

  return normalized;
}

export function getDefaultAdminSettings(): AdminSettings {
  return defaultSettings;
}
