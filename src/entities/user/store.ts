import { createStore, createEvent } from 'effector';

import { NULL_USER } from './contants';
import type { LaunchStoreUser } from './interfaces';

const setUser = createEvent<Partial<LaunchStoreUser>>();

const $userStore = createStore<LaunchStoreUser>(NULL_USER);

$userStore.on(setUser, (prev, userData) => ({ ...prev, ...userData }));

export { $userStore, setUser };
