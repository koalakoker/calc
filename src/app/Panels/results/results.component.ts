import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../../State/state.selector';
import { parse } from '../../Parser/parser';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../panels.component.css']
})
export class ResultsComponent {
  // State observers
  inputList$: Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);
  output: string = "";

  constructor(private store: Store) {
    // Register subscriber
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      this.update(list);
    });
  }

  update(inputList: ReadonlyArray<string>) {
    this.output = parse(inputList).results;
  }

}