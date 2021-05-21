import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../../State/state.selector';
import { ElementRef, ViewChild } from '@angular/core';

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
  @Output() updateEvent = new EventEmitter<ReadonlyArray<string>>();
  @Input() output: string = "";
  @ViewChild('textarea') textArea: ElementRef;

  constructor(private store: Store) {
    // Register subscriber
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      this.updateEvent.emit(list);
    });
  }

  updateTextArea() {
    if (this.textArea) {
      setTimeout(() => {
        this.textArea.nativeElement.scrollTop = this.textArea.nativeElement.scrollHeight;
      }, 100);
    }
  }
}