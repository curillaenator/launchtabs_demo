import { createContext } from 'react';

import type { FormStateType, FormActionType } from './interfaces';

interface CreateFormContext {
  formState: FormStateType;
  dispatchForm?: React.Dispatch<FormActionType>;
  handleCreate?: () => void;
}

export const CreateFormCTX = createContext<CreateFormContext>({
  formState: { name: '', link: '', iconURL: '' },
});
