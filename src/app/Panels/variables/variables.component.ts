import { Component } from '@angular/core';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['../panels.component.css']
})
export class VariablesComponent {

  output: string = "Variables will be shown here";

  constructor() { }
}
