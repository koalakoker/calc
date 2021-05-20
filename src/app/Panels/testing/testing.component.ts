import { Component } from '@angular/core';
import { parse } from '../../Parser/parser';
@Component({
  selector: 'panel-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['../panels.component.css']
})
export class TestingComponent {
  output: string = "";
  input : string ="";

  update(inputList: ReadonlyArray<string>) {
  }

  onKeyDown(key: KeyboardEvent) {
    if ((key.code === "Enter") && (key.ctrlKey === true)) {
      let inputList = this.input.split("\n");
      console.log(inputList);
      let parsed = parse(inputList);
      this.output = parsed.output;
    }
  }
}