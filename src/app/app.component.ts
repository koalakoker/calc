import { Component } from '@angular/core';
import * as parser from './parser/rules';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'calc';
  input: string = "";
  output: string = "";
  vars: string = "";
  functions: string = "";
  
  onChange() {
    let parsed = parser.parse(this.input);
    console.log(parsed);
    
    this.output = "";
    parsed.results.forEach(element => {
      this.output += element + "\n";
    });

    this.vars = "";
    for (const [key] of Object.entries(parsed.vars)) {
      this.vars += key + '=' + parsed.vars[key].value + "\n";
    };

    this.functions = "";
    for (const [key] of Object.entries(parsed.functions)) {
      this.functions += key + '=' + parsed.functions[key].expr + "\n";
    };
  }
}
