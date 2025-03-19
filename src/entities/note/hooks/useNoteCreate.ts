import { useMutation } from '@tanstack/react-query';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import type { RichTextJsonContent } from '@launch-ui/richtext';

import LZString from 'lz-string';
import { keys } from 'lodash';

import { $spaceStore } from '../../space';
import { $userStore } from '../../user';
import { createNoteMutationQuery } from '../api';

import { USER_SPACES_QUERY, UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';
import type { LaunchUnitProps } from '../interfaces';

interface CreateNoteMutationPayload {
  formData: Partial<LaunchUnitProps> & { noteBody: RichTextJsonContent | string };
}

const useNoteCreate = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { search } = useLocation();
  const parentUnitId = new URLSearchParams(search).get('parent');

  const { uid, spaces: spaceIdList } = useEffectorUnit($userStore);
  const { space: currentSpace = null } = useEffectorUnit($spaceStore);

  const parentUnitData = qc.getQueryData<LaunchUnitProps>([UNIT_NOTE_UNIT_QUERY, parentUnitId]);

  return useMutation({
    mutationFn: async (payload: CreateNoteMutationPayload) => {
      if (!uid) return { createdUnitId: null };

      const { formData } = payload;
      const zippedBody = LZString.compressToBase64(JSON.stringify(formData.noteBody));

      return createNoteMutationQuery({
        uid,
        path: !!parentUnitId && !!parentUnitData?.path ? [...parentUnitData.path, parentUnitId] : [],
        parentUnitId,
        parentSpace: parentUnitId ? null : currentSpace,
        createUnitIdx: keys(parentUnitId ? parentUnitData?.hierarchy : currentSpace?.hierarchy).length || 0,
        formData: { ...formData, noteBody: zippedBody },
      });
    },

    onSuccess: async ({ createdUnitId }) => {
      if (!createdUnitId) {
        alert(`bad ID: ${createdUnitId}`);
        return;
      }

      if (parentUnitId) {
        qc.invalidateQueries({ queryKey: [UNIT_NOTE_UNIT_QUERY, parentUnitId] });
      } else {
        qc.invalidateQueries({ queryKey: [USER_SPACES_QUERY, spaceIdList] });
      }

      navigate(`/notes/${createdUnitId}`);
    },
  });
};

export { useNoteCreate };
