import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { LocalStoreService } from '../../Services/local-store.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../State/appState';
import * as Action from '../../State/state.actions';
import { parse } from '../../Parser/parser';
import { saveAs } from '../../../../node_modules/file-saver';
import { OutputComponent } from '../output/output.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'panel-single-box',
  templateUrl: './single-box.component.html',
  styleUrls: [
    '../panels.component.css',
    './single-box.component.css'
  ]})
export class SingleBoxComponent {
  @ViewChild('inputBox') inputBox: ElementRef;
  @ViewChild('outputBox') outputBox: OutputComponent;
  input: string = "";
  
  output            : string;
  inputListSelected : number = -1;
  inputList         : ReadonlyArray<string>;
  toBeParsed        : string;
  state             : AppState;

  evalTimer: NodeJS.Timeout = null;
  lastInputEvaluated: string = "";
  
  constructor(
    private localStoreService: LocalStoreService,
    private store: Store,
    private _snackBar: MatSnackBar) {
    setTimeout(() => {
      this.load();
      this.inputBox.nativeElement.focus();
    }, 100);

  }

  update(inputList: ReadonlyArray<string>) {
    this.inputList = inputList;
    this.output = parse(inputList).output;
    this.outputBox.updateTextArea();
  }

  updateEvalPreview() {
    if (this.input === this.lastInputEvaluated) {
      return;
    }
    if (this.input === "") {
      this._snackBar.dismiss();
      return;
    }
    let inputList: Array<string> = [];
    this.inputList.forEach(str => {
      inputList.push(str);
    });
    inputList.push(this.input);
    let lastAns: string = parse(inputList).lastAns;
    if (!(lastAns === "NaN")) {
      this._snackBar.open("ans = " + lastAns, "hide");
    }
    this.lastInputEvaluated = this.input;
  }

  onChange(key) {
    if (key.code === "Enter") {
      this.enter();
    }
    if (key.code === "ArrowUp") {
      this.up();
    }
    if (key.code === "ArrowDown") {
      this.down();
    }
    if (key.code === "Escape") {
      this.clearInput();
    }
    if ((this.input.length === 1) && (this.toBeParsed !== "")) {
      let char = this.input[0];
      if ((char === '+') || (char === '-') ||
          (char === '*') || (char === '/') ||
          (char === '^') || (char === ':')) {
          this.input = "ans" + char;
      }
    }

    if (!(this.input === this.lastInputEvaluated)) {
      this._snackBar.dismiss();
    }
    if (this.evalTimer !== null) {
      clearTimeout(this.evalTimer);
    }
    this.evalTimer = setTimeout(() => {
      this.updateEvalPreview();
      this.evalTimer = null;
    }, 750);
  }

  enter() {
    this.newInput(this.input);
    this.clearInput();
    this.save();
    this.outputBox.updateTextArea();
  }

  newInput(input: string) {
    if (input === "clear") {
      this.store.dispatch(Action.resetState());
    } else {
      this.store.dispatch(Action.addStringToParser({ str: input }));
    }
  }

  clearInput() {
    this.input = "";
    this.inputListSelected = -1;
  }

  up() {
    if (this.inputListSelected === -1) {
      this.inputListSelected = this.inputList.length - 1;
    } else if (this.inputListSelected > 0) {
      this.inputListSelected -= 1;
    }
    this.input = this.inputList[this.inputListSelected];
  }

  down() {
    if (this.inputListSelected !== -1) {
      if (this.inputListSelected < this.inputList.length - 1) {
        this.inputListSelected += 1;
      }
    }
    this.input = this.inputList[this.inputListSelected];
  }

  undo() {
    this.store.dispatch(Action.historyUndo());
    this.inputListSelected = -1;
    this.save();
  }

  redo() {
    this.store.dispatch(Action.historyRedo());
    this.inputListSelected = -1;
    this.save();
  }

  save() {
    this.localStoreService.setKey("inputList", this.inputList.join(';'));
  }

  load() {
    let inputList = this.localStoreService.getKey("inputList").split(';');
    inputList.forEach( str => {
      this.store.dispatch(Action.addStringToParser({str: str}));
    });
  }

  saveFile() {
    const blob = new Blob([this.inputList.join('\n')],{ type: "text/plain;charset=utf-8" });
    saveAs(blob, "calcHystory.txt");
  }

  loadFile(e) {
    let files: FileList = e.target.files;
    let file = files.item(0);
    const reader = new FileReader();
    reader.onload = (evt) => {
      let inputList = evt.target.result.toString().split('\n');
      inputList.forEach(str => {
        this.store.dispatch(Action.addStringToParser({ str: str }));
      });
      this.save();
    };
    reader.readAsText(file);
  }
}
