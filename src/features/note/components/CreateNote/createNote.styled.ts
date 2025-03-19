import styled from 'styled-components';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

const CreateNoteForm = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  width: 100%;
  max-height: 100%;

  border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding-top: var(--layout-pd);

  .create-note-form-field-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 100%;
    padding: 32px 0;
  }

  .create-note-form-field-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: var(--layout-pd);
    border-top: 1px solid ${({ theme }) => theme.borders.base};
  }

  .create-note-form-errors {
    padding: 0 32px;
    height: 40px;

    flex: 1 1 auto;
    width: 100%;

    color: ${({ theme }) => theme.texts.error};
    line-height: 40px;

    & > span {
      line-height: 40px !important;
    }
  }

  .text-highlighted {
    color: ${({ theme }) => theme.primary[500]};
  }
`;

export { CreateNoteForm };
