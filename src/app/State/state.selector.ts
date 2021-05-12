import { createSelector } from "@ngrx/store";
import { AppState } from "./appState";

export const selectOutput = createSelector(
  (state: AppState) => state["state"].output,
  (output: string ) => output
);

export const selectToBeParsed = createSelector(
  (state: AppState) => state["state"].toBeParsed,
  (toBeParsed: string) => toBeParsed
);

export const selectInputList = createSelector(
  (state: AppState) => state["state"].inputList,
  (inputList: ReadonlyArray<string>) => inputList
)

export const selectInputListSelected = createSelector(
  (state: AppState) => state["state"].inputListSelected,
  (inputLisySelected: number) => inputLisySelected
)