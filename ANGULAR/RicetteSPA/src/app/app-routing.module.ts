import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-list', pathMatch: 'full'},
  { path: 'recipe-list', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeCardComponent },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RecipeListComponent, RecipeCardComponent, PageNotFoundComponent]
