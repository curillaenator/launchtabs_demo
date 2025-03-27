import React, { FC, useEffect, useRef, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams, useNavigate } from 'react-router-dom';
import { keys } from 'lodash';

import { Modal } from '@launch-ui/modal';
import { Corners, BDRS } from '@launch-ui/shape';
import { Loader } from '@launch-ui/loader';
import { Typography } from '@launch-ui/typography';
import { ButtonAction, ButtonGhost } from '@launch-ui/button';

import { $noteStore, useNoteUnitData, type NotesRouteParams } from '@src/entities/note';

import { useICan } from '@src/hooks/useICan';
import { MODAL_PORTAL_ID } from '@src/shared/appContainers';
import { MAX_UNITS_PER_UNIT, MAX_UNITS_DEPTH } from '@src/shared/appConfig';

import { SetupNote } from '../SetupNote';
import { NoteHeaderBlockStyled, NoteHeaderStyled, SaveNotification } from './noteHeader.styled';

import SwitchesIcon from '@src/assets/svg/switches.svg';
import AddDocumentIcon from '@src/assets/svg/addDocument.svg';

export const NoteHeader: FC = () => {
  const { noteId: routerNoteId = null } = useParams<NotesRouteParams>();
  const navigate = useNavigate();

  const { data: noteUnit, isLoading: isNoteUnitLoading } = useNoteUnitData({ routerNoteId });

  const iCan = useICan();
  const iCanInsert =
    keys(noteUnit?.hierarchy).length < MAX_UNITS_PER_UNIT && (noteUnit?.path.length || 0) < MAX_UNITS_DEPTH;

  const [iCanEdit, setICanEdit] = useState<boolean>(false);

  useEffect(() => {
    setICanEdit(iCan.edit(noteUnit));
  }, [noteUnit, iCan]);

  const [editOpen, setEditOpen] = useState<boolean>(false);

  const { isNoteSaving, lastInputTimestamp, saveNoteHandler } = useEffectorUnit($noteStore);
  const [secondsUntilSave, setSecondsUntilSave] = useState<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSecondsUntilSave(null);
    },
    [routerNoteId],
  );

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (Date.now() < lastInputTimestamp) {
      setSecondsUntilSave(Math.ceil((lastInputTimestamp - Date.now()) / 1000));

      intervalRef.current = setInterval(() => {
        if (Date.now() < lastInputTimestamp) {
          setSecondsUntilSave(Math.ceil((lastInputTimestamp - Date.now()) / 1000));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setSecondsUntilSave(null);
        }
      }, 1000);
    }
  }, [lastInputTimestamp]);

  return (
    <>
      <NoteHeaderStyled data-note-header>
        <Corners borderRadius={BDRS[20]} />

        <NoteHeaderBlockStyled data-flex-shrinked-block>
          {isNoteUnitLoading ? (
            <Loader iconSize='40px' />
          ) : (
            <span className='note-header-title'>{noteUnit?.name || ''}</span>
          )}
        </NoteHeaderBlockStyled>

        <NoteHeaderBlockStyled>
          {isNoteSaving && (
            <SaveNotification data-note-header-save-notification>
              <div className='save-notification-message'>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  Saving
                </Typography>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  Please wait...
                </Typography>
              </div>

              <Loader iconSize='40px' />
            </SaveNotification>
          )}

          {!isNoteSaving && !!secondsUntilSave && (
            <SaveNotification data-note-header-save-notification>
              <ButtonAction
                title='Save'
                onClick={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setSecondsUntilSave(null);
                  saveNoteHandler?.();
                }}
              />

              <div className='save-notification-message'>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  Autosave in
                </Typography>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  {secondsUntilSave}
                </Typography>
              </div>
            </SaveNotification>
          )}

          {iCanEdit && !isNoteSaving && !secondsUntilSave && (
            <>
              <ButtonGhost
                disabled={!iCanInsert}
                RightIcon={() => <AddDocumentIcon />}
                title='Insert note'
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/notes/create/note?parent=${routerNoteId}`);
                }}
              />
              <ButtonGhost
                RightIcon={() => <SwitchesIcon />}
                title='Note attrs'
                onClick={() => {
                  setEditOpen(true);
                }}
              />
            </>
          )}
        </NoteHeaderBlockStyled>
      </NoteHeaderStyled>

      <Modal portalId={MODAL_PORTAL_ID} open={editOpen} onClose={() => setEditOpen(false)} borderRadius={BDRS[24]}>
        {noteUnit && iCanEdit && <SetupNote closePopup={() => setEditOpen(false)} unit={noteUnit} />}
      </Modal>
    </>
  );
};
