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
  inputList: Array<string> = [];
  inputListSelected: number = -1;

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
      this.inputList.push(this.input);
      this.inputListSelected = -1;

      this.input = "";
      let parsed = parser.parse(this.toBeParsed);
      this.output += "  ans = " + parsed.vars["ans"].value + "\n\n";
    }
    if (key.code === "ArrowUp") {
      if (this.inputListSelected === -1) {
        this.inputListSelected = this.inputList.length - 1;
      } else if (this.inputListSelected > 0) {
        this.inputListSelected -= 1;
      }
      this.input = this.inputList[this.inputListSelected];
    }
    if (key.code === "ArrowDown") {
      if (this.inputListSelected !== -1) {
        if (this.inputListSelected < this.inputList.length - 1) {
          this.inputListSelected += 1;
          this.input = this.inputList[this.inputListSelected];
        }
      }
    }
    if ((this.input.length === 1) && (this.toBeParsed !== "")) {
      let char = this.input[0];
      if ((char === '+') || (char === '-') ||
          (char === '*') || (char === '/') ||
          (char === '^') || (char === ':')) {
          this.input = "ans" + char;
      }
    }
  }
}
