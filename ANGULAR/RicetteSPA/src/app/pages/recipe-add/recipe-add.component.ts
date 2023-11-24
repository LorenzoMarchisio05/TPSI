import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeHeader } from 'src/app/models/RecipeHeader';
import { Recipe } from 'src/app/models/Recipe';
import { MapStringToIngredient } from 'src/app/models/RecipeIngredient';
import { RecipesService } from 'src/app/services/recipes.service';
import { GetRecipeDifficultyNames, RecipeDifficulty } from 'src/app/models/RecipeDifficultyEnum';


@Component({
  selector: 'recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css'],
})
export class RecipeAddComponent {
  recipe: Recipe = Recipe.Empty;
  recipeHeader: RecipeHeader = RecipeHeader.Empty;
  difficulties: string[] = GetRecipeDifficultyNames();

  constructor(
    private recipesService: RecipesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.recipe = Recipe.Empty;
    this.recipeHeader.Difficulty = this.recipe.Difficulty;
    this.recipeHeader.ExecutionTime = this.recipe.ExecutionTime;
    this.recipeHeader.Name = this.recipe.Name;
    this.recipeHeader.UrlImage = this.recipe.UrlImage;
  }

  OnTxtNameKeyUp(e: Event) {
    const txtName = e.target as HTMLInputElement;
    const name: string = txtName.value.trim();
    const nameChanged = name != this.recipe.Name
      || name != this.recipeHeader.Name;

    if (nameChanged) {
      this.recipe.Name = name;
      this.recipeHeader.Name = name;
    }
  }

  OnDifficultyChanged(e: Event) {
    const select = e.target as HTMLSelectElement;
    const option = select.selectedOptions[0] as HTMLOptionElement;
    const difficulty = parseInt(option.value);
    const difficultyChanged = difficulty != this.recipe.Difficulty 
      || difficulty != this.recipeHeader.Difficulty;

    if(difficultyChanged) {
      this.recipe.Difficulty = difficulty;
      this.recipeHeader.Difficulty = difficulty;
    }
  }

  OnTxtExecutionTimeChanged(e: Event) {
    const txtExecutionTime = e.target as HTMLInputElement;
    const executionTime: number = parseInt(txtExecutionTime.value);
    const executionTimeChanged = executionTime != this.recipe.ExecutionTime
      || executionTime != this.recipeHeader.ExecutionTime;


    if(executionTime < 0) {
      return;
    }

    if (executionTimeChanged) {
      const time = isNaN(executionTime) ? 0 : executionTime;

      this.recipe.ExecutionTime = time;
      this.recipeHeader.ExecutionTime = time;
    }
  }

  OnTxtUrlImageKeyUp(e: Event) {
    const txtUrlImage = e.target as HTMLInputElement;
    const urlImage: string = txtUrlImage.value.trim() || Recipe.Empty.UrlImage;;

    const urlImageChanged = urlImage != this.recipe.UrlImage
      || urlImage != this.recipeHeader.UrlImage;

    if (urlImageChanged) {
      this.recipe.UrlImage = urlImage;
      this.recipeHeader.UrlImage = urlImage;
    }
  }

  OnIngredientsChanged(newData: Set<string>) {
    this.recipe.Ingredients = [...newData].map((ingredient) =>
      MapStringToIngredient(ingredient)
    );
  }

  OnInstructionsChanged(newData: Set<string>) {
    this.recipe.Instructions = [...newData];
  }

  OnTxtDescriptionKeyUp(e: Event) {
    const txtDescription = e.target as HTMLInputElement;
    const description: string = txtDescription.value.trim();
    const descriptionChanged = description != this.recipe.Description;

    if (descriptionChanged) {
      this.recipe.Description = description;
    }
  }

  OnSave() {
    const nameChanged = Recipe.Empty.Name != this.recipe.Name;
    const executionTimeChanged = Recipe.Empty.ExecutionTime != this.recipe.ExecutionTime;
    const urlImageChanged = Recipe.Empty.UrlImage != this.recipe.UrlImage;
    const ingredientsChanged = Recipe.Empty.Ingredients != this.recipe.Ingredients;
    const instructionsChanged = Recipe.Empty.Instructions != this.recipe.Instructions;
    const descriptionChanged = Recipe.Empty.Description != this.recipe.Description;

    const changesAreOk = (
      nameChanged && executionTimeChanged && urlImageChanged &&
      ingredientsChanged && this.recipe.Ingredients.length > 0 &&
      instructionsChanged && this.recipe.Instructions.length > 0 &&
      descriptionChanged
    );

    if(!changesAreOk) {
      return;
    }

    this.recipesService.AddRecipe(this.recipe);

    this.router.navigate(['']);
  }

  OnDiscardChanges() { 
    this.router.navigate(['']);
  }
}
