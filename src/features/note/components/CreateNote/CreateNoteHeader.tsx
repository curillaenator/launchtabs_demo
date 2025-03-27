import React, { FC } from 'react';
import { UseFormRegister as HookFormRegister } from 'react-hook-form';
import styled from 'styled-components';

import type { RichTextJsonContent } from '@launch-ui/richtext';
import { Loader } from '@launch-ui/loader';
import { Corners, BDRS } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import type { LaunchUnitProps } from '@src/entities/note';

const NoteHeaderStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  display: flex;
  align-items: center;

  gap: 16px;
  padding: 4px 12px;

  width: 100%;
  height: 48px;
  border-radius: calc(${BDRS[20]}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  margin: 0 24px;

  & > svg {
    flex: 0 0 auto;
  }

  .create-note-title-input {
    outline: none;
    border: none;
    background-color: transparent;

    flex: 1 1 auto;
    width: 100%;
    height: 40px;

    color: ${({ theme }) => theme.texts.base};
    font-family: inherit;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;

    &::placeholder {
      color: ${({ theme }) => theme.texts.placeholder};
      font-family: inherit;
      font-size: 32px;
      line-height: 40px;
      font-weight: 600;
    }
  }
`;

const NoteHeaderChildren = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 8px;
  width: fit-content;
  min-height: 40px;
  max-height: 40px;
`;

interface CreateNoteHeaderProps {
  register: HookFormRegister<LaunchUnitProps & { noteBody: RichTextJsonContent | string }>;
  isSubmitting: boolean;
}

const CreateNoteHeader: FC<CreateNoteHeaderProps> = (props) => {
  const { register, isSubmitting } = props;

  return (
    <NoteHeaderStyled data-create-note-header>
      <Corners borderRadius={BDRS[20]} />

      <input
        autoComplete='off'
        type='text'
        placeholder='Note title...'
        className='create-note-title-input'
        {...register('name', {
          required: 'Set note title',
          minLength: { value: 3, message: 'Please use at least 3 chars' },
          maxLength: { value: 64, message: 'Please do not go above 64 chars' },
        })}
      />

      <NoteHeaderChildren>
        {isSubmitting && (
          <>
            <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
              Saving
            </Typography>
            <Loader />
          </>
        )}
      </NoteHeaderChildren>
    </NoteHeaderStyled>
  );
};

export { CreateNoteHeader };
