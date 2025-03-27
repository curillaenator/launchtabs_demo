import styled from 'styled-components';

import { BDRS } from '@launch-ui/shape';

const CreateSpaceForm = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  width: 100%;

  border-radius: calc(${BDRS[24]}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: var(--layout-pd);

  .create-space-form-field-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 100%;
    padding: var(--layout-pd) 0;
  }

  .create-space-form-field-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .text-highlighted {
    color: ${({ theme }) => theme.primary[500]};
  }
`;

export { CreateSpaceForm };
