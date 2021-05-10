import { createReducer, on } from '@ngrx/store';
import { reset, addCommand } from './counter.actions';
import { AppState } from './State/appState';

export const initialState: AppState = {
  output: "",
  toBeParsed: "",
  inputList: [],
  inputListSelected: -1
};

const _counterReducer = createReducer(
  initialState,
  on(reset, (state) => {
    return initialState
  }),
  on(addCommand, (state: AppState) => {
    let newState: AppState = {
      output : "added",
      toBeParsed: "",
      inputList: [],
      inputListSelected: -1
    };
    return newState;
  })
);

export function counterReducer(state:  AppState, action) {
  return _counterReducer(state, action);
}