import { AppState } from '../State/appState'

export interface History {
  past: Array<AppState>
  present: AppState
  future: Array<AppState>
}