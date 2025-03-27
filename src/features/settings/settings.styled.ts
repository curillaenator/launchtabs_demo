import styled from 'styled-components';
import { BDRS } from '@launch-ui/shape';

const SettingsStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;

  .form {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: transparent;

    --form-bdrs: calc(${BDRS[24]}px * 1.25 + 3px);

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    /* padding: var(--layout-pd) 0; */
    border-radius: var(--form-bdrs) 0 0 var(--form-bdrs);
    background-color: ${({ theme }) => theme.backgrounds.base};

    &-title {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: var(--layout-pd);
      flex: 0 0 auto;
      border-bottom: 1px solid ${({ theme }) => theme.borders.base};
    }

    &-body {
      flex: 1 1 auto;
      width: 100%;
      padding: 0 var(--layout-pd);
      padding-right: calc(var(--layout-pd) - 8px);
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      flex: 0 0 auto;
      padding: var(--layout-pd);
      border-top: 1px solid ${({ theme }) => theme.borders.base};
    }
  }
`;

export { SettingsStyled };
