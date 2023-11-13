import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeEditComponent } from './recipe-card/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './recipe-card/recipe-view/recipe-view.component';
import { InputListComponent } from './input-list/input-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ...routingComponents,
    RecipeSearchComponent,
    RecipeEditComponent,
    RecipeViewComponent,
    InputListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
