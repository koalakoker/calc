import { Component } from '@angular/core';
import { parse } from '../../Parser/parser';
@Component({
  selector: 'panel-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['../panels.component.css']
})
export class TestingComponent {
  output: string = "";

  update(inputList: ReadonlyArray<string>) {
    //this.output = parse(inputList).functions;
    this.output = "To be defined";
  }
}