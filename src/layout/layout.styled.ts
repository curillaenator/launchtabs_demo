import styled from 'styled-components';

const LayoutStyled = styled.div<{ $isAsideOpen: boolean }>`
  --layout-aside-w: ${({ $isAsideOpen }) => ($isAsideOpen ? '384px' : '0px')};

  position: relative;

  display: flex;
  width: 100%;
  min-width: 1440px;

  font-family: var(--layout-ff);
  color: ${({ theme }) => theme.texts.base};

  .aside {
    position: sticky;
    top: 0;
    flex: 0 0 auto;
    width: var(--layout-aside-w);
    min-height: 100vh;
    max-height: 100vh;

    will-change: width;
    transition: width 180ms ease;
  }

  .viewport {
    flex: 1 1 auto;
    width: calc(100% - var(--layout-aside-w));

    will-change: width;

    min-height: 100vh;
    max-height: 100vh;

    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
      /* width: 4px; */
      /* margin-left: 0.25rem; */
      /* border-radius: 2px;
      background-color: ${({ theme }) => theme.backgrounds.base}; */

      /* &-thumb {
        background-color: ${({ theme }) => theme.primary[500]};
        border-radius: 2px;
      } */
    }
  }
`;

const MainStyled = styled.main`
  width: 100%;
  padding: 0 var(--layout-pd);
`;

export { LayoutStyled, MainStyled };
