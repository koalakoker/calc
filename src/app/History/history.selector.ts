import { createSelector } from "@ngrx/store";
import { AppState } from "../State/appState";

export const selectHistoryState = createSelector(
  (state: AppState) => state,
  (state: AppState) => state["history"]
);