import { useContext } from 'react';
import { $layoutContex } from '@src/layout/context';

const useLayoutContext = () => useContext($layoutContex);

export { useLayoutContext };
