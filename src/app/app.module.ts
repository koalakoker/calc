import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FourBoxComponent } from './four-box/four-box.component';
import { SingleBoxComponent } from './single-box/single-box.component';
import { DebugComponent } from './debug/debug.component';

import { StoreModule } from '@ngrx/store';
import { booksReducer } from './State/books.reducer';
import { collectionReducer} from './State/collection.reducer'
import { BookCollectionComponent } from './book-list/book-collection.component';
import { BookListComponent } from './book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FourBoxComponent,
    SingleBoxComponent,
    DebugComponent,
    BookListComponent,
    BookCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
