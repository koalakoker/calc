import { Injectable } from '@angular/core';
import * as parser from './rules';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Selector from '../State/state.selector';
import * as Action from '../State/state.actions';
@Injectable({
  providedIn: 'root'
})
export class ParserService {
  // State observers
  inputList$: Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);
  results$  : Observable<ReadonlyArray<any>>    = this.store.select(Selector.selectResults);
  vars$     : Observable<any>    = this.store.select(Selector.selectVariables);
  functions$: Observable<any>    = this.store.select(Selector.selectFunctions);
  output$   : Observable<string> = this.store.select(Selector.selectOutput);
  
  inputList: ReadonlyArray<string> = [];
  results  : ReadonlyArray<any>;
  vars     : any;
  functions: any;
  output   : string;
  lastAns: string;

  constructor(private store: Store) {
  }

  private parse(str: string): void {
    let toBeParsed = "";
    let parsed;
    
    console.log("Running parser");
    
    this.output = str + "\n";
    toBeParsed = str;

    // Restore the parser state from store
    parser.setVars     (this.vars);
    parser.setFunctions(this.functions);
    parser.setResults  (this.results);
    
    try {
      if (toBeParsed != "") {
        parsed = parser.parse(toBeParsed);
        parser.appendResults(parsed);
        this.output += "  ans=" + parsed + "\n\n";
      }
    } catch (error) {
      console.log("**** Syntax Error parsing ****");
      console.log(str);
      console.log("---- Returned value ----");
      console.log(error);
      this.output += "  " + error.name + "\n\n";
      toBeParsed = this.removeLastExpression(toBeParsed);
    }
    
    let lastAns: string = "";
    // if (lastIsAnError) {
    //   lastAns = "NaN";
    this.lastAns  = lastAns;
  }

  private removeLastExpression(toBeParsed: string): string {
    var toBePrasedList = toBeParsed.split("\n");
    toBePrasedList.pop();
    return toBePrasedList.join("\n");
  }
}
