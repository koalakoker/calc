import { Component } from '@angular/core';
import { parse } from '../../Parser/parser';
@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['../panels.component.css']
})
export class VariablesComponent {

  output: string = "";
  
  update(inputList: ReadonlyArray<string>) {
    this.output = parse(inputList).vars;
  }

}
