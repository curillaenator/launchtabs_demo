import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LookFeelStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--layout-pd);
  width: 100%;

  padding: var(--layout-pd) 0;
  min-height: 320px;
  animation: ${fadeIn} 200ms ease;

  .search-pexels-wallpaper-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dd-open-node {
    justify-content: flex-start;
  }
`;

export { LookFeelStyled };
