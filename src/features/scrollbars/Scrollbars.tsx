import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ScrollbarsProps extends PropsWithChildren {
  height: string;
  hasFades?: boolean;
}

const FadesStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .fade-top,
  .fade-bottom {
    position: absolute;
    width: calc(100% - 4px);
    height: 56px;
    left: 0;
    z-index: 200;
  }

  .fade-top {
    top: 0;
    background-image: ${({ theme }) => `linear-gradient(to bottom, ${theme.backgrounds.base}, transparent)`};
  }

  .fade-bottom {
    bottom: 0;
    background-image: ${({ theme }) => `linear-gradient(to top, ${theme.backgrounds.base}, transparent)`};
  }
`;

const ScrollbarsStyled = styled.div<ScrollbarsProps>`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: ${({ height }) => height};
  padding-right: 8px;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
    margin-left: 4px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.backgrounds.base};

    &-thumb {
      background-color: ${({ theme }) => theme.primary[500]};
      border-radius: 2px;
    }

    &-track {
      margin: 4px 0;
    }
  }
`;

export const Scrollbars: FC<ScrollbarsProps> = ({ height, hasFades = false, children }) => {
  if (hasFades) {
    return (
      <FadesStyled>
        <div className='fade-top' />

        <ScrollbarsStyled height={height}>{children}</ScrollbarsStyled>

        <div className='fade-bottom' />
      </FadesStyled>
    );
  }

  return <ScrollbarsStyled height={height}>{children}</ScrollbarsStyled>;
};
