import { Component, OnInit, Testability } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import * as parser from '../parser/rules';
import { LocalStoreService } from '../Services/local-store.service';

@Component({
  selector: 'single-box',
  templateUrl: './single-box.component.html',
  styleUrls: ['./single-box.component.css']
})
export class SingleBoxComponent {
  @ViewChild('inputBox') inputBox: ElementRef;
  input: string = "";
  
  // State
  output: string = "";
  toBeParsed: string = "";
  inputList: Array<string> = [];
  
  inputListSelected: number = -1;

  constructor(private localStoreService: LocalStoreService) {
    setTimeout(() => {
      this.load();
      this.inputBox.nativeElement.focus();
    }, 100);
  }

  addStringToParser(str: string) {
    this.output += str + "\n";
    if (this.toBeParsed !== "") {
      this.toBeParsed += "\n";
    }
    this.toBeParsed += this.input;
    this.inputList.push(this.input);
    this.inputListSelected = -1;

    let parsed = parser.parse(this.toBeParsed);
    this.output += "  ans = " + parsed.vars["ans"].value + "\n\n";
  }

  resetState() {
    this.output = "";
    this.toBeParsed = "";
    this.inputList = [];
    this.inputListSelected = -1;
  }

  onChange(key) {
    if (key.code === "Enter") {
      if (this.input === "clear") {
        this.resetState();
      } else {
        this.addStringToParser(this.input);
      }
      this.input = "";
      this.store();
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

  store() {
    this.localStoreService.setKey("output",this.output);
    this.localStoreService.setKey("toBeParsed",this.toBeParsed);
    this.localStoreService.setKey("inputList",this.inputList.join(';'));
  }

  load() {
    this.output     = this.localStoreService.getKey("output");
    this.toBeParsed = this.localStoreService.getKey("toBeParsed");
    this.inputList  = this.localStoreService.getKey("inputList").split(';');
    this.inputListSelected = -1;
  }
}
