import { createReducer, on } from '@ngrx/store';
import * as Action from './state.actions';
import { AppState } from './appState';
import * as _ from '../../../node_modules/lodash';
import * as parser from '../Parser/rules';

export const initialState: AppState = {
  inputList: [],
  variables: {},
  functions: {},
  results: [],
  output: "",
  preview: undefined
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
  newState.preview = undefined;
  history = {
    // push previous present into past for undo
    past: [history.present, ...history.past],
    present: newState,
    future: [] // clear future
  }
}

const _stateReducer = createReducer(
  initialState,
  on(Action.resetState, (state) => {
    historyAddState(initialState);
    return initialState
  }),
  on(Action.addString, (state: AppState, { newInput }) => {
    let newState: AppState = _.cloneDeep(state);
    newState.inputList.push(newInput);
    let result = parsing(newState, newInput);
    newState.results   = parser.results();
    newState.variables = parser.vars();
    newState.functions = parser.functions();
    newState.output    += newInput + "\n";
    newState.output    += "ans=" + result + "\n\n";
    parser.appendResults(result);
    historyAddState(newState);
    return newState;
  }),
  on(Action.previewUpdate, (state: AppState, { newInput }) => {
    let newState: AppState = _.cloneDeep(state);
    let result = parsing(newState, newInput);
    if (result === "SyntaxError")
    {
      newState.preview = undefined;
    } else {
      newState.preview = "ans=" + result;
    }
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

export function stateReducer(state:  AppState, action) {
  return _stateReducer(state, action);
}

function parsing(newState, newInput) {
  // Restore the parser state from store
  parser.setVars(newState.variables);
  parser.setFunctions(newState.functions);
  parser.setResults(newState.results);

  let output;

  try {  
    output = parser.parse(newInput);    
  } catch (error) {
    // console.log("**** Syntax Error parsing ****");
    // console.log(newInput);
    // console.log("---- Returned value ----");
    // console.log(error);
    output = error.name;
  }

  return output;
}