import React, { FC, useEffect, useState, memo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { keys, isEqual } from 'lodash';

import { Dropable } from '@launch-ui/dropable';
import { Hierarchy } from '@launch-ui/hierarchy';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';
import { Loader } from '@launch-ui/loader';

import { useDropable } from '@src/hooks/useDropable';

import { $userStore } from '@src/entities/user';
import { $appStore } from '@src/entities/app';
import { getNoteUnitQuery } from '@src/entities/note';
import { $spaceStore, setSelectedSpace, useSpaces, updateLastViewedSpace } from '@src/entities/space';

import { MAX_SPACES_PER_USER, MAX_UNITS_PER_SPACE, COMMON_USERS_DOCS_SPACE } from '@src/shared/appConfig';
import { UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';

import { AsideNotesElementStyled } from './AsideNotesElement.styled';

import SpaceIcon from '@src/assets/svg/space.svg';
import AddSpaceIcon from '@src/assets/svg/addSpace.svg';
import AddDocumentIcon from '@src/assets/svg/addDocument.svg';

type CreateParamType = 'space' | 'note';

type RouteParams = {
  noteId?: string;
  createPageType?: CreateParamType;
};

const AsideNotesElement: FC<{ uid: string }> = memo(({ uid }) => {
  const navigate = useNavigate();
  const { createPageType } = useParams<RouteParams>();

  const { spaces: spaceIdList = [], lastViewedSpace } = useEffectorUnit($userStore);
  const { space: selectedSpace } = useEffectorUnit($spaceStore);
  const { isAsideOpen } = useEffectorUnit($appStore);

  const [showCreateSapceButtonLoader, setShowCreateSapceButtonLoader] = useState(false);
  const [isCreateSpaceButton, setIsCreateSpaceButton] = useState<boolean>(false);

  const { data: userSpaces = [] } = useSpaces(spaceIdList, { enabled: isAsideOpen });

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!!userSpaces?.length) {
      setShowCreateSapceButtonLoader(false);
      setIsCreateSpaceButton(false);

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }

      return;
    } else {
      setShowCreateSapceButtonLoader(true);
      setIsCreateSpaceButton(true);
    }

    timeoutId.current = setTimeout(() => {
      setShowCreateSapceButtonLoader(false);
      setIsCreateSpaceButton(true);
    }, 4000);
  }, [userSpaces]);

  useEffect(() => {
    const targetLastViwedSpace = !!selectedSpace ? selectedSpace.spaceCode : lastViewedSpace;
    const spaceToSet = userSpaces?.find((sp) => sp.spaceCode === targetLastViwedSpace) || userSpaces?.[0] || null;

    if (!isEqual(spaceToSet, selectedSpace)) setSelectedSpace(spaceToSet);
  }, [selectedSpace, userSpaces, lastViewedSpace]);

  const {
    isOpen: isSpaceSelectorOpen = false,
    closeDropdown: closeSpaceSelector,
    ...restSpaceSelector
  } = useDropable();

  // const isSpaceListLoading = showCreateSapceButtonLoader || isUserSpacesLoading;

  return (
    <AsideNotesElementStyled data-aside-notes-element>
      {showCreateSapceButtonLoader && (
        <div className='selector-loader-dummy'>
          <Corners borderRadius={10} />
          <Loader iconSize='24px' />
        </div>
      )}

      {!showCreateSapceButtonLoader && !userSpaces.length && isCreateSpaceButton && (
        <ButtonAction
          active={createPageType === 'space'}
          appearance='secondary'
          disabled={!userSpaces}
          LeftIcon={() => <AddSpaceIcon />}
          title={!userSpaces ? 'Wait...' : 'Create LaunchSpace'}
          onClick={() => navigate('/notes/create/space')}
          fullwidth
          className='create-space-button'
        />
      )}

      {!showCreateSapceButtonLoader && !!userSpaces.length && (
        <>
          <div className='space-elements'>
            <Dropable
              {...restSpaceSelector}
              maxWidth={336}
              minWidth={336}
              offset={[0, 8]}
              openNode={
                <ButtonAction
                  LeftIcon={() => <SpaceIcon />}
                  title={userSpaces.find((sps) => sps.spaceCode === selectedSpace?.spaceCode)?.name}
                  active={isSpaceSelectorOpen}
                  appearance='secondary'
                  fullwidth
                  className='open-spaces-button'
                />
              }
            >
              {userSpaces.map((userSpace) => (
                <ButtonGhost
                  LeftIcon={() => <SpaceIcon />}
                  key={userSpace.spaceCode}
                  height={32}
                  title={userSpace.name}
                  onClick={() => {
                    setSelectedSpace(userSpace);
                    updateLastViewedSpace(uid!, userSpace.spaceCode);
                    closeSpaceSelector?.();
                  }}
                />
              ))}
            </Dropable>

            <ButtonAction
              disabled={userSpaces.length >= MAX_SPACES_PER_USER}
              LeftIcon={() => <AddSpaceIcon />}
              appearance='secondary'
              onClick={() => navigate('/notes/create/space')}
              active={createPageType === 'space'}
            />

            <ButtonAction
              disabled={
                selectedSpace?.spaceCode === COMMON_USERS_DOCS_SPACE ||
                keys(selectedSpace?.hierarchy).length >= MAX_UNITS_PER_SPACE
              }
              LeftIcon={() => <AddDocumentIcon />}
              appearance='secondary'
              onClick={() => navigate('/notes/create/note')}
              active={createPageType === 'note'}
            />
          </div>

          {!!selectedSpace &&
          !!keys(userSpaces.find(({ spaceCode }) => selectedSpace.spaceCode === spaceCode)?.hierarchy).length ? (
            <div className='unit-list'>
              <Hierarchy
                queryKey={UNIT_NOTE_UNIT_QUERY}
                rootId={selectedSpace.spaceCode}
                rootItemsIds={
                  userSpaces.find(({ spaceCode }) => selectedSpace.spaceCode === spaceCode)?.hierarchy || {}
                }
                linkPattern={(item: { code: string }) => `/notes/${item.code}`}
                matchRoutePattern={() => `/notes/:noteId`}
                getItemQuery={getNoteUnitQuery}
                ItemLoader={() => (
                  <div style={{ height: '32px', padding: '4px 0' }}>
                    <Loader iconSize='24px' />
                  </div>
                )}
              />
            </div>
          ) : (
            <div className='unit-list_empty'>
              <span>No notes yet</span>
            </div>
          )}
        </>
      )}
    </AsideNotesElementStyled>
  );
});

export { AsideNotesElement };
