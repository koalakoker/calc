import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'panel-output',
  templateUrl: './output.component.html',
  styleUrls: [
    '../panels.component.css'
  ]
})
export class OutputComponent {
  @Output() updateEvent = new EventEmitter<ReadonlyArray<string>>();
  @Input() output: string = "";
  @ViewChild('textarea') textArea: ElementRef;

  updateTextArea() {
    if (this.textArea) {
      setTimeout(() => {
        this.textArea.nativeElement.scrollTop = this.textArea.nativeElement.scrollHeight;
      }, 100);
    }
  }
}