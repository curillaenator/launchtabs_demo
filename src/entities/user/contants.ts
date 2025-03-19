import type { LaunchStoreUser } from './interfaces';

import { DEFAULT_SETTINGS } from '../settings/constants';

const NULL_USER: LaunchStoreUser = {
  uid: null,
  username: null,
  email: null,
  avatar: null,
  settings: DEFAULT_SETTINGS,
  spaces: [],
  lastViewedSpace: null,
  admin: false,
};

export { NULL_USER };
