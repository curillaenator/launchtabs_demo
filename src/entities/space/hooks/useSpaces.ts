import { useQuery } from '@tanstack/react-query';

import { USER_SPACES_QUERY } from '@src/shared/queryKeys';
import { getUserSpacesQuery } from '../api';

interface UseSpacesOptions {
  enabled?: boolean;
}

const useSpaces = (spaces: string[], options?: UseSpacesOptions) => {
  const { enabled = true } = options || {};

  return useQuery({
    queryKey: [USER_SPACES_QUERY, spaces],
    queryFn: () => getUserSpacesQuery(spaces),
    enabled,
  });
};

export { useSpaces };
