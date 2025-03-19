import styled, { css } from 'styled-components';

import { LAUNCH_CARD_BDRS } from '@src/shared/appConfig';

const CreateTabButton = styled.div<{ active: boolean }>`
  --shp-bdc: ${({ theme }) => theme.backgrounds.base};

  color: ${({ theme }) => theme.backgrounds.base};
  border-radius: calc(${LAUNCH_CARD_BDRS}px * 1.25 + 3px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  min-width: 56px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgrounds.base20};
  min-height: 186px;
  cursor: pointer;

  ${css({ 'svg[data-svg-corner]': { '--shp-bgc': 'transparent' } })}

  ${({ theme, active }) =>
    active
      ? css({
          'background-color': theme.backgrounds.base40,
          '--shp-bdc': theme.primary[700],
          color: theme.primary[700],
        })
      : css({
          '&:hover': {
            '--shp-bdc': theme.primary[300],
            color: theme.primary[300],
            'background-color': theme.backgrounds.base40,
          },
          '&:active': {
            '--shp-bdc': theme.primary[700],
            color: theme.primary[700],
          },
        })}
`;

export { CreateTabButton };
