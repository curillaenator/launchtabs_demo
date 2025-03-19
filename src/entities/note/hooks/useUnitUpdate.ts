import { useMutation } from '@tanstack/react-query';
import { useUnit as useEffectorUnit } from 'effector-react';

import { $userStore } from '../../user';
import { updateUnitMutation } from '../api';
import type { SetupNoteFormData } from '../interfaces';

interface UseUnitUpdateProps {
  unitCode: string;
  onSuccess?: () => void;
}

const useUnitUpdate = ({ unitCode, onSuccess }: UseUnitUpdateProps) => {
  const { uid } = useEffectorUnit($userStore);

  return useMutation({
    mutationFn: async (setupFormData: SetupNoteFormData) =>
      updateUnitMutation(uid!, unitCode, {
        unitName: setupFormData.name,
        locked: setupFormData.locked,
      }),

    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export { useUnitUpdate };
