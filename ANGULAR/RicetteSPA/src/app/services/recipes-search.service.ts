import { Injectable } from '@angular/core';
import { RecipeHeader } from '../models/RecipeHeader';
import { RecipeDifficultyMap } from '../models/RecipeDifficultyEnum';

@Injectable({
  providedIn: 'root'
})
export class RecipesSearchService {

  constructor() { }

  public search(recipeHeaders: RecipeHeader[], queries: string): RecipeHeader[] {
    if(queries === "") {
      return recipeHeaders;
    }

    let filteredHeaders: RecipeHeader[] = [];
    queries.split(',').forEach(q => {
      const query = q.trim().toLowerCase();
      
      if(query === "") {
        return;
      }

      const results = recipeHeaders.filter((header: RecipeHeader) => {
        const difficulty = header.Difficulty.toString();
        const executionTime = header.ExecutionTime.toString();
        const name = header.Name.toLowerCase();
        const id = header.Id.toString();
        const ingredients = header.Ingredients;
    
        if(difficulty === query) {
          return true;
        }
    
        if(header.Difficulty === RecipeDifficultyMap[query]) {
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

        if(ingredients.some(ingredient => ingredient.name.toLowerCase().includes(query))) {
          return true;
        }
    
        return false;
      });

      filteredHeaders = [...filteredHeaders, ...results];
    });

    return [...new Set(filteredHeaders)];
  }
}