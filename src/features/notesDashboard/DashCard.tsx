import React, { FC, HTMLAttributes } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { keys } from 'lodash';

import { Corners, BDRS } from '@launch-ui/shape';
import { ButtonGhost } from '@launch-ui/button';
import { Loader } from '@launch-ui/loader';
import { Typography } from '@launch-ui/typography';

import { $userStore } from '@src/entities/user';
import { LaunchUnitProps } from '@src/entities/note';

import { UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';

import SetupIcon from '@src/assets/svg/switches.svg';
import SpaceIcon from '@src/assets/svg/space.svg';

const Card = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.light};
  --shp-bdc: transparent;

  position: relative;
  border-radius: calc(${BDRS[32]}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.light};
  padding: calc(var(--layout-pd) / 2) 16px;
`;

const CardContent = styled.div`
  width: 100%;

  .card-content-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-content-top {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 40px;

    & > svg {
      flex: 0 0 auto;
    }

    & > h3 {
      width: 100%;
      flex: 1 1 auto;
      padding: 8px 0%;
    }
  }

  .card-content-body {
    list-style: none;
    padding-left: 32px;
  }
`;

interface DashCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  loading?: boolean;
  hierarchy?: LaunchUnitProps['hierarchy'];
  createdBy?: string;
  onSetup?: () => void;
}

const DashCard: FC<DashCardProps> = (props) => {
  const { title, hierarchy, onSetup, createdBy, loading, ...restDiv } = props;

  const { uid } = useEffectorUnit($userStore);

  const qc = useQueryClient();

  const childUnits = keys(hierarchy);

  const iCanSetup = uid === createdBy;

  return (
    <Card {...restDiv} data-space-card={title}>
      <Corners borderRadius={BDRS[32]} />

      <CardContent>
        <div className='card-content-top'>
          {loading ? (
            <Loader iconSize='24px' />
          ) : (
            <>
              <SpaceIcon />

              <Typography as='h3' type='RoundedBold20' className='card-content-title'>
                {title || ''}
              </Typography>

              {iCanSetup && <ButtonGhost title='Setup' RightIcon={() => <SetupIcon />} onClick={onSetup} />}
            </>
          )}
        </div>

        {!loading && !!childUnits.length && (
          <ul className='card-content-body'>
            {childUnits.map((childUnitId) => {
              const childUnitData = qc.getQueryData([UNIT_NOTE_UNIT_QUERY, childUnitId]) as LaunchUnitProps | null;

              if (!childUnitData) return null;

              return (
                <li key={childUnitId}>
                  <Typography color='var(--theme-texts-placeholder)' type='TextRegular16'>
                    {childUnitData.name}
                  </Typography>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export { DashCard };
