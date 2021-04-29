import { Component } from '@angular/core';
//import { Parser } from './parser';
//import { Evaluator } from './evaluator';
//import * as parser from './parser';

import * as parser from './parser/rules'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'calc';
  input: string = "";
  output: string = "";
  
  onEnter() {

    //let parser: Parser = Parser.getInst();
    //let ast = parser.parse(this.input);
    //let evaluator = new Evaluator(ast);
    //evaluator.evaluate();
    //let parsed = parser.parse(this.input);
    //console.log(parser);

    this.output += this.input + "\n";
    //this.output += parsed + "\n";
    console.log(parser.parse(this.input));
    this.input = "";
  }
}
