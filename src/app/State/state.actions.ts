import { createAction, props } from '@ngrx/store';
import { AppState } from './appState';

export const resetState = createAction('[App State] Reset state');
export const addStringToParser = createAction('[App State] Add string to be parsed', props<{str: string}>());
export const setState = createAction('[App State] Set state', props<AppState>());

export const historyReset = createAction('[History] Reset');
export const historyUndo = createAction('[History] Undo');
export const historyRedo = createAction('[History] Redo');