import { createStore, createEvent } from 'effector';

interface AppStore {
  isSignInOpen: boolean;
  isAsideOpen: boolean;
  isRightDrawerOpen: boolean;
  isHeaderShadowed: boolean;
}

const DEFAULT_APP_STORE: AppStore = {
  isSignInOpen: false,
  isAsideOpen: false,
  isRightDrawerOpen: false,
  isHeaderShadowed: false,
};

const setSignIn = createEvent<AppStore['isSignInOpen']>();
const setAside = createEvent<AppStore['isAsideOpen']>();
const setRightDrawer = createEvent<AppStore['isRightDrawerOpen']>();
const setHeaderShadowed = createEvent<AppStore['isHeaderShadowed']>();

const $appStore = createStore<AppStore>(DEFAULT_APP_STORE);

$appStore
  .on(setAside, (prevAppState, isAsideOpen) => ({ ...prevAppState, isAsideOpen }))
  .on(setSignIn, (prevAppState, isSignInOpen) => ({ ...prevAppState, isSignInOpen }))
  .on(setRightDrawer, (prevAppState, isRightDrawerOpen) => ({ ...prevAppState, isRightDrawerOpen }))
  .on(setHeaderShadowed, (prevAppState, isHeaderShadowed) => ({ ...prevAppState, isHeaderShadowed }));

export { $appStore, setAside, setSignIn, setRightDrawer, setHeaderShadowed };
