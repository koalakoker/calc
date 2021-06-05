import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../../State/state.selector';
@Component({
  selector: 'panel-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['../panels.component.css']
})
export class VariablesComponent {

  vars$: Observable<any> = this.store.select(Selector.selectVariables);
  output: string = "";

  constructor(private store: Store) {
    // Subscibe to store
    this.vars$.subscribe((updatedVars: any) => {
      this.update(updatedVars);
    });
  }
  
  update(updatedVars: any) {
    let vars: string = "";
    
    for (const [key] of Object.entries(updatedVars)) {
      vars += key + '=' + updatedVars[key].value + "\n";
    };
    this.output = vars;
  }

}
