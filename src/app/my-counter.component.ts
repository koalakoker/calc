import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reset, addCommand } from './State/state.actions';
import { AppState } from './State/appState';
import { selectOutput } from './State/state.selector';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html'
})
export class MyCounterComponent {
  state$: Observable<String> = this.store.select(selectOutput);

  constructor(private store: Store) {
  }

  reset() {
    this.store.dispatch(reset());
  }

  addCommand() {
    this.store.dispatch(addCommand());
  }

}