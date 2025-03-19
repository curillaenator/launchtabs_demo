import { useCallback } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { $userStore } from '@src/entities/user';

import { LaunchUnitProps } from '@src/entities/note';

const useICan = () => {
  const { uid, admin: iAmAdmin = false } = useEffectorUnit($userStore);

  const iCanEditUnit = useCallback(
    (unit?: LaunchUnitProps | null) => unit?.createdBy === uid || iAmAdmin,
    [uid, iAmAdmin],
  );

  return {
    edit: iCanEditUnit,
  };
};

export { useICan };
