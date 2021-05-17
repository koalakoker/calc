import { Component } from '@angular/core';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['../panels.component.css']
})
export class FunctionsComponent {

  output: string = "Functions will be shown here";

  constructor() { }
}
