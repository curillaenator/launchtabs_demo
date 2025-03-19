import { useCallback, useRef } from 'react';
import type { LauyotContext } from './context';

import { LaunchSpaceProps } from '@src/entities/space';

const useContextValue = (): LauyotContext => {
  const currentSpaceRef = useRef<LaunchSpaceProps | null>(null);
  const setCurrentSpaceRef = useCallback((space: LaunchSpaceProps) => {
    currentSpaceRef.current = space;
  }, []);

  return { currentSpaceRef, setCurrentSpaceRef };
};

export { useContextValue };
