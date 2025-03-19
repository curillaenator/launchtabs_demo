import { useMutation } from '@tanstack/react-query';
import { useUnit as useEffectorUnit } from 'effector-react';

import { $userStore } from '../../user';
import { deleteSpaceQuery } from '../api';
import type { LaunchSpaceProps } from '../interfaces';

interface UseDeleteSpaceOptions {
  onSuccess?: (res: { deletedSpaceCode: string; deletedUnitsCodes: string[] }) => void;
}

const useDeleteSpace = (space: LaunchSpaceProps, options?: UseDeleteSpaceOptions) => {
  const { uid, spaces } = useEffectorUnit($userStore);

  return useMutation({
    mutationFn: async () => deleteSpaceQuery(space, { uid, spaces }),

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};

export { useDeleteSpace };
