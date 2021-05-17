import { Component, OnInit } from '@angular/core';
import * as parser from '../../Parser/rules';

@Component({
  selector: 'four-box',
  templateUrl: './four-box.component.html',
  styleUrls: ['./four-box.component.css']
})
export class FourBoxComponent implements OnInit {
  input: string = "";
  ans: string = "";
  vars: string = "";
  functions: string = "";

  onChange() {
    let parsed = parser.parse(this.input);
    //console.log(parsed);

    this.ans = "";
    parsed.results.forEach((element, index) => {
      this.ans += "[" + index + "]: " + element + "\n";
    });

    this.vars = "";
    for (const [key] of Object.entries(parsed.vars)) {
      this.vars += key + '=' + parsed.vars[key].value + "\n";
    };

    this.functions = "";
    for (const [key] of Object.entries(parsed.functions)) {
      let value = parsed.functions[key];
      this.functions += key + "(" + value.arg + ')=' + value.expr + "\n";
    };
  }

  constructor() { }

  ngOnInit(): void {
  }

}
