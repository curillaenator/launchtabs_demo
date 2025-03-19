import styled from 'styled-components';

const SetupNoteStyled = styled.form`
  width: 768px;
  padding: var(--layout-pd);

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    margin-top: 24px;
  }

  .form-danger-zone {
    margin-top: 24px;
  }

  .form-control {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export { SetupNoteStyled };
