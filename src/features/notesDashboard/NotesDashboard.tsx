import React, { FC, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { Typography } from '@launch-ui/typography';
import { Corners, BDRS } from '@launch-ui/shape';
import { Modal } from '@launch-ui/modal';

import { $userStore } from '@src/entities/user';
import { LaunchSpaceProps, useSpaces } from '@src/entities/space';

import { SetupSpace } from '@src/features/space';

import { MODAL_PORTAL_ID } from '@src/shared/appContainers';

import { DashCard } from './DashCard';
import { NoteContainer } from './dashboard.styled';

const NotesDashboard: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const { spaces: spaceIdList = [] } = useEffectorUnit($userStore);

  const [spaceSetupOpen, setSpaceSetupOpen] = useState<boolean>(false);
  const [setupSpace, setSetupSpace] = useState<LaunchSpaceProps | null>(null);

  const { data: userSpaces = [], isLoading: isUserSpacesLoading } = useSpaces(spaceIdList);

  return (
    <>
      <NoteContainer height={maxHeight}>
        <Corners borderRadius={BDRS[24]} />

        <div className='dashboard-block'>
          <Typography as='span' type='RoundedHeavy24'>
            {'Notes '}
          </Typography>
          <Typography as='span' type='RoundedHeavy24' className='highlighted'>
            Spaces
          </Typography>
        </div>

        <div className='dashboard-block dashboard-block-grid'>
          {isUserSpacesLoading ? (
            <DashCard loading />
          ) : (
            userSpaces.map((userSpace) => (
              <DashCard
                key={userSpace.spaceCode}
                title={userSpace.name}
                hierarchy={userSpace.hierarchy}
                createdBy={userSpace.createdBy}
                onSetup={() => {
                  setSetupSpace(userSpace);
                  setSpaceSetupOpen(true);
                }}
              />
            ))
          )}
        </div>

        {/* <div className='dashboard-block'>
          <Typography as='span' type='RoundedHeavy24'>
            {'Last viewed '}
          </Typography>
          <Typography as='span' type='RoundedHeavy24' className='highlighted'>
            Notes
          </Typography>
        </div> */}
      </NoteContainer>

      <Modal
        borderRadius={BDRS[24]}
        portalId={MODAL_PORTAL_ID}
        open={spaceSetupOpen}
        onClose={() => {
          setSetupSpace(null);
          setSpaceSetupOpen(false);
        }}
      >
        {!!setupSpace && (
          <SetupSpace
            closePopup={() => {
              setSetupSpace(null);
              setSpaceSetupOpen(false);
            }}
            space={setupSpace}
          />
        )}
      </Modal>
    </>
  );
};

export { NotesDashboard };
