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
    
      const response = await fetch(`${this.host}/${this.endpoint}/`, options);

      const data = await response.json();

      if(response.status !== 200) {
        throw new Error(data.message);
      }

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

    public async GetRecipesHeader() {
      const options = {
        method: 'GET',
      };

      const response = await fetch(`${this.host}/headers/`, options);

      const data = await response.json();

      if(response.status !== 200) {
        throw new Error(data.message);
      }

      const recipeHeaders = data.map((o: any) => new RecipeHeader(
        o.Id, 
        o.Name,
        o.ExecutionTime, 
        o.Difficulty,
        o.Ingredients,
        o.UrlImage));

      return recipeHeaders;
    }

    public async GetRecipe(id: number) { 
      const options = {
        method: 'GET',
      };

      const response = await fetch(`${this.host}/${this.endpoint}/${id}/`, options);

      const data = await response.json();

      if(response.status !== 200) {
        throw new Error(data.message);
      }


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

    public async AddRecipe(recipe: Recipe) { 
      const options = {
        method: 'POST',
        body: JSON.stringify(recipe),
      };

      const response = await fetch(`${this.host}/${this.endpoint}/`, options);

      if(response.status !== 201) {
        const data = await response.json();
        throw new Error(data.message);
      }


      return true;
    }

    public async UpdateRecipe(recipe: Recipe) { 
      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      };

      const response = await fetch(`${this.host}/${this.endpoint}/${recipe.Id}/`, options);
      

      if(response.status !== 200) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return true;
    }

    public async DeleteRecipe(id: number) { 
      const options = {
        method: 'DELETE',
      };

      const response = await fetch(`${this.host}/${this.endpoint}/${id}/`, options);
      

      if(response.status !== 200) {
        const data = await response.json();
        throw new Error(data.message);
      }

      return true;
    }

}
