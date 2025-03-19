import { useMutation } from '@tanstack/react-query';
import { createSpaceQuery } from '../api';
import type { LaunchSpaceProps } from '../interfaces';

interface UseCreateSpaceProps {
  uid: string | null;
  onSuccess?: (data: { createdSpaceCode: string }) => void;
}

const useCreateSpace = ({ uid, onSuccess }: UseCreateSpaceProps) =>
  useMutation({
    mutationFn: async (spaceFormData: LaunchSpaceProps) => {
      if (!uid) return { createdSpaceCode: '', updatedSpaces: [] };
      return createSpaceQuery(uid, spaceFormData);
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

export { useCreateSpace };
