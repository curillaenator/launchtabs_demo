import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';

import { UNIT_NOTE_UNIT_QUERY, USER_SPACES_QUERY } from '@src/shared/queryKeys';

import { $spaceStore } from '../../space';
import { $userStore } from '../../user';

import { deleteNoteMutationQuery } from '../api';

import { LaunchUnitProps } from '../interfaces';

const useUnitDelete = (unitCode: string) => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { spaces: spaceIdList } = useEffectorUnit($userStore);
  const { space: currentSpace = null } = useEffectorUnit($spaceStore);

  const unit = qc.getQueryData([UNIT_NOTE_UNIT_QUERY, unitCode]) as LaunchUnitProps;

  return useMutation({
    mutationFn: async () => deleteNoteMutationQuery({ unit, currentSpace }),

    onSuccess: () => {
      const isRootUnit = !unit.path.length;
      const unitParentId = [...unit.path].pop() || null;

      if (!isRootUnit) {
        qc.invalidateQueries({ queryKey: [UNIT_NOTE_UNIT_QUERY, unitParentId] });
      } else {
        qc.invalidateQueries({ queryKey: [USER_SPACES_QUERY, spaceIdList] });
      }

      navigate('/notes');
    },
  });
};

export { useUnitDelete };
