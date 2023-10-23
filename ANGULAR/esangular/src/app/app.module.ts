import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { DadiComponent } from './dadi/dadi.component';
import { NeveComponent } from './neve/neve.component';
import { BooksComponent } from './books/books.component';
import { EventiComponent } from './eventi/eventi.component';
import { OutputServizioComponent } from './output-servizio/output-servizio.component';
import { OutputServizioChildComponent } from './output-servizio/output-servizio-child/output-servizio-child.component';
import { LibriConServizioComponent } from './libri-con-servizio/libri-con-servizio.component';

@NgModule({
  declarations: [
    AppComponent,
    DadiComponent,
    NeveComponent,
    BooksComponent,
    EventiComponent,
    OutputServizioComponent,
    OutputServizioChildComponent,
    LibriConServizioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
