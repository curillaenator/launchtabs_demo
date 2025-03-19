import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { CreateFormCTX } from '../context';

import { Input } from '@launch-ui/input';
import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';
import { ButtonAction, ButtonGhost } from '@launch-ui/button';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import LabelIcon from '@src/assets/svg/lable.svg';
import CreateIcon from '@src/assets/svg/addTab.svg';

const PopupForm = styled.form`
  width: 336px;

  .popup {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: transparent;

    position: relative;
    width: 100%;
    padding: var(--layout-pd);
    z-index: 20;
    will-change: filter;
    overflow: visible;

    background-color: var(--shp-bgc);
    border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
    filter: drop-shadow(${({ theme }) => theme.shadows.base});

    &-title {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: var(--layout-pd);
      color: ${({ theme }) => theme.texts.base};

      &-themed {
        color: ${({ theme }) => theme.primary[500]};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: var(--layout-pd);
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
  }
`;

const TabPopup: FC<{ closePopup?: () => void }> = ({ closePopup }) => {
  const { formState, dispatchForm, handleCreate } = useContext(CreateFormCTX);

  return (
    <PopupForm
      onMouseDown={(e) => e.stopPropagation()}
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate?.();
        closePopup?.();
      }}
    >
      <div className='popup'>
        <Corners className='popup-shape' borderRadius={LAUNCH_PAPER_BDRS} />

        <div className='popup-title'>
          <Typography as='h2' type='RoundedHeavy24'>
            New
          </Typography>
          <Typography as='h2' type='RoundedHeavy24' className='popup-title-themed'>
            Tab
          </Typography>
        </div>

        <div className='popup-inputs'>
          <Input
            type='text'
            icon={() => <LabelIcon />}
            name='new-page'
            placeholder='Title'
            limitSymbols={24}
            value={formState.name}
            onChange={(e) => dispatchForm?.({ key: 'name', payload: e.target.value })}
          />
        </div>

        <div className='popup-buttons'>
          <ButtonAction LeftIcon={() => <CreateIcon />} title='Add' type='submit' />
          <ButtonGhost title='Cancel' type='button' onClick={() => closePopup?.()} />
        </div>
      </div>
    </PopupForm>
  );
};

export { TabPopup };
