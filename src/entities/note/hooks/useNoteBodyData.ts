import { useQuery } from '@tanstack/react-query';
import LZString from 'lz-string';
import { getNoteBodyQuery, getNoteUnitQuery } from '../api';

import { UNIT_NOTE_BODY_QUERY, UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';

interface UseNoteDataProps {
  // uid: string | null;
  routerNoteId: string | null;
}

const useNoteBodyData = ({ routerNoteId }: UseNoteDataProps) =>
  useQuery({
    queryKey: [UNIT_NOTE_BODY_QUERY, routerNoteId],
    queryFn: () => getNoteBodyQuery(routerNoteId!),
    enabled: !!routerNoteId,
    // staleTime: 0,
    select: (data) => (data ? LZString.decompressFromBase64(data) : null),
  });

const useNoteUnitData = ({ routerNoteId }: UseNoteDataProps) =>
  useQuery({
    queryKey: [UNIT_NOTE_UNIT_QUERY, routerNoteId],
    queryFn: () => getNoteUnitQuery(routerNoteId!),
    enabled: !!routerNoteId,
  });

export { useNoteBodyData, useNoteUnitData };
