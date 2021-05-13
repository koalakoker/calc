import { createAction, props } from '@ngrx/store';
import { AppState } from '../State/appState';

export const historyReset = createAction('[History] Reset');
export const historyUndo  = createAction('[History] Undo');
export const historyRedo  = createAction('[History] Redo');
export const historyAdd   = createAction('[History] Add state', props<AppState>());