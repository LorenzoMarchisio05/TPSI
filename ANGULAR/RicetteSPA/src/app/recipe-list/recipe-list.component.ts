import { Component } from '@angular/core';
import { RecipeHeader } from '../models/RecipeHeader';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipeHeaders!: RecipeHeader[] 

  headers: string[] = RecipeHeader.GetHeaders();

  constructor(
    private router: Router,
    private recipesService: RecipesService
  ) {}

  async ngOnInit() {
    try
    {
      this.recipeHeaders = await this.recipesService.GetRecipesHeader();
    }
    catch(err) {
      console.error(err);
    }
  }

  rowClick(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const id = target.parentElement!.id;
    
    this.router.navigate([`recipe/${id}/`]);
  }
}
