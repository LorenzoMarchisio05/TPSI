import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'recipe/:id', component: RecipeCardComponent },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RecipeCardComponent, PageNotFoundComponent]
