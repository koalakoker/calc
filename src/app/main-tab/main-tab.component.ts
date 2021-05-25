import { Component, ViewChild, NgZone } from '@angular/core';
import { SingleBoxComponent } from '../Panels/single-box/single-box.component'
import { ParserService } from '../Parser/parser.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent {

  @ViewChild(SingleBoxComponent) private tabExpression: SingleBoxComponent;
  selectedIndex: number = 1;
  progress$: Observable<number>;
  progress: number;

  constructor(private parser: ParserService,
              private zone: NgZone) {
    this.progress$ = parser.progress;
    this.progress$.subscribe((progress) => {
      //console.log(progress);
      this.zone.run(() => {
        this.progress = progress;
      });
    });
  };



  onChangeTab(tab: number): void {
    if (tab === 1) {
      this.tabExpression.scrollDownOutput();
    }
  }

}
