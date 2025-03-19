import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import { keys } from 'lodash';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Loader } from '@launch-ui/loader';
import { Input, Titlewrap, Switch } from '@launch-ui/input';

import { useUnitUpdate, useUnitDelete, type LaunchUnitProps, type SetupNoteFormData } from '@src/entities/note';

import { UNIT_NOTE_UNIT_QUERY, UNIT_NOTE_BODY_QUERY } from '@src/shared/queryKeys';

import { SetupNoteStyled } from './setupnote.styled';

import LabelIcon from '@src/assets/svg/lable.svg';
import SaveIcon from '@src/assets/svg/save.svg';
import BinIcon from '@src/assets/svg/trash.svg';

interface SetupNoteProps {
  closePopup: () => void;
  unit: LaunchUnitProps;
}

const SetupNote: FC<SetupNoteProps> = (props) => {
  const { closePopup, unit } = props;

  const qc = useQueryClient();
  const theme = useTheme();

  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SetupNoteFormData>({ defaultValues: { name: unit.name, locked: !!unit.locked } });

  const { mutate: deleteUnit, isPending: isUnitDeleting } = useUnitDelete(unit.code);

  const { mutate: updateUnit, isPending: isUnitUpdating } = useUnitUpdate({
    unitCode: unit.code,
    onSuccess: async () => {
      setIsRevalidating(true);
      await qc.invalidateQueries({ queryKey: [UNIT_NOTE_UNIT_QUERY, unit.code] });
      await qc.invalidateQueries({ queryKey: [UNIT_NOTE_BODY_QUERY, unit.code] });
      setIsRevalidating(false);

      reset();
      closePopup();
    },
  });

  const disabledButton = isUnitDeleting || isUnitUpdating || isRevalidating;

  return (
    <SetupNoteStyled
      onSubmit={handleSubmit((formData) => {
        // console.log('formData', formData);
        updateUnit(formData);
      })}
    >
      <Typography as='h2' type='RoundedHeavy36'>
        Note attributes
      </Typography>

      <div className='form-fields'>
        <Titlewrap title='Note title'>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Set note name',
              minLength: { value: 3, message: 'Space name must be at least 3 characters' },
              maxLength: { value: 64, message: 'Please do not go above 64 chars' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                icon={() => <LabelIcon />}
                aria-required
                state={errors.name ? 'error' : 'normal'}
                description={errors.name ? errors.name.message : ''}
                type='text'
                placeholder='Space name'
              />
            )}
          />
        </Titlewrap>

        <Titlewrap title='Note lock'>
          <Controller
            name='locked'
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={(checked) => field.onChange({ target: { value: checked } })} />
            )}
          />
        </Titlewrap>

        <div style={{ height: 24 }} />
        <Titlewrap title='Danger zone' titleColor={theme.texts.error}>
          <ButtonAction
            LeftIcon={() => <BinIcon />}
            loading={isUnitDeleting}
            disabled={disabledButton}
            appearance='danger'
            title='Delete note'
            type='button'
            onClick={(e) => {
              e.preventDefault();

              if (confirm(`Are you sure to delete ${unit.name}?`)) deleteUnit();
            }}
          />
        </Titlewrap>
        <div style={{ height: 24 }} />
      </div>

      <div className='form-control'>
        <ButtonAction
          loading={isUnitUpdating}
          disabled={disabledButton || !keys(dirtyFields).length || !!keys(errors).length}
          type='submit'
          title='Save'
          LeftIcon={() => <SaveIcon />}
        />

        <ButtonGhost
          type='button'
          title='Cancel'
          disabled={disabledButton}
          onClick={() => {
            reset();
            closePopup();
          }}
        />

        {isRevalidating && <Loader />}
      </div>
    </SetupNoteStyled>
  );
};

export { SetupNote };
