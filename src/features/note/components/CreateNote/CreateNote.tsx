import React, { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { debounce, keys, toPairs } from 'lodash';

import { Corners } from '@launch-ui/shape';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { RichTextField, type RichtextChangeEvent, type RichTextJsonContent } from '@launch-ui/richtext';
import { Typography } from '@launch-ui/typography';

import { setHeaderMidComponent } from '@src/entities/header';
import { type LaunchUnitProps, useNoteCreate } from '@src/entities/note';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import { CreateNoteHeader } from './CreateNoteHeader';
import { CreateNoteForm } from './createNote.styled';

import CreateNoteIcon from '@src/assets/svg/addDocument.svg';

type NoteFormFields = LaunchUnitProps & { noteBody: RichTextJsonContent | string };

const CreateNote: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const navigate = useNavigate();

  const { mutate: submitNewNoteData, isPending: isNoteSubmitting } = useNoteCreate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<NoteFormFields>({ defaultValues: { name: '', noteBody: '' } });

  useEffect(() => {
    setHeaderMidComponent(() => <CreateNoteHeader register={register} isSubmitting={isNoteSubmitting} />);

    return () => {
      setHeaderMidComponent(null);
    };
  }, [register, isNoteSubmitting]);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const setFormValueDebounced = useCallback(
    debounce((richTextEvent: RichtextChangeEvent) => {
      setValue('noteBody', richTextEvent.value, { shouldDirty: true, shouldTouch: true });
    }, 200),
    [setValue],
  );

  const onRichTextChange = useCallback(
    (richTextEvent: RichtextChangeEvent) => {
      setFormValueDebounced(richTextEvent);
    },
    [setFormValueDebounced],
  );

  return (
    <CreateNoteForm
      data-create-note-form
      onSubmit={handleSubmit((formData: NoteFormFields) => submitNewNoteData({ formData }))}
    >
      <Corners borderRadius={LAUNCH_PAPER_BDRS} />

      <RichTextField maxHeight={maxHeight - 48 - 40} initialValue={''} onChange={onRichTextChange} />

      <div className='create-note-form-field-controls'>
        <ButtonAction
          loading={isNoteSubmitting}
          disabled={isNoteSubmitting || !keys(dirtyFields).length || !!keys(errors).length}
          type='submit'
          title='Create note'
          LeftIcon={() => <CreateNoteIcon />}
        />

        <ButtonGhost type='button' title='Cancel' onClick={() => navigate('/notes')} />

        {!!keys(errors).length && (
          <span className='create-note-form-errors'>
            {toPairs(errors).map(([fieldName, { message }]) => (
              <Typography type='RoundedMedium16' key={`${fieldName}-${message}`}>
                {(message as string) || ''}
              </Typography>
            ))}
          </span>
        )}
      </div>
    </CreateNoteForm>
  );
};

export { CreateNote };
