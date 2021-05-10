import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FourBoxComponent } from './four-box/four-box.component';
import { SingleBoxComponent } from './single-box/single-box.component';
import { DebugComponent } from './debug/debug.component';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { MyCounterComponent } from './my-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    FourBoxComponent,
    SingleBoxComponent,
    DebugComponent,
    MyCounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ state: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
