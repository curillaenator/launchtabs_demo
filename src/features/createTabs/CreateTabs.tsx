import React, { FC, useCallback, useMemo } from 'react';
import { Corners } from '@launch-ui/shape';
import { Button } from '@launch-ui/button';
import { Dropable } from '@launch-ui/dropable';

import { useCreateForm } from './hooks/useCreateForm';
import { CreateFormCTX } from './context';
import { CreateTabButton } from './created.styled';

import { TabPopup } from './components/TabPopup';
import { LinkPopup } from './components/LinkPopup';

import { useDropable } from '@src/hooks/useDropable';
import { LAUNCH_CARD_BDRS } from '@src/shared/appConfig';

import LinkIcon from '@src/assets/svg/link.svg';
import AddTabIcon from '@src/assets/svg/addTab.svg';

const CreateTabs: FC<{ create: 'new-page' | 'new-bookmark' }> = ({ create }) => {
  const { formContextValue, resetFormState } = useCreateForm(create);

  const { isOpen: isCteareOpen, closeDropdown: closeCreate, ...createRest } = useDropable();

  const onCreateClose = useCallback(() => {
    resetFormState?.();
    closeCreate?.();
  }, [closeCreate, resetFormState]);

  return (
    <CreateFormCTX.Provider value={useMemo(() => formContextValue, [formContextValue])}>
      <Dropable
        {...createRest}
        placement='right-start'
        maxWidth={424}
        maxHeight={1024}
        offset={[0, 8]}
        headless
        openNode={
          create === 'new-page' ? (
            <Button active={isCteareOpen} IconLeft={() => <AddTabIcon />} />
          ) : (
            <CreateTabButton active={!!isCteareOpen}>
              <Corners borderRadius={LAUNCH_CARD_BDRS} stroke={6} />
              <LinkIcon width={32} height={32} viewBox='0 0 24 24' fill='none' />
            </CreateTabButton>
          )
        }
      >
        {create === 'new-page' ? <TabPopup closePopup={onCreateClose} /> : <LinkPopup closePopup={onCreateClose} />}
      </Dropable>
    </CreateFormCTX.Provider>
  );
};

export { CreateTabs };
