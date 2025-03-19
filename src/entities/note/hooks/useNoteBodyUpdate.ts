import { useMutation } from '@tanstack/react-query';
import LZString from 'lz-string';
import type { RichtextChangeEvent } from '@launch-ui/richtext';
import { updateNoteBodyMutation } from '../api';

interface UseNoteBodyUpdateProps {
  uid: string | null;
  routerNoteId: string | null;
  onSuccess?: () => void;
}

const useNoteBodyUpdate = ({ uid, routerNoteId, onSuccess }: UseNoteBodyUpdateProps) =>
  useMutation({
    mutationFn: async (noteBodyEvent: RichtextChangeEvent) => {
      if (!uid || !routerNoteId) return { routerNoteId: false };
      return updateNoteBodyMutation(uid, routerNoteId, LZString.compressToBase64(JSON.stringify(noteBodyEvent.value)));
    },

    onSuccess: () => {
      onSuccess?.();
    },
  });

export { useNoteBodyUpdate };
