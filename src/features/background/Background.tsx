import React, { FC, useEffect } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { Beach, Clouds, useCloudsPositionStyle } from '@launch-ui/dynamic-bg';
import { $settingsStore } from '@src/entities/settings';
import styled from 'styled-components';

export const CLOUDS_RATES: Record<string, number> = {
  cloud1: 6,
  cloud2: 14,
  cloud3: 10,
  cloud4: 20,
};

export const BEACH_RATES: Record<string, number> = {
  cloud2: 20,
  cloud3: 14,
  cloud4: 6,
};

const BackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -50;
  background-color: ${({ theme }) => theme.backgrounds.light};

  .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DynamicWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

interface BackgroundProps {
  setMouseWatcher: (watcher: (e: React.MouseEvent<Element, MouseEvent>) => void) => void;
}

export const Background: FC<BackgroundProps> = (props) => {
  const { setMouseWatcher } = props;

  const { wallpaper, isDynamicWallpaper, dynamicWallpaper } = useEffectorUnit($settingsStore);

  const {
    watchMouse,
    // layerRotation,
    positionStyles,
  } = useCloudsPositionStyle();

  useEffect(() => {
    if (isDynamicWallpaper) setMouseWatcher(watchMouse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDynamicWallpaper]);

  if (isDynamicWallpaper) {
    return (
      <DynamicWrapper data-description='background-container'>
        <div
          // style={layerRotation}
          className='content'
        >
          {dynamicWallpaper === 'beach' && <Beach positionStyles={positionStyles} />}
          {dynamicWallpaper === 'clouds' && <Clouds positionStyles={positionStyles} />}
        </div>
      </DynamicWrapper>
    );
  }

  if (!wallpaper) return <BackgroundStyled data-description='background-container' />;

  return (
    <BackgroundStyled data-description='background-container'>
      <img className='background' src={wallpaper} alt='launch-tabs-background' />
    </BackgroundStyled>
  );
};
