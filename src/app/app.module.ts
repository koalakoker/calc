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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';

import { counterReducer } from './State/state.reducer';
import { environment } from 'src/environments/environment';

import { MainTabComponent } from './main-tab/main-tab.component';
import { OutputComponent } from './Panels/output/output.component'
import { SingleBoxComponent } from './Panels/single-box/single-box.component';
import { VariablesComponent } from './Panels/variables/variables.component';
import { FunctionsComponent } from './Panels/functions/functions.component';
import { ResultsComponent } from './Panels/results/results.component';
import { TestingComponent } from './Panels/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleBoxComponent,
    MainTabComponent,
    VariablesComponent,
    FunctionsComponent,
    ResultsComponent,
    TestingComponent,
    OutputComponent
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
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
