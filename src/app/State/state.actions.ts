import { createAction, props } from '@ngrx/store';
import { AppState } from './appState';

export const resetState = createAction('[App State] Reset state');
export const addStringToParser = createAction('[App State] Add string to be parsed',
  props<{str: string}>());
export const setState = createAction('[App State] Set state',
  props<AppState>());
export const selectPrevious = createAction('[App State] Select previous string'); 
export const selectNext = createAction('[App State] Select next string');