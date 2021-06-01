import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../../State/state.selector';
@Component({
  selector: 'panel-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['../panels.component.css']
})
export class FunctionsComponent {
  functions$: Observable<any> = this.store.select(Selector.selectFunctions);
  output: string = "";

  constructor(private store: Store) {
    // Subscibe to store
    this.functions$.subscribe((updatedFunctions: any) => {
      this.update(updatedFunctions);
    });
  }

  update(updatedFunctions: any) {
    
    let functions: string = "";
    
    for (const [key] of Object.entries(updatedFunctions)) {
      let value = updatedFunctions[key];
      functions += key + "(" + value.arg + ')=' + value.expr + "\n";
    };
    
    this.output = functions;
  }
}
