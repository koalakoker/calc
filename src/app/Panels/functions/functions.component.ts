import { Component } from '@angular/core';
import { ParserService } from '../../Parser/parser.service';
@Component({
  selector: 'panel-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['../panels.component.css']
})
export class FunctionsComponent {
  output: string = "";

  constructor(private parser: ParserService) {
    // Subscibe to ParserService
    parser.subscribe((list) => {
      this.update(list);
    });
  }

  update(inputList: ReadonlyArray<string>) {
    this.output = this.parser.functions;
  }
}
