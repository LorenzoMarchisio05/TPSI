import { Injectable } from '@angular/core';

import { Recipe } from '../models/Recipe';
import { RecipeHeader } from '../models/RecipeHeader';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private readonly host: string = 'http://127.0.0.1:3000';
  private readonly endpoint: string = "recipes";

    public async GetRecipes() { 
      const options = {
        method: 'GET',
      };

      try
      {
        const response = await fetch(`${this.host}/${this.endpoint}/`, options);

        const data = await response.json();

        const recipes = data.map((o: any) => new Recipe(
          parseInt(o.Id), 
          o.Name, 
          o.Description, 
          o.Ingredients,
          o.Instructions,
          o.ExecutionTime, 
          o.Difficulty, 
          o.UrlImage));

        return recipes;
      }
      catch(err) 
      {
        return [];
      }
    }

    public async GetRecipesHeader() {
      const options = {
        method: 'GET',
      };

      try
      {
        const response = await fetch(`${this.host}/${this.endpoint}/`, options);

        const data = await response.json();

        const recipeHeaders = data.map((o: any) => new RecipeHeader(
          o.Id, 
          o.Name,
          o.ExecutionTime, 
          o.Difficulty,
          o.Ingredients,
          o.UrlImage));

        return recipeHeaders;
      }
      catch(err) 
      {
        return [];
      }
    }

    public async GetRecipe(id: number) { 
      const options = {
        method: 'GET',
      };

      try
      {
        const response = await fetch(`${this.host}/${this.endpoint}/${id}/`, options);

        const data = await response.json();

        const recipe =  new Recipe(
          parseInt(data.Id), 
          data.Name, 
          data.Description, 
          data.Ingredients,
          data.Instructions,
          data.ExecutionTime, 
          data.Difficulty, 
          data.UrlImage);

        return recipe;
      }
      catch(err) 
      {
        return Recipe.Empty;
      }
    }

    public async AddRecipe(recipe: Recipe) { 
      const options = {
        method: 'POST',
        body: JSON.stringify(recipe),
      };

      try
      {
        await fetch(`${this.host}/${this.endpoint}/`, options);

        return true;
      }
      catch(err) 
      {
        return false;
      }
    }

    public async UpdateRecipe(recipe: Recipe) { 
      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      };

      try
      {
        await fetch(`${this.host}/${this.endpoint}/${recipe.Id}/`, options);

        return true;
      }
      catch(err) 
      {
        return false;
      }
    }

    public async DeleteRecipe(id: number) { 
      const options = {
        method: 'DELETE',
      };

      try
      {
        await fetch(`${this.host}/${this.endpoint}/${id}/`, options);

        return true;
      }
      catch(err) 
      {
        return false;
      }
    }

}
