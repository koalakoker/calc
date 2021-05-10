import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reset, addCommand } from './counter.actions';
import { AppState } from './State/appState';
import { selectOutput } from './counter.selector';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html'
})
export class MyCounterComponent {
  state$: Observable<String>;

  constructor(private store: Store<AppState>) {
    this.state$ = store.select(selectOutput);
  }

  reset() {
    this.store.dispatch(reset());
  }

  addCommand() {
    this.store.dispatch(addCommand());
  }

}