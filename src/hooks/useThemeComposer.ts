import { useUnit as useEffectorUnit } from 'effector-react';

import { $settingsStore } from '@src/entities/settings';

import {
  THEME_SET,
  colorsLib,
  getNeutralSet,
  getLightModeColors,
  getDarkModeColors,
  getDarkModeShadows,
  getLightModeShadows,
  getDarkModePrimarySet,
  type LaunchColors,
  type LaunchThemeID,
} from '@launch-ui/theme';

const THEME_NAMES_TO_NEUTRAL_SAT: Record<LaunchThemeID, number> = {
  classic: 223 - 180,
  violet: 263 - 180,
  radioactive: 86 + 180,
  sunset: 198,
  awesome: 346 - 180,
  mint: 161,
  yellow: 50,
  wine: 332,
};

export const useThemeComposer = (): LaunchColors => {
  const { themeName, darkMode } = useEffectorUnit($settingsStore);

  const accent = darkMode ? getDarkModePrimarySet(THEME_SET[themeName].primary) : THEME_SET[themeName].primary;

  const neutral = getNeutralSet(THEME_NAMES_TO_NEUTRAL_SAT[themeName], 6);

  const modedColors = darkMode ? getDarkModeColors(neutral) : getLightModeColors(neutral);

  const shadows = darkMode
    ? getDarkModeShadows(THEME_SET[themeName].primary, neutral)
    : getLightModeShadows(THEME_SET[themeName].primary, neutral);

  return {
    white: colorsLib.white,
    black: colorsLib.black,
    neutral,
    accent,
    shadows,

    ...THEME_SET[themeName],

    ...modedColors,
  };
};
