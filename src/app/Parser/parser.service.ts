import { Injectable } from '@angular/core';
import * as parser from './rules';
import { Store } from '@ngrx/store';
import { Observable, Subscriber } from 'rxjs';
import * as Selector from '../State/state.selector';

@Injectable({
  providedIn: 'root'
})
export class ParserService extends Observable<ReadonlyArray<string>> {
  // State observers
  inputList$: Observable<ReadonlyArray<string>> = this.store.select(Selector.selectInputList);

  // Subscribed
  subscrivers: Array<Subscriber<ReadonlyArray<string>>> = [];

  output: string;
  vars: string;
  functions: string;
  results: string;
  lastAns: string;

  constructor(private store: Store) {
    super( (sub) => {
      this.subscrivers.push(sub);
    } );
    
    // Subscribe to store
    this.inputList$.subscribe((list: ReadonlyArray<string>) => {
      if (list.length > 0) {
        this.parse(list[list.length - 1]);
      } else {
        this.output = '';
      }
      this.subscrivers.forEach(sub => {
        sub.next(list);
      });
    });
  }

  private parse(str: string): void {
    let toBeParsed = "";
    let parsed;
    let output = "";
    
    console.log("Running parser");
    
    output = str + "\n";
    toBeParsed = str;

    try {
      if (toBeParsed != "") {
        parsed = parser.parse(toBeParsed);
        parser.results.push(parsed);
        output += "  ans=" + parsed + "\n\n";
      }
    } catch (error) {
      console.log("**** Syntax Error parsing ****");
      console.log(str);
      console.log("---- Returned value ----");
      console.log(error);
      output += "  " + error.name + "\n\n";
      toBeParsed = this.removeLastExpression(toBeParsed);
    }
    
    let vars: string = "";
    let functions: string = "";
    let results: string = "";
    let lastAns: string = "";

    
    for (const [key] of Object.entries(parser.vars)) {
      vars += key + '=' + parser.vars[key].value + "\n";
    };

    for (const [key] of Object.entries(parser.functions)) {
      let value = parser.functions[key];
      functions += key + "(" + value.arg + ')=' + value.expr + "\n";
    };
    
    console.log(parser.results);
    parser.results.forEach((element, index) => {
      results += "[" + index + "]: " + element + "\n";
      lastAns = element.toString();
    });

    // if (lastIsAnError) {
    //   lastAns = "NaN";
    

    this.output   = output;
    this.vars     = vars;
    this.functions= functions;
    this.results  = results;
    this.lastAns  = lastAns;
  }

  private removeLastExpression(toBeParsed: string): string {
    var toBePrasedList = toBeParsed.split("\n");
    toBePrasedList.pop();
    return toBePrasedList.join("\n");
  }
}
