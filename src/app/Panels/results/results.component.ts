import { Component } from '@angular/core';
import { parse } from '../../Parser/parser';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['../panels.component.css']
})
export class ResultsComponent {

  output: string = "";

  update(inputList: ReadonlyArray<string>) {
    this.output = parse(inputList).results;
  }

}
