import styled from 'styled-components';

import { LAUNCH_HEADER_BDRS } from '@src/shared/appConfig';

const NoteHeaderStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 4px 12px;
  flex: 0 0 auto;

  width: calc(100% - (var(--layout-pd) + 16px) * 2 - 64px);
  height: 48px;
  border-radius: calc(${LAUNCH_HEADER_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  margin: 0 24px;
`;

const NoteHeaderBlockStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;

  &[data-flex-shrinked-block] {
    width: calc(100% - 238px);
    flex: 0 1 auto;
  }

  .note-header-title {
    font-family: inherit;
    height: 40px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    max-width: 100%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const SaveNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
  height: 100%;

  .save-notification-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
  }
`;

export { NoteHeaderStyled, NoteHeaderBlockStyled, SaveNotification };
