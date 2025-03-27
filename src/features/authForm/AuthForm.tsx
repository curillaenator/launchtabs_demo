import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Input } from '@launch-ui/input';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';

import { login as googleAuth, demoUserLogin, LaunchUserCreds } from '@src/entities/user';

import { FormStyled } from './form.styled';

import { MESSAGES } from './messages';

import EmailIcon from '@src/assets/svg/email.svg';
import KeyIcon from '@src/assets/svg/key.svg';
import AuthIcon from '@src/assets/svg/login.svg';

const PUBLIC_DEMO_USER: LaunchUserCreds = {
  email: 'user@launch.app',
  password: 'user@launch.app',
};

interface AuthFormProps {
  isDemo: boolean;
  onCancelAppDemo: () => void;
  closePopup: () => void;
}

const AuthForm: FC<AuthFormProps> = (props) => {
  const { isDemo, closePopup, onCancelAppDemo } = props;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LaunchUserCreds>({ defaultValues: PUBLIC_DEMO_USER });

  return (
    <FormStyled
      onSubmit={handleSubmit((formData) => {
        if (!isDemo) {
          googleAuth();
          closePopup();
          return;
        }

        demoUserLogin(formData);
        closePopup();
        onCancelAppDemo();
      })}
    >
      <div className='form'>
        <div className='form-title'>
          <Typography as='h2' type='RoundedHeavy36' className='form-title-main'>
            Launch Auth
          </Typography>

          {isDemo ? (
            <>
              <Typography as='p' type='TextRegular14' className='form-title-add'>
                {MESSAGES.demo_auth.ru}
              </Typography>

              <Typography as='p' type='TextRegular14' className='form-title-add'>
                {MESSAGES.demo_auth.en}
              </Typography>
            </>
          ) : (
            <>
              <Typography as='p' type='TextRegular14' className='form-title-add'>
                {MESSAGES.auth_1.en}
              </Typography>

              <Typography as='p' type='TextRegular14' className='form-title-add'>
                {MESSAGES.auth_2.en}
              </Typography>
            </>
          )}
        </div>

        {isDemo && (
          <div className='form-inputs'>
            <Controller
              control={control}
              name='email'
              rules={{ required: 'Set email' }}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled
                  state={errors.email ? 'error' : 'normal'}
                  description={errors.email ? errors.email.message : ''}
                  icon={() => <EmailIcon />}
                  aria-required
                  type='text'
                  placeholder='user@launch.app'
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              rules={{ required: 'Set password' }}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled
                  icon={() => <KeyIcon />}
                  aria-required
                  type='text'
                  placeholder='user@launch.app'
                />
              )}
            />
          </div>
        )}

        <div className='form-buttons'>
          <ButtonGhost
            type='button'
            title='Cancel'
            onClick={() => {
              if (isDemo) onCancelAppDemo();
              reset();
              closePopup();
            }}
          />

          <ButtonAction type='submit' title='Ok' LeftIcon={() => <AuthIcon />} />
        </div>
      </div>
    </FormStyled>
  );
};

export { AuthForm };
