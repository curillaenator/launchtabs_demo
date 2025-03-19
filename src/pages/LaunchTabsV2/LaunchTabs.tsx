import React, { FC, memo, useEffect } from 'react';
import styled from 'styled-components';
import { useUnit as UseEffectoUnit } from 'effector-react';

import { Loader } from '@launch-ui/loader';

import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';
import { useBookmarksData } from '@src/entities/bookmarks';

import { BookmarksTabs } from '@src/features/bookmarksTabs';
import { Bookmarks } from '@src/features/bookmarks';

const LaunchTabsContainer = styled.div`
  width: 100%;
  padding: calc(var(--layout-pd) * 2) var(--layout-pd);

  @media (min-width: 1921px) {
    padding: calc(var(--layout-pd) * 6);
  }
`;

const LaunchTabs: FC = memo(() => {
  const { uid } = UseEffectoUnit($userStore);
  const { isBookmarksDataLoading } = useBookmarksData(uid);

  useEffect(() => {
    setHeaderMidComponent(BookmarksTabs);

    return () => {
      setHeaderMidComponent(null);
    };
  }, []);

  if (isBookmarksDataLoading)
    return (
      <LaunchTabsContainer>
        <Loader view='fit-parent' iconSize='48px' />
      </LaunchTabsContainer>
    );

  return (
    <LaunchTabsContainer>
      <Bookmarks />
    </LaunchTabsContainer>
  );
});

export { LaunchTabs };
