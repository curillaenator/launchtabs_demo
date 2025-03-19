import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { useDomStyles } from '../hooks/useDomStyles';

import GlobalFonts from '../assets/fonts/fonts';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentTheme } = useDomStyles();

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalFonts />
      {children}
    </StyledThemeProvider>
  );
};

export { ThemeProvider };
