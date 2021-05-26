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
      this.parse(list);
      this.subscrivers.forEach(sub => {
        sub.next(list);
      });
    });
  }

  private parse(inputList: ReadonlyArray<string>): void {
    let output = "";
    let toBeParsed = "";
    let lastParsed;
    let lastIsAnError: boolean;
    console.log("Running parser");
    inputList.forEach(str => {
      output += str + "\n";
      if (toBeParsed !== "") {
        toBeParsed += "\n";
      }
      toBeParsed += str;

      try {
        //console.log(toBeParsed);
        let parsed = parser.parse(toBeParsed);
        //console.log(parsed);
        output += "  ans=" + parsed.vars["ans"].value + "\n\n";
        lastParsed = parsed;
        lastIsAnError = false;
      } catch (error) {
        // console.log("**** Syntax Error parsing ****");
        // console.log(str);
        // console.log("---- Returned value ----");
        // console.log(error);
        output += "  " + error.name + "\n\n";
        toBeParsed = this.removeLastExpression(toBeParsed);
        lastIsAnError = true;
      }
    })

    let vars: string = "";
    let functions: string = "";
    let results: string = "";
    let lastAns: string = "";

    if (lastParsed !== undefined) {
      for (const [key] of Object.entries(lastParsed.vars)) {
        vars += key + '=' + lastParsed.vars[key].value + "\n";
      };

      for (const [key] of Object.entries(lastParsed.functions)) {
        let value = lastParsed.functions[key];
        functions += key + "(" + value.arg + ')=' + value.expr + "\n";
      };
      lastParsed.results.forEach((element, index) => {
        results += "[" + index + "]: " + element + "\n";
        lastAns = element.toString();
      });
    }

    if (lastIsAnError) {
      lastAns = "NaN";
    }

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
