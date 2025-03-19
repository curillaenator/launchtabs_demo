import React, { FC, useEffect, useCallback, useState } from 'react';

import { Typography } from '@launch-ui/typography';
import { ColorKey, colorsLib } from '@launch-ui/theme';

import { Corners } from '@launch-ui/shape';

import { PaletteContainer } from './palette.styled';

const GRAY_HSL = [...new Array(9)].map((_, i) => {
  const colorKey = (1000 - (i + 1) * 100) as ColorKey;

  return {
    ultra: colorsLib.ultra[colorKey],
    orange: colorsLib.orange[colorKey],
    danger: colorsLib.danger[colorKey],
    awesome: colorsLib.awesome[colorKey],
    nika: colorsLib.nika[colorKey],
    electroviolet: colorsLib.electroviolet[colorKey],
    yellow: colorsLib.yellow[colorKey],
    mint: colorsLib.mint[colorKey],
    wine: colorsLib.wine[colorKey],
  };
});

const Palette: FC = () => {
  const [pageOutletHeight, setPageOutletHeight] = useState<number>(0);

  const onWindowResize = useCallback(() => setPageOutletHeight(window.innerHeight - 168 - 56), []);

  useEffect(() => {
    onWindowResize();

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return (
    <PaletteContainer height={pageOutletHeight}>
      <Corners borderRadius={24} />

      <Typography as='h2' type='RoundedHeavy36'>
        Palette
      </Typography>

      <div style={{ display: 'flex', width: '100%' }}>
        {GRAY_HSL.map((clr) => (
          <div key={clr.ultra + clr.electroviolet + clr.yellow} style={{ width: '20%' }}>
            <div style={{ width: '100%', height: 128, backgroundColor: clr.ultra }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.electroviolet }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.orange }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.danger }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.awesome }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.yellow }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.nika }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.mint }} />
            <div style={{ width: '100%', height: 128, backgroundColor: clr.wine }} />
          </div>
        ))}
      </div>
    </PaletteContainer>
  );
};

export { Palette };
