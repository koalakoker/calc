import { createSelector } from "@ngrx/store";
import { AppState } from "./appState";

export const selectInputList = createSelector(
  (state: AppState) => state["state"].inputList,
  (inputList: ReadonlyArray<string>) => inputList
)

export const selectResults = createSelector(
  (state: AppState) => state["state"].results,
  (results: ReadonlyArray<any>) => results
)

export const selectVariables = createSelector(
  (state: AppState) => state["state"].variables,
  (variables: any) => variables
)

export const selectFunctions = createSelector(
  (state: AppState) => state["state"].functions,
  (functions: any) => functions
)

export const selectOutput = createSelector(
  (state: AppState) => state["state"].output,
  (output: string) => output
)

export const selectPreview = createSelector(
  (state: AppState) => state["state"].preview,
  (preview: string) => preview
)