import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent implements OnInit {

  selectedIndex: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
