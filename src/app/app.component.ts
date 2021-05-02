import { Component } from '@angular/core';
import * as parser from './parser/rules';
// import * as Decimal from '../../node_modules/decimal';

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

    // let x = new Decimal(123.4567);
    // let y = new Decimal('123456.7e-3');
    // let z = new Decimal(x);
    // console.log("Decimal:" + z.toString());

    this.output += this.input + "\n";
    let parsed = parser.parse(this.input);
    console.log(parser.variables);
    this.output += "ans = " + parsed + "\n";
    this.input = "";
  }
}
