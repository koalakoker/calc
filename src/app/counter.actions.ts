import { createAction } from '@ngrx/store';

export const reset = createAction('[App State] Reset');
export const addCommand = createAction('[App State] Add commnad to be parsed');
