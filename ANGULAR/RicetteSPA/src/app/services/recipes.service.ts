import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';

import { Recipe } from '../models/Recipe';
import { RecipeHeader } from '../models/RecipeHeader';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly endpoint: string = "recipes/";

  constructor(
    private dataStorageService: DataStorageService
  ) { }

    public GetRecipes(): Promise<Recipe[]> { 
      return new Promise<Recipe[]>((resolve, reject) => {
        this.dataStorageService.Get(this.endpoint).subscribe({
          next: (data: any) => {
              resolve(data);
          },

          error: reject,
        })
      });
    }

    public GetRecipesHeader(): Promise<RecipeHeader[]> {
      return new Promise<Recipe[]>((resolve, reject) => {
        this.dataStorageService.Get(`${this.endpoint}/headers/`).subscribe({
          next: (data: any) => {
              resolve(data);
          },

          error: reject,
        })
      });
    }

    public GetRecipe(id: number): Promise<Recipe> { 
      return new Promise<Recipe>((resolve, reject) => {
        this.dataStorageService.Get(`${this.endpoint}/${id}/`).subscribe({
          next: (data: any) => {
              resolve(data);
          },

          error: reject,
        })
      });
    }

    public AddRecipe(recipe: Recipe): Promise<number> { 
      return new Promise<number>((resolve, reject) => { 
        this.dataStorageService.Post(this.endpoint, recipe).subscribe({
          next: (data: any) => {
              resolve(data);
          },

          error: reject,
        })
      })
    }

    public UpdateRecipe(recipe: Recipe): Promise<number> { 
      return new Promise<number>((resolve, reject) => { 
        this.dataStorageService.Put(`${this.endpoint}/${recipe.Id}/`, recipe).subscribe({
          next: () => {
              resolve(recipe.Id);
          },

          error: reject,
        })
      })
    }

    public DeleteRecipe(id: number): Promise<number> { 
      return new Promise<number>((resolve, reject) => { 
        this.dataStorageService.Delete(`${this.endpoint}/${id}/`).subscribe({
          next: () => {
              resolve(id);
          },

          error: reject,
        })
      })
    }

}
