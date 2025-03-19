import React, { FC, useRef, useCallback } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useTheme } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { debounce } from 'lodash';

import { Loader } from '@launch-ui/loader';
import { Drawer } from '@launch-ui/drawer';
import { Modal } from '@launch-ui/modal';

import { Header } from '@src/features/header';
import { Aside } from '@src/features/aside';
import { Background } from '@src/features/background';
import { Settings } from '@src/features/settings';
import { SignIn } from '@src/features/signin';

import { $appStore, setSignIn, setRightDrawer } from '@src/entities/app';
import { $userStore, useLauncUserData } from '@src/entities/user';
import { $settingsStore } from '@src/entities/settings';
import { setHeaderShadowed } from '@src/entities/header';

import { useThemeToCssv } from '@src/hooks/useThemeToCssv';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';
import { MAIN_ELEMENT_ID, DRAWER_PORTAL_ID, MODAL_PORTAL_ID } from '@src/shared/appContainers';

import { useContextValue } from './useContextValue';
import { $layoutContex as LayoutCTX } from './context';

import { LayoutStyled, MainStyled } from './layout.styled';

export const Layout: FC = () => {
  const user = useEffectorUnit($userStore);
  const { isLoading } = useLauncUserData(user);

  const { isAsideOpen, isSignInOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const { dynamicWallpaper } = useEffectorUnit($settingsStore);

  const mouseWatcher = useRef<((e: React.MouseEvent<Element, MouseEvent>) => void) | null>(null);

  const currentTheme = useTheme();
  const { layoutRef } = useThemeToCssv(currentTheme);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onViewportScroll = useCallback(
    debounce((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      //@ts-expect-error
      setHeaderShadowed(e.nativeEvent.target?.scrollTop > 72);
    }, 400),
    [],
  );

  const ctxValue = useContextValue();

  if (isLoading) return <Loader view='fullscreen' iconSize='48px' />;

  return (
    <LayoutCTX.Provider value={ctxValue}>
      <LayoutStyled
        ref={layoutRef}
        className='layout-container'
        data-description='layout-container'
        $isAsideOpen={isAsideOpen}
        onMouseMove={(e) => {
          if (!dynamicWallpaper || isRightDrawerOpen || !mouseWatcher.current) return;
          mouseWatcher.current(e);
        }}
      >
        <Background
          setMouseWatcher={(watcher: (e: React.MouseEvent<Element, MouseEvent>) => void) => {
            if (!dynamicWallpaper) return;
            mouseWatcher.current = watcher;
          }}
        />

        <aside className='aside'>
          <Aside />
        </aside>

        <div className='viewport' onScroll={onViewportScroll}>
          <Header />

          <MainStyled id={MAIN_ELEMENT_ID}>
            <Outlet />
          </MainStyled>
        </div>

        {!!user.uid && (
          <Drawer
            portalId={DRAWER_PORTAL_ID}
            open={isRightDrawerOpen}
            onClose={() => setRightDrawer(false)}
            //
          >
            <Settings />
          </Drawer>
        )}

        {!user.uid && (
          <Modal
            portalId={MODAL_PORTAL_ID}
            open={isSignInOpen}
            onClose={() => setSignIn(false)}
            borderRadius={LAUNCH_PAPER_BDRS}
          >
            <SignIn closePopup={() => setSignIn(false)} />
          </Modal>
        )}
      </LayoutStyled>
    </LayoutCTX.Provider>
  );
};
