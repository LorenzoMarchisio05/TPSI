import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { RecipeEditComponent } from './pages/recipe-card/recipe-edit/recipe-edit.component';
import { RecipeViewComponent } from './pages/recipe-card/recipe-view/recipe-view.component';
import { InputListComponent } from './components/input-list/input-list.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeAddComponent } from './pages/recipe-add/recipe-add.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ...routingComponents,
    RecipeSearchComponent,
    RecipeEditComponent,
    RecipeViewComponent,
    InputListComponent,
    RecipeListComponent,
    HomeComponent,
    RecipeAddComponent,
    ListItemComponent,
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
