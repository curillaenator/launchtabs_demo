interface BookmarkCardProps {
  id?: string;
  name: string;
  deleted?: boolean;
  link: string;
  imageURL?: string | null;
  iconURL?: string | null;
}

interface BookmarkTabProps {
  name: string;
  pages: BookmarkCardProps[];
}

interface BookmarksStore {
  currentTab: string;
  tabs: BookmarkTabProps[];
}

interface BasePayload {
  uid: string | null;
  tabName: string;
  tabs: BookmarkTabProps[];
}

interface RemoveCardPayload extends BasePayload {
  cardIdx: number;
}

interface ReorderCardPayload extends BasePayload {
  reorderedCards: BookmarkCardProps[];
}

interface CreateCardPayload extends BasePayload {
  card: BookmarkCardProps;
}

export type {
  BookmarkCardProps,
  BookmarkTabProps,
  BookmarksStore,
  BasePayload,
  RemoveCardPayload,
  ReorderCardPayload,
  CreateCardPayload,
};
