import { createSelector } from "@ngrx/store";
import { AppState } from "./State/appState";

export const selectOutput = createSelector(
  (state: AppState) => state["state"].output,
  (output: string ) => output
);