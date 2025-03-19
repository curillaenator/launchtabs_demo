import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LAUNCH_CARD_BDRS } from '@src/shared/appConfig';

const CardStyled = styled(Link)`
  --shp-bgc: transparent;
  --shp-bdc: ${({ theme }) => theme.backgrounds.base};

  position: relative;

  cursor: pointer;

  display: block;
  width: 100%;
  height: 100%;
  border-radius: calc(${LAUNCH_CARD_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};

  text-decoration: none;

  will-change: transform, filter;
  transition:
    transform 200ms ease,
    filter 200ms ease;

  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    width: 100%;
    height: 44px;
    padding: 0 1rem;
    color: ${({ theme }) => theme.texts.base};
    border-radius: 0 0 20px 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:hover {
    transform: scale(1.015);
    filter: drop-shadow(${({ theme }) => theme.shadows.base});

    .card-title {
      color: ${({ theme }) => theme.primary[500]};
    }
  }

  &:active {
    transform: scale(1);

    .card-title {
      color: ${({ theme }) => theme.primary[700]};
    }
  }
`;

export { CardStyled };
