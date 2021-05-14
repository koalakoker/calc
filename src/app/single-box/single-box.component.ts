import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { LocalStoreService } from '../Services/local-store.service';
import { Store } from '@ngrx/store';
import { AppState } from '../State/appState';
import * as Action from '../State/state.actions';
import { Observable } from 'rxjs';
import * as Selector from '../State/state.selector'
import * as parser from '../parser/rules';
@Component({
  selector: 'single-box',
  templateUrl: './single-box.component.html',
  styleUrls: ['./single-box.component.css']
})
export class SingleBoxComponent {
  @ViewChild('inputBox') inputBox: ElementRef;
  input: string = "";
  
  // State observers
  inputList$        : Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);

  output            : string;
  inputListSelected : number = -1;
  inputList         : ReadonlyArray<string>;
  toBeParsed        : string;
  state             : AppState;
  
  constructor(
    private localStoreService: LocalStoreService,
    private store: Store) {    
    setTimeout(() => {
      this.load();
      this.inputBox.nativeElement.focus();
    }, 100);

    // Register subscriber
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      this.inputList = list;
      this.update(list);
    });
  }

  update(inputList: ReadonlyArray<string>) {
    this.output = "";
    this.toBeParsed = "";
    inputList.forEach(str => {
      this.output += str + "\n";
      if (this.toBeParsed !== "") {
        this.toBeParsed += "\n";
      }
      this.toBeParsed += str;

      let parsed = parser.parse(this.toBeParsed);
      this.output += "  ans = " + parsed.vars["ans"].value + "\n\n";
    })
  }

  onChange(key) {
    if (key.code === "Enter") {
      if (this.input === "clear") {
        this.store.dispatch(Action.resetState());
      } else {
        this.store.dispatch(Action.addStringToParser({str: this.input}));
      }
      this.input = "";
      this.inputListSelected = -1;
      this.save();
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
        }
      }
      this.input = this.inputList[this.inputListSelected];
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

  undo() {
    this.store.dispatch(Action.historyUndo());
    this.inputListSelected = -1;
  }

  redo() {
    this.store.dispatch(Action.historyRedo());
    this.inputListSelected = -1;
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
}
