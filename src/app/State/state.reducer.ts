import { createReducer, on } from '@ngrx/store';
import * as Action from './state.actions';
import { AppState } from './appState';
import * as parser from '../parser/rules';
import * as _ from '../../../node_modules/lodash';

export const initialState: AppState = {
  output: "",
  toBeParsed: "",
  inputList: [],
  inputListSelected: -1
};

const _counterReducer = createReducer(
  initialState,
  on(Action.resetState, (state) => {
    return initialState
  }),
  on(Action.addStringToParser, (state: AppState, { str }) => {
    let newState: AppState = _.cloneDeep(state);
    
    newState.output += str + "\n";
    if (newState.toBeParsed !== "") {
      newState.toBeParsed += "\n";
    }
    newState.toBeParsed += str;
    newState.inputList.push(str);
    newState.inputListSelected = -1;

    let parsed = parser.parse(newState.toBeParsed);
    newState.output += "  ans = " + parsed.vars["ans"].value + "\n\n";
    
    return newState;
  }),
  on(Action.setState, (state: AppState, newState: AppState) => {
    return newState;
  }),
  on(Action.selectPrevious, (state: AppState) => {
    let newState: AppState = _.cloneDeep(state);
    if (newState.inputListSelected === -1) {
      newState.inputListSelected = newState.inputList.length - 1;
    } else if (newState.inputListSelected > 0) {
      newState.inputListSelected -= 1;
    }
    return newState;
  }),
  on(Action.selectNext, (state: AppState) => {
    let newState: AppState = _.cloneDeep(state);
    if (newState.inputListSelected !== -1) {
      if (newState.inputListSelected < newState.inputList.length - 1) {
        newState.inputListSelected += 1;
      }
    }
    return newState;
  }),
);

export function counterReducer(state:  AppState, action) {
  return _counterReducer(state, action);
}