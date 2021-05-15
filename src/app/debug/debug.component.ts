import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../State/state.selector'

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: [ './debug.component.css']
})
export class DebugComponent implements OnInit {

  output: string = "";

  // State observers
  inputList$: Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);

  constructor(private store: Store) {
    // Register subscriber
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      this.output = "";
      list.forEach( str => {
        this.output += str + "\n";
      })
    });
  }

  ngOnInit(): void {
  }

}
