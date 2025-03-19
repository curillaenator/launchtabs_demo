import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { Corners } from '@launch-ui/shape';
import { Input } from '@launch-ui/input';
import { Typography } from '@launch-ui/typography';
import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Loader } from '@launch-ui/loader';

import { CreateFormCTX } from '../context';
import { useCustomIcons } from '../hooks/useCustomIcons';

import { Scrollbars } from '@src/features/scrollbars';
import { BookmarkCard } from '@src/features/bookmarks/card';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import LabelIcon from '@src/assets/svg/lable.svg';
import LinkIcon from '@src/assets/svg/link.svg';
import AddLinkIcon from '@src/assets/svg/addLink.svg';

const ICONS_IN_A_ROW = 4;

const NewTabForm = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  position: relative;

  width: calc(80px * ${ICONS_IN_A_ROW} + 8px * (${ICONS_IN_A_ROW} - 1) + 2 * 32px + 16px);
  padding: var(--layout-pd);

  background-color: var(--shp-bgc);
  border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
  filter: drop-shadow(${({ theme }) => theme.shadows.base});

  .popup-title {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.texts.base};

    & > h3 {
      z-index: 1;
    }

    &-themed {
      color: ${({ theme }) => theme.primary[500]};
    }
  }

  .popup-inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;

    &_withButton {
      display: flex;
      align-items: center;
    }
  }

  .popup-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    width: 100%;
    margin-bottom: 24px;

    &-loader {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    &-array {
      display: grid;
      grid-template-columns: repeat(${ICONS_IN_A_ROW}, 80px);
      width: calc(80px * ${ICONS_IN_A_ROW} + 8px * (${ICONS_IN_A_ROW} - 1));
      gap: 8px;

      &-selector {
        width: fit-content;
        height: fit-content;
      }

      &-image {
        width: 80px;
        height: 80px;
        object-fit: contain;
        overflow: hidden;
      }
    }
  }

  .popup-preview {
    padding: 0 32px;
    margin-bottom: 24px;
  }

  .popup-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;

const LinkPopup: FC<{ closePopup?: () => void }> = ({ closePopup }) => {
  const { formState, dispatchForm, handleCreate } = useContext(CreateFormCTX);

  const { iconsWithGoodLinks, isFetching, fetchIcons } = useCustomIcons(formState.name);

  return (
    <NewTabForm
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate?.();
        closePopup?.();
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Испольтзован Shape чтобы отбросить красивую тень */}
      <Corners borderRadius={LAUNCH_PAPER_BDRS} />

      <div className='popup-title'>
        <Typography as='h2' type='RoundedHeavy24'>
          New
        </Typography>

        <Typography as='h2' type='RoundedHeavy24' className='popup-title-themed'>
          Link
        </Typography>
      </div>

      <div className='popup-inputs'>
        <Input
          type='text'
          icon={() => <LabelIcon />}
          name='new-bookmark'
          limitSymbols={24}
          value={formState.name}
          onChange={(e) => dispatchForm?.({ key: 'name', payload: e.target.value })}
          // onFocusOut={fetchIcons}
          placeholder='Title'
        />

        <Input
          type='text'
          icon={() => <LinkIcon />}
          name='new-link'
          value={formState.link}
          onChange={(e) => dispatchForm?.({ key: 'link', payload: e.target.value })}
          placeholder='Site link'
        />
      </div>

      <div className='popup-icons'>
        <ButtonAction
          disabled={!formState.name}
          appearance='secondary'
          title='Get icons by title'
          onClick={fetchIcons}
        />

        {isFetching && (
          <div className='popup-icons-loader'>
            <Loader iconSize='32px' />
          </div>
        )}

        {!!iconsWithGoodLinks.length && !isFetching && (
          <Scrollbars height='168px'>
            <div className='popup-icons-array'>
              {iconsWithGoodLinks.map((icon) => (
                <button
                  type='button'
                  key={icon.url}
                  className='popup-icons-array-selector'
                  onClick={() => dispatchForm?.({ key: 'iconURL', payload: icon.url })}
                >
                  <img key={icon.url} className='popup-icons-array-image' src={icon.url} alt={icon.url} />
                </button>
              ))}
            </div>
          </Scrollbars>
        )}
      </div>

      <div className='popup-preview'>
        <BookmarkCard
          disabled
          bookmark={{
            name: formState.name || 'Title',
            link: formState.link,
            imageURL: formState.imageURL,
            iconURL: formState.iconURL,
          }}
        />
      </div>

      <div className='popup-buttons'>
        <ButtonAction LeftIcon={() => <AddLinkIcon />} title='Add' type='submit' />
        <ButtonGhost title='Cancel' type='button' onClick={() => closePopup?.()} />
      </div>
    </NewTabForm>
  );
};

export { LinkPopup };
