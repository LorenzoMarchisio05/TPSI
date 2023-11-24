import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecipeCardComponent } from './pages/recipe-card/recipe-card.component';
import { RecipeAddComponent } from './pages/recipe-add/recipe-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'recipe/:id', component: RecipeCardComponent },
  { path: 'recipe-add', component: RecipeAddComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RecipeCardComponent, NotFoundComponent]
