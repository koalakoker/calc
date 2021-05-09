import { Component, OnInit, Testability } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import * as parser from '../parser/rules';

@Component({
  selector: 'single-box',
  templateUrl: './single-box.component.html',
  styleUrls: ['./single-box.component.css']
})
export class SingleBoxComponent {
  @ViewChild('inputBox') inputBox: ElementRef;
  input: string = "";
  output: string = "";
  toBeParsed: string = "";

  constructor() {
    setTimeout(() => {
      this.inputBox.nativeElement.focus();
    }, 100);
  }

  onChange(key) {
    if (key.code === "Enter") {
      this.output += this.input + "\n";
      if (this.toBeParsed !== "") {
        this.toBeParsed += "\n";
      }
      this.toBeParsed += this.input;
      this.input = "";
      let parsed = parser.parse(this.toBeParsed);
      this.output += "  ans = " + parsed.vars["ans"].value + "\n\n";
    }
    if (key.code === "ArrowUp") {
      console.log("ArrowUp");
    }
    if (key.code === "ArrowDown") {
      console.log("ArrowDown");
    }
  }
}
