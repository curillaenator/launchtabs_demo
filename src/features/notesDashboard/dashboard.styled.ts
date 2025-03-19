import { CSSProperties } from 'react';
import styled from 'styled-components';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

const DashboardContainer = styled.div<{ height: CSSProperties['height'] }>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
  flex: 1 1 auto;
  border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};

  .dashboard-block {
    padding: var(--layout-pd);

    &-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      padding: 0 var(--layout-pd);
    }
  }

  .highlighted {
    color: ${({ theme }) => theme.primary[500]};
  }
`;

export { DashboardContainer as NoteContainer };
