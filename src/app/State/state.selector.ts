import { createSelector } from "@ngrx/store";
import { AppState } from "./appState";

export const selectInputList = createSelector(
  (state: AppState) => state["state"].inputList,
  (inputList: ReadonlyArray<string>) => inputList
)