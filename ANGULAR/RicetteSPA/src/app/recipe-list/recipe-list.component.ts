import { Component } from '@angular/core';
import { RecipeHeader } from '../models/RecipeHeader';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { RecipesSearchService } from '../services/recipes-search.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  private init: boolean = true;

  recipeHeaders!: RecipeHeader[] 

  filteredRecipeHeaders!: RecipeHeader[];

  headers: string[] = RecipeHeader.GetHeaders();

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private recipeSearchService: RecipesSearchService,
  ) {}

  async ngOnInit() {
    if(this.init) {
      try
      {
        this.recipeHeaders = await this.recipesService.GetRecipesHeader();
        this.filteredRecipeHeaders = this.recipeHeaders;
      }
      catch(err) {
        console.error(err);
      }

      this.init = false;
      return;
    }
  }

  OnRowClick(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const id = target.parentElement!.id;

    if(id === "-1") {
      return;
    }
    
    this.router.navigate([`recipe/${id}/`]);
  }

  OnSearch(args: string) {
    const query: string = args.trim().toLowerCase();

    this.filteredRecipeHeaders = this.recipeSearchService.search(this.recipeHeaders, query);

    if(this.filteredRecipeHeaders.length === 0) {
      this.addNoRecipeFound();
    }

    this.ngOnInit();
  }

  private addNoRecipeFound(message: string = "No recipes found") {
    this.filteredRecipeHeaders.push({...RecipeHeader.Empty, Name: message} as RecipeHeader);
  }

}
