import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html'
})
export class MainTabComponent implements OnInit {

  selectedIndex: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
