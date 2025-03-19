import { createContext, MutableRefObject } from 'react';

import { LaunchSpaceProps } from '@src/entities/space';

interface LauyotContext {
  currentSpaceRef: MutableRefObject<LaunchSpaceProps | null>;
  setCurrentSpaceRef: (currentSpace: LaunchSpaceProps) => void;
}

//@ts-expect-error
const $layoutContex = createContext<LauyotContext>({});

export { $layoutContex, type LauyotContext };
