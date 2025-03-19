import { FC } from 'react';
import { createStore, createEvent } from 'effector';

interface HeaderStore {
  isHeaderShadowed: boolean;
  midComponent: FC | null;
}

const setHeaderShadowed = createEvent<boolean>();
const setHeaderMidComponent = createEvent<FC | null>();

const $headerStore = createStore<HeaderStore>({ isHeaderShadowed: false, midComponent: null });

$headerStore
  .on(setHeaderShadowed, (prev, isHeaderShadowed) => ({ ...prev, isHeaderShadowed }))
  .on(setHeaderMidComponent, (prev, midComponent) => ({ ...prev, midComponent }));

export { $headerStore, setHeaderShadowed, setHeaderMidComponent };
