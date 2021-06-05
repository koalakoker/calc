import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../../State/state.selector';

@Component({
  selector: 'panel-results',
  templateUrl: './results.component.html',
  styleUrls: ['../panels.component.css']
})
export class ResultsComponent {
  results$: Observable<any> = this.store.select(Selector.selectResults);
  output: string = "";

  constructor(private store: Store) {
    // Subscibe to store
    this.results$.subscribe((updatedResults: ReadonlyArray<string>) => {
      this.update(updatedResults);
    });
  }

  update(updatedResults: ReadonlyArray<string>) {
   
    let results: string = "";
    
    updatedResults.forEach((element, index) => {
      results += "[" + index + "]: " + element + "\n";
    });

    this.output = results;
  }

}
