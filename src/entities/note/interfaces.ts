type NotesCreateParamType = 'space' | 'note';

interface LaunchUnitProps {
  code: string;
  name: string;

  path: string[];

  locked?: boolean;

  createdAt: number;
  createdBy: string;

  updatedAt?: number;
  updatedBy?: string;

  hierarchy?: Record<string, number>;
}

interface NotesRouteParams extends Record<string, string | undefined> {
  noteId?: string;
  createPageType?: NotesCreateParamType;
}

interface SetupNoteFormData {
  name: string;
  locked: boolean;
}

export type { NotesCreateParamType, NotesRouteParams, LaunchUnitProps, SetupNoteFormData };
