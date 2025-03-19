import { useMutation } from '@tanstack/react-query';

import { updateSpaceQuery } from '../api';

interface UseUpdateSpaceOptions {
  onSuccess?: (updatedSpaceCode: string) => void;
}

const useUpdateSpace = (spaceCode: string, uid: string, options?: UseUpdateSpaceOptions) => {
  return useMutation({
    mutationFn: async (setupFormData: { name: string }) =>
      updateSpaceQuery(spaceCode, {
        name: setupFormData.name,
        updatedBy: uid,
      }),

    onSuccess: (spaceCode) => options?.onSuccess?.(spaceCode),
  });
};

export { useUpdateSpace };
