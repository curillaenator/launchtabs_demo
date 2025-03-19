import React, { FC } from 'react';

import { Button } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';

import { login } from '@src/entities/user';

import { FormStyled } from './styles';

import GoogleIcon from '@src/assets/svg/google.svg';

export const SignIn: FC<{ closePopup: () => void }> = ({ closePopup }) => {
  return (
    <FormStyled onSubmit={() => login()}>
      <div className='form'>
        <div className='form-title'>
          <Typography as='h2' type='RoundedHeavy36' className='form-title-main'>
            Sign In
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            App won't save your changes unless you signed in
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Entering via Google account lets you save links/tabs, use Notes app, customize app view by theming
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Saved data is available on any device under your account
          </Typography>
        </div>

        <div className='form-buttons'>
          <Button
            type='button'
            title='Close'
            onClick={() => {
              closePopup();
            }}
          />

          <Button
            type='button'
            title='Sign in with Google'
            IconLeft={() => <GoogleIcon />}
            onClick={() => {
              closePopup();
              login();
            }}
          />
        </div>
      </div>
    </FormStyled>
  );
};
