import { createAction, props } from '@ngrx/store';
import { AppState } from './appState';

export const resetState = createAction('[App State] Reset state');
export const addStringToParser = createAction('[App State] Add string to be parsed', props<{
  newInput: string,
  variables: any,
  functions: any,
  results: any 
}>());

export const historyUndo = createAction('[History] Undo');
export const historyRedo = createAction('[History] Redo');