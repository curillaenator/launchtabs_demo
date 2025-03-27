import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUnit as useEffectorUnit } from 'effector-react';
import { keys } from 'lodash';

import { Corners, BDRS } from '@launch-ui/shape';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Input } from '@launch-ui/input';
import { Typography } from '@launch-ui/typography';

import { $userStore } from '@src/entities/user';
import { useCreateSpace, LaunchSpaceProps } from '@src/entities/space';

import { CreateSpaceForm } from './createSpace.styled';

import { USER_QUERY } from '@src/shared/queryKeys';

import LabelIcon from '@src/assets/svg/lable.svg';
import CreateSpaceIcon from '@src/assets/svg/addSpace.svg';

const CreateSpace: FC<{ maxHeight: number }> = () => {
  const navigate = useNavigate();
  const { uid } = useEffectorUnit($userStore);

  const qc = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LaunchSpaceProps>({ defaultValues: { name: '' } });

  const { mutate: createSpace, isPending: isSpaceCreating } = useCreateSpace({
    uid,
    onSuccess: ({ createdSpaceCode }) => {
      if (!!createdSpaceCode) {
        qc.invalidateQueries({ queryKey: [USER_QUERY, uid] });
        navigate('/notes');
      }
    },
  });

  return (
    <CreateSpaceForm
      data-create-space-form
      onSubmit={handleSubmit((spaceData: LaunchSpaceProps) => {
        createSpace(spaceData);
      })}
    >
      <Corners borderRadius={BDRS[24]} />

      <div className='create-space-form-title'>
        <Typography as='span' type='RoundedHeavy36'>
          {'Create Launch'}
        </Typography>

        <Typography as='span' type='RoundedHeavy36' className='text-highlighted'>
          Space
        </Typography>
      </div>

      <div className='create-space-form-field-list'>
        <div className='create-space-form-field'>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Set space name',
              minLength: { value: 8, message: 'Space name must be at least 8 characters' },
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
                limitSymbols={48}
              />
            )}
          />
        </div>
      </div>

      <div className='create-space-form-field-controls'>
        <ButtonAction
          loading={isSpaceCreating}
          disabled={isSpaceCreating || !keys(dirtyFields).length || !!keys(errors).length}
          type='submit'
          title='Create LaunchSpace'
          LeftIcon={() => <CreateSpaceIcon />}
        />

        <ButtonGhost
          //
          disabled={isSpaceCreating}
          type='button'
          title='Cancel'
          onClick={() => navigate('/notes')}
        />
      </div>
    </CreateSpaceForm>
  );
};

export { CreateSpace };
