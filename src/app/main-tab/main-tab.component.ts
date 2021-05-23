import { Component, ViewChild } from '@angular/core';
import { SingleBoxComponent } from '../Panels/single-box/single-box.component'

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent {

  @ViewChild(SingleBoxComponent) private tabExpression: SingleBoxComponent;
  selectedIndex: number = 1;

  onChangeTab(tab: number): void {
    if (tab === 1) {
      this.tabExpression.scrollDownOutput();
    }
  }

}
