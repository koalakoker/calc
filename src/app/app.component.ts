import { Component } from '@angular/core';
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
    this.output += this.input + "\n";
    let parsed = parser.parse(this.input);
    console.log(parser.variables);
    this.output += "ans = " + parsed + "\n";
    this.input = "";
  }
}
