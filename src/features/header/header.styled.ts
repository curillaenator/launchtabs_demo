import styled from 'styled-components';

interface HeaderStyledProps {
  isHeaderShadowed: boolean;
}

const HeaderStyled = styled.header<HeaderStyledProps>`
  z-index: 900;
  display: flex;
  justify-content: space-between;

  position: sticky;
  top: 0;

  width: calc(100% - var(--layout-pd) * 2 - 32px);
  padding: var(--layout-pd) 0;
  margin: 0 calc(var(--layout-pd) + 16px);

  transition: filter 300ms ease;
  will-change: filter;
  filter: drop-shadow(
    ${({ theme, isHeaderShadowed }) => (isHeaderShadowed ? theme.shadows.primary : '0 0 0 0 transparent')}
  );
`;

export { HeaderStyled };
