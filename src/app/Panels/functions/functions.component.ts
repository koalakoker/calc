import { Component } from '@angular/core';
import { parse } from '../../Parser/parser';
@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['../panels.component.css']
})
export class FunctionsComponent {
  output: string = "";

  update(inputList: ReadonlyArray<string>) {
    this.output = parse(inputList).functions;
  }
}
