import styled from 'styled-components';

const AsideNotesElementStyled = styled.div`
  width: 100%;
  min-height: 40px;
  padding: 16px var(--layout-pd) 8px;

  .space-elements {
    display: flex;
    gap: 8px;
    width: 100%;
    margin-bottom: 16px;
  }

  .create-space-button {
    justify-content: flex-start;
  }

  .open-spaces-button {
    justify-content: flex-start;
    max-width: calc(100% - 112px);
  }

  .unit-list {
    width: 100%;
    padding-left: 12px;

    &_empty {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 40px;
      color: ${({ theme }) => theme.texts.placeholder};

      & > span {
        line-height: 40px;
      }
    }
  }

  .selector-loader-dummy {
    --shp-bgc: ${({ theme }) => theme.backgrounds.light};
    --shp-bdc: transparent;

    // for corners
    position: relative;

    display: flex;
    align-items: center;

    width: 100%;
    height: 40px;
    border-radius: calc(12px * 1.25 + 3px);
    padding-left: 12px;

    background-color: ${({ theme }) => theme.backgrounds.light};
  }

  .unit-loader-dummy {
    padding: 4px 8px;
    height: 40px;
    margin-top: 8px;
    width: 100%;
  }
`;

export { AsideNotesElementStyled };
