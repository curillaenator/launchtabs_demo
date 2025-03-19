import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 100%;
  background-color: transparent;
  width: 420px;

  .form {
    width: 100%;
    padding: var(--layout-pd);
    z-index: 20;

    &-title {
      margin-bottom: 24px;

      &-main {
        color: ${({ theme }) => theme.primary[500]};
        margin-bottom: 24px;
      }

      &-add {
        margin-top: 8px;
        color: ${({ theme }) => theme.texts.base};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-bottom: 24px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }
  }
`;
