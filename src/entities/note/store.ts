import { createStore, createEvent } from 'effector';

interface NoteStore {
  lastInputTimestamp: number;
  saveNoteHandler: (() => void) | null;
  isNoteSaving: boolean;
}

const noteStoreInit = {
  lastInputTimestamp: Date.now(),
  saveNoteHandler: null,
  isNoteSaving: false,
};

const setNoteLastInputTimestamp = createEvent<number>();
const setSaveNoteHandler = createEvent<NoteStore['saveNoteHandler']>();
const setIsNoteSaving = createEvent<boolean>();

const $noteStore = createStore<NoteStore>(noteStoreInit);

$noteStore
  .on(setNoteLastInputTimestamp, (prev, lastInputTimestamp) => ({ ...prev, lastInputTimestamp }))
  .on(setSaveNoteHandler, (prev, saveNoteHandler) => ({ ...prev, saveNoteHandler }))
  .on(setIsNoteSaving, (prev, isNoteSaving) => ({ ...prev, isNoteSaving }));

export { $noteStore, setNoteLastInputTimestamp, setSaveNoteHandler, setIsNoteSaving };
