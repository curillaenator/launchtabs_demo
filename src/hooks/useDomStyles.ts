import { useEffect } from 'react';

import { useThemeComposer } from './useThemeComposer';

const useDomStyles = () => {
  const currentTheme = useThemeComposer();

  useEffect(() => {
    const html = document.querySelector('html');

    if (!!html) {
      html.style.setProperty('--layout-pd', '24px');
      html.style.setProperty('--layout-bgc', currentTheme.backgrounds.base);
    }
  }, [currentTheme]);

  return { currentTheme };
};

export { useDomStyles };
