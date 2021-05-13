import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { LocalStoreService } from '../Services/local-store.service';
import { Store } from '@ngrx/store';
import { AppState } from '../State/appState';
import * as Action from '../State/state.actions';
import * as HistoryAction from '../History/history.actions';
import { Observable } from 'rxjs';
import * as Selector from '../State/state.selector'
@Component({
  selector: 'single-box',
  templateUrl: './single-box.component.html',
  styleUrls: ['./single-box.component.css']
})
export class SingleBoxComponent {
  @ViewChild('inputBox') inputBox: ElementRef;
  input: string = "";
  
  // State observers
  output$           : Observable<String>                = this.store.select(Selector.selectOutput);
  toBeParsed$       : Observable<string>                = this.store.select(Selector.selectToBeParsed);
  inputList$        : Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);
  inputListSelected$: Observable<number>                = this.store.select(Selector.selectInputListSelected);
  state$            : Observable<AppState>              = this.store.select(Selector.selectState);

  output            : string;
  inputListSelected : number;
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
    this.output$.subscribe((str: string) => {
      this.output = str;
    })
    this.inputListSelected$.subscribe((index: number) => {
      this.inputListSelected = index;
    });
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      this.inputList = list;
    });
    this.toBeParsed$.subscribe((str: string) => {
      this.toBeParsed = str;
    })
    this.state$.subscribe((state: AppState) => {
      this.state = state;
    })
  }

  onChange(key) {
    if (key.code === "Enter") {
      if (this.input === "clear") {
        this.store.dispatch(Action.resetState());
      } else {
        this.store.dispatch(Action.addStringToParser({str: this.input}));
      }
      this.store.dispatch(HistoryAction.historyAdd(this.state));
      this.input = "";
      this.save();
    }
    if (key.code === "ArrowUp") {
      this.store.dispatch(Action.selectPrevious());
      this.input = this.inputList[this.inputListSelected];
    }
    if (key.code === "ArrowDown") {
      this.store.dispatch(Action.selectNext());
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
    this.store.dispatch(HistoryAction.historyUndo());
  }

  redo() {
    this.store.dispatch(HistoryAction.historyRedo());
  }

  save() {
    this.localStoreService.setKey("output", this.output);
    this.localStoreService.setKey("toBeParsed", this.toBeParsed);
    this.localStoreService.setKey("inputList", this.inputList.join(';'));
  }

  load() {
    let state: AppState = {
      output: this.localStoreService.getKey("output"),
      toBeParsed: this.localStoreService.getKey("toBeParsed"),
      inputList : this.localStoreService.getKey("inputList").split(';'),
      inputListSelected : -1
    }
    this.store.dispatch(Action.setState(state));
    this.store.dispatch(HistoryAction.historyAdd(this.state));
  }
}
