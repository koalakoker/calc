import { Component } from '@angular/core';
import { ParserService } from '../../Parser/parser.service';

@Component({
  selector: 'panel-results',
  templateUrl: './results.component.html',
  styleUrls: ['../panels.component.css']
})
export class ResultsComponent {

  output: string = "";

  constructor(private parser: ParserService) {
    // Subscibe to ParserService
    parser.subscribe((list) => {
      this.update(list);
    });
  }

  update(inputList: ReadonlyArray<string>) {
    this.output = this.parser.results;
  }

}
