import { useEffect, useRef } from 'react';
import { toPairs, isEqual } from 'lodash';
import { TTheme } from '@launch-ui/theme';

const traverseTheme = (map: Map<string, string>, val: Record<string, unknown> | string, path: string[]) => {
  if (typeof val === 'string') return map.set('--'.concat(path.join('-')), val);

  toPairs(val).forEach(([themeKey, themeVal]) =>
    traverseTheme(map, themeVal as Record<string, unknown>, [...path, themeKey]),
  );
};

const useThemeToCssv = (theme: TTheme) => {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const lastThemeRef = useRef<TTheme | null>(null);
  const cssv = useRef(new Map<string, string>());

  useEffect(() => {
    cssv.current.clear();

    const body = document.getElementsByTagName('body')?.[0];

    if (!body || isEqual(lastThemeRef.current, theme)) return;

    //@ts-expect-error
    traverseTheme(cssv.current, theme, ['theme']);

    cssv.current.forEach((cssvVal, cssvKey) => body.style.setProperty(cssvKey, cssvVal));

    lastThemeRef.current = theme;
  }, [theme]);

  return { layoutRef };
};

export { useThemeToCssv };
