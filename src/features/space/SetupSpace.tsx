import React, { FC, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import { keys } from 'lodash';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Loader } from '@launch-ui/loader';
import { Input, Titlewrap } from '@launch-ui/input';

import { $userStore } from '@src/entities/user';
import { useUpdateSpace, useDeleteSpace, type LaunchSpaceProps } from '@src/entities/space';

import { USER_SPACES_QUERY, USER_QUERY } from '@src/shared/queryKeys';

import { SetupSpaceStyled } from './setupspace.styled';

import LabelIcon from '@src/assets/svg/lable.svg';
import SaveIcon from '@src/assets/svg/save.svg';
import BinIcon from '@src/assets/svg/trash.svg';

interface SetupSpaceProps {
  closePopup: () => void;
  space: LaunchSpaceProps;
}

const SetupSpace: FC<SetupSpaceProps> = (props) => {
  const { closePopup, space } = props;

  const { uid, spaces: spaceIdList } = useEffectorUnit($userStore);

  const qc = useQueryClient();
  const theme = useTheme();

  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<{ name: string }>({ defaultValues: { name: space.name } });

  const { mutate: updateSpace, isPending: isSpaceUpdating } = useUpdateSpace(space.spaceCode, uid!, {
    onSuccess: async (updatedSpaceCode) => {
      if (!updatedSpaceCode) {
        alert('oops... something went wrong, please reload');
        return;
      }

      setIsRevalidating(true);
      await qc.invalidateQueries({ queryKey: [USER_SPACES_QUERY, spaceIdList] });
      setIsRevalidating(false);

      reset();
      closePopup();
    },
  });

  const { mutate: deleteSpace, isPending: isSpaceDeleting } = useDeleteSpace(space, {
    onSuccess: async () => {
      setIsRevalidating(true);
      await qc.invalidateQueries({ queryKey: [USER_QUERY, uid] });
      setIsRevalidating(false);

      reset();
      closePopup();
    },
  });

  const isButtonsDisabled = isSpaceDeleting || isSpaceUpdating || isRevalidating;

  return (
    <SetupSpaceStyled
      onSubmit={handleSubmit((formData) => {
        // console.log('formData', formData);
        updateSpace(formData);
      })}
    >
      <Typography as='h2' type='RoundedHeavy36'>
        Space setup
      </Typography>

      <div className='form-fields'>
        <Titlewrap title='Space title'>
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
                //@ts-expect-error
                disabled={isButtonsDisabled}
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

        <div style={{ height: 24 }} />
        <Titlewrap title='Danger zone' titleColor={theme.texts.error}>
          <ButtonAction
            LeftIcon={() => <BinIcon />}
            disabled={isButtonsDisabled}
            loading={isSpaceDeleting}
            appearance='danger'
            title='Delete space'
            type='button'
            onClick={(e) => {
              e.preventDefault();

              if (confirm(`Are you sure to delete space ${space.name}?`)) {
                deleteSpace();
              }
            }}
          />
        </Titlewrap>
        <div style={{ height: 24 }} />
      </div>

      <div className='form-control'>
        <ButtonAction
          loading={isSpaceUpdating}
          disabled={isButtonsDisabled || !keys(dirtyFields).length || !!keys(errors).length}
          type='submit'
          title='Save'
          LeftIcon={() => <SaveIcon />}
        />

        <ButtonGhost
          type='button'
          title='Cancel'
          disabled={isButtonsDisabled}
          onClick={() => {
            reset();
            closePopup();
          }}
        />

        {isRevalidating && <Loader />}
      </div>
    </SetupSpaceStyled>
  );
};

export { SetupSpace };
