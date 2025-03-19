import React, { FC, useCallback, useMemo, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import styled from 'styled-components';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import { Button, ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Modal } from '@launch-ui/modal';

import { CreateTabs } from '@src/features/createTabs';

import { $userStore } from '@src/entities/user';
import { $bookmarksStore, setCurrentTab, setTabsWithDbUpdate, removeTab } from '@src/entities/bookmarks';

import { MODAL_PORTAL_ID } from '@src/shared/appContainers';
import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import HomeIcon from '@src/assets/svg/home.svg';
import TabsSetupIcon from '@src/assets/svg/switches.svg';
import BinIcon from '@src/assets/svg/trash.svg';

const SortableListStyled = styled(SortableList)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const TabsSetupStyled = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 24px;

  padding: 24px;

  & > ul {
    list-style: none;

    li:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

export const Tabs: FC = () => {
  const { uid } = useEffectorUnit($userStore);

  const [isSetupOpen, setIsSetupOpen] = useState<boolean>(false);

  const { tabs = [], currentTab } = useEffectorUnit($bookmarksStore);

  const sortableTabs = useMemo(() => tabs.filter((...[, i]) => i !== 0), [tabs]);

  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      if (!uid || !sortableTabs.length) return;

      const sortedTabs = arrayMoveImmutable([...sortableTabs], oldIndex, newIndex);
      setTabsWithDbUpdate({ uid, tabs: [tabs[0], ...sortedTabs], tabName: '' });
    },
    [tabs, sortableTabs, uid],
  );

  if (!tabs.length) return null;

  return (
    <>
      <SortableListStyled onSortEnd={onSortEnd}>
        <Button
          IconLeft={() => <HomeIcon />}
          title='Home'
          active={currentTab === 'Home'}
          onClick={() => setCurrentTab('Home')}
        />

        {sortableTabs.map(({ name }, i) => (
          <SortableItem key={`${name}${i}`}>
            <Button title={name} active={name === currentTab} onClick={() => setCurrentTab(name)} />
          </SortableItem>
        ))}

        {uid && <Button IconLeft={() => <TabsSetupIcon />} onClick={() => setIsSetupOpen(true)} />}

        {sortableTabs.length < 5 && <CreateTabs create='new-page' />}
      </SortableListStyled>

      {uid && (
        <Modal
          portalId={MODAL_PORTAL_ID}
          open={isSetupOpen}
          onClose={() => setIsSetupOpen(false)}
          borderRadius={LAUNCH_PAPER_BDRS}
        >
          <TabsSetupStyled>
            <Typography type='RoundedHeavy36'>Tabs Setup</Typography>

            <ul>
              {sortableTabs.map(({ name }) => (
                <li key={name}>
                  <ButtonAction
                    LeftIcon={() => <BinIcon />}
                    title={`Delete ${name} tab`}
                    appearance='danger'
                    onClick={() => {
                      if (!confirm(`Are you sure to remove tab ${name}`)) return;
                      removeTab({ uid, tabs, tabName: name });
                      setIsSetupOpen(false);
                    }}
                  />
                </li>
              ))}
            </ul>

            <ButtonGhost title='Cancel' onClick={() => setIsSetupOpen(false)} />
          </TabsSetupStyled>
        </Modal>
      )}
    </>
  );
};
