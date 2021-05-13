import { createReducer, on } from '@ngrx/store';
import * as HistoryAction from './history.actions';
import { History } from './history';
import { AppState } from '../State/appState';
import * as _ from '../../../node_modules/lodash';
import { initialState } from '../State/state.reducer';

let history: History = {
  past: [],
  present: initialState,
  future: []
};

const _historyReducer = createReducer(
  initialState,
  on(HistoryAction.historyReset, (state: AppState) => {
    return initialState
  }),
  on(HistoryAction.historyUndo, (state: AppState) => {
    // use first past state as next present ...
    const previous = history.past[0]
    // ... and remove from past
    const newPast = history.past.slice(1)
    history = {
      past: newPast,
      present: previous,
      // push present into future for redo
      future: [history.present, ...history.future]
    }
    console.log(history);
    return previous
  }),
  on(HistoryAction.historyRedo, (state: AppState) => {
    // use first future state as next present ...
    const next = history.future[0]
    // ... and remove from future
    const newFuture = history.future.slice(1)
    history = {
      // push present into past for undo
      past: [history.present, ...history.past],
      present: next,
      future: newFuture
    }
    console.log(history);
    return next
  }),
  on(HistoryAction.historyAdd, (state: AppState, newPresent: AppState) => {
    // derive next state
    history = {
      // push previous present into past for undo
      past: [history.present, ...history.past],
      present: newPresent,
      future: [] // clear future
    }
    console.log(history);
    return newPresent
  })
);

export function historyReducer(state: AppState, action) {
  return _historyReducer(state, action);
}