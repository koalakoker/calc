import { createReducer, on } from '@ngrx/store';
import * as Action from './state.actions';
import { AppState } from './appState';
import * as _ from '../../../node_modules/lodash';

export const initialState: AppState = {
  inputList: [],
  variables: {},
  functions: {},
  results: []
};

export interface History {
  past: Array<AppState>
  present: AppState
  future: Array<AppState>
}

let history: History = {
  past: [],
  present: initialState,
  future: []
};

function historyAddState(newState: AppState) {
  history = {
    // push previous present into past for undo
    past: [history.present, ...history.past],
    present: newState,
    future: [] // clear future
  }
}

const _counterReducer = createReducer(
  initialState,
  on(Action.resetState, (state) => {
    historyAddState(initialState);
    return initialState
  }),
  on(Action.addStringToParser, (state: AppState, {
    newInput,
    variables,
    functions,
    results
   }) => {
     
    let newState: AppState = _.cloneDeep(state);
    newState.inputList.push(newInput);
    newState.variables = _.cloneDeep(variables);
    newState.functions = _.cloneDeep(functions);
    newState.results   = _.cloneDeep(results);

    historyAddState(newState);
    return newState;
  }),
  on(Action.historyUndo, (state: AppState) => {
    if (history.past.length > 0) {
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
      return previous;
    } else {
      return state;
    }
  }),
  on(Action.historyRedo, (state: AppState) => {
    if (history.future.length > 0) {
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
      return next
    } else {
      return state;
    }
  })
);

export function counterReducer(state:  AppState, action) {
  return _counterReducer(state, action);
}