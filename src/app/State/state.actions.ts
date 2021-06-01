import { createAction, props } from '@ngrx/store';

export const resetState    = createAction('[App State] Reset state');
export const addString     = createAction('[App State] Add string to be parsed', props<{ newInput: string }>());
export const previewUpdate = createAction('[App State] Preview results', props<{ newInput: string }>());
export const historyUndo   = createAction('[History] Undo');
export const historyRedo   = createAction('[History] Redo');