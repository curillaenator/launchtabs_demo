import React, { FC, useCallback, memo, useState, useEffect, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { NotesDashboard } from '@src/features/notesDashboard';
import { CreateSpace } from '@src/features/space';
import { Note, CreateNote } from '@src/features/note';

const NotesContainer = styled.div<{ height: CSSProperties['height'] }>`
  width: 100%;
  height: ${({ height }) => `${height}px` || 'fit-content'};
`;

type CreateParamType = 'space' | 'note';

const CREATE_COMPONENTS_ASSOC: Record<CreateParamType, FC<{ maxHeight: number }>> = {
  space: CreateSpace,
  note: CreateNote,
};

const Notes: FC = memo(() => {
  const { noteId: routerNoteId, createPageType } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

  const [pageOutletHeight, setPageOutletHeight] = useState<number>(0);

  const onWindowResize = useCallback(() => {
    let layoutPd = 24;

    // if (window.innerWidth <= 2560) layoutPd = 48;
    // if (window.innerWidth <= 1920) layoutPd = 32;

    setPageOutletHeight(window.innerHeight - 3 * layoutPd - 48);
  }, []);

  useEffect(() => {
    onWindowResize();

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  if (!!createPageType) {
    const CreateMappedComponent = CREATE_COMPONENTS_ASSOC[createPageType];

    return (
      <NotesContainer data-notes-container height={pageOutletHeight}>
        <CreateMappedComponent maxHeight={pageOutletHeight} />
      </NotesContainer>
    );
  }

  if (!routerNoteId)
    return (
      <NotesContainer data-notes-container height={pageOutletHeight}>
        <NotesDashboard maxHeight={pageOutletHeight} />
      </NotesContainer>
    );

  return (
    <NotesContainer data-notes-container height={pageOutletHeight}>
      <Note maxHeight={pageOutletHeight} />
    </NotesContainer>
  );
});

export { Notes };
