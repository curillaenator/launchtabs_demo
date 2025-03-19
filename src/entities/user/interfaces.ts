import { BookmarkTabProps } from '@src/entities/bookmarks';
import { SettingsStore } from '@src/entities/settings';

interface LaunchStoreUser {
  admin?: boolean;
  uid: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  spaces?: string[];
  settings: SettingsStore;
  lastViewedSpace?: string | null;
}

interface LaunchUserData extends LaunchStoreUser {
  pages: BookmarkTabProps[];
}

export type { LaunchStoreUser, LaunchUserData };
