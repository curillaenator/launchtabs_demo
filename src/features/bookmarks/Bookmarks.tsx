import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import { ContextMenu } from '@launch-ui/context-menu';

import { $bookmarksStore, reorderCards, BookmarkTabProps, removeCard } from '@src/entities/bookmarks';
import { $userStore } from '@src/entities/user';

import { CreateTabs } from '@src/features/createTabs';

import { BookmarkCard } from './card';
import { SortableListStyled, HoverWrapper } from './styles';

const FALLBACK_PAGES: BookmarkTabProps = { name: 'Home', pages: [] };

export const Bookmarks: FC = () => {
  const { uid } = useEffectorUnit($userStore);
  const { tabs = [], currentTab } = useEffectorUnit($bookmarksStore);

  const { name, pages: cards = [] } = tabs.find((el) => el?.name === currentTab) || FALLBACK_PAGES;

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    if (!uid) return;
    const reorderedCards = arrayMoveImmutable([...cards], oldIndex, newIndex);
    reorderCards({ uid, tabs, tabName: name, reorderedCards });
  };

  return (
    <SortableListStyled data-bookmarks-container onSortEnd={onSortEnd}>
      {cards.map((card, cardIdx) => (
        <SortableItem key={`${card.name}${cardIdx}`}>
          <HoverWrapper>
            <ContextMenu
              items={[
                {
                  title: 'Delete',
                  danger: true,
                  handler: () => {
                    if (!uid) return;
                    removeCard({ uid, tabs, tabName: name, cardIdx });
                  },
                },
              ]}
            >
              <BookmarkCard bookmark={card} />
            </ContextMenu>
          </HoverWrapper>
        </SortableItem>
      ))}

      <CreateTabs create='new-bookmark' />
    </SortableListStyled>
  );
};
