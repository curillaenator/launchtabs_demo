import { createStore, createEvent } from 'effector';
import type { LaunchSpaceProps } from './interfaces';

interface LaunchSpaceStore {
  space?: LaunchSpaceProps | null;
}

const setSelectedSpace = createEvent<LaunchSpaceProps | null>();

const $spaceStore = createStore<LaunchSpaceStore>({
  space: null,
});

$spaceStore.on(setSelectedSpace, (_, space) => ({ space }));

export { $spaceStore, setSelectedSpace };
