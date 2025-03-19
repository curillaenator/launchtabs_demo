import type { LaunchThemeID } from '@launch-ui/theme';

interface SettingsStore {
  isDynamicWallpaper: boolean;
  dynamicWallpaper: 'clouds' | 'beach';
  wallpaper: string | null;
  darkMode: boolean;
  themeName: LaunchThemeID;
}

export type { SettingsStore };
