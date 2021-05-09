import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: [ './debug.component.css']
})
export class DebugComponent implements OnInit {

  output: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
