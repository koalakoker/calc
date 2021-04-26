import { Component } from '@angular/core';
import { Parser } from './parser';
import { Evaluator } from './evaluator';

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

    let parser: Parser = Parser.getInst();
    let ast = parser.parse(this.input);
    let evaluator = new Evaluator(ast);
    evaluator.evaluate();

    // this.output += this.input + "\n";
    // this.output += eval(this.input) + "\n";
    // this.input = "";
  }
}
