import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../../State/state.selector';

@Component({
  selector: 'panel-output',
  templateUrl: './output.component.html',
  styleUrls: [
    '../panels.component.css'
  ]
})
export class OutputComponent {
  // State observers
  inputList$: Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);
  inputList: ReadonlyArray<string>;
  @Output() updateEvent = new EventEmitter<ReadonlyArray<string>>();
  @Input() output: string = "";

  constructor(private store: Store) {
    // Register subscriber
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      this.inputList = list;
      this.updateEvent.emit(list);
    });
  }
}