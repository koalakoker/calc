import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { FourBoxComponent } from './Panels/four-box/four-box.component';
import { SingleBoxComponent } from './Panels/single-box/single-box.component';
import { DebugComponent } from './Panels/debug/debug.component';

import { counterReducer } from './State/state.reducer';
import { environment } from 'src/environments/environment';
import { MainTabComponent } from './main-tab/main-tab.component';
import { VariablesComponent } from './Panels/variables/variables.component';
import { FunctionsComponent } from './Panels/functions/functions.component';
import { ResultsComponent } from './Panels/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    FourBoxComponent,
    SingleBoxComponent,
    DebugComponent,
    MainTabComponent,
    VariablesComponent,
    FunctionsComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ state: counterReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
