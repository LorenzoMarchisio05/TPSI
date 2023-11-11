import { Component } from '@angular/core';
import { RecipeHeader } from '../models/RecipeHeader';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { RecipeDifficultyMap } from '../models/RecipeDifficultyEnum';

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
    private recipesService: RecipesService
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
    const query: string = args.toLowerCase();

    const filteringFunction = (header: RecipeHeader) => {
      const difficulty = header.Difficulty.toString();
      const executionTime = header.ExecutionTime.toString();
      const name = header.Name.toLowerCase();
      const id = header.Id.toString();

      if(difficulty === query) {
        return true;
      }

      if(header.Difficulty === RecipeDifficultyMap[query])
      {
        return true;
      }

      if(`${executionTime} minutes`.includes(query)) {
        return true;
      }

      if(name.includes(query)) {
        return true;
      }

      if(id === query) {
        return true;
      }

      return false;
    };

    const filteredHeaders = this.recipeHeaders.filter(filteringFunction);

    this.filteredRecipeHeaders = filteredHeaders;

    this.ngOnInit();
  }

}
