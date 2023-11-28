import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeHeader } from 'src/app/models/RecipeHeader';
import { Recipe } from 'src/app/models/Recipe';
import { MapStringToIngredient, RecipeIngredient } from 'src/app/models/RecipeIngredient';
import { RecipesService } from 'src/app/services/recipes.service';
import { GetRecipeDifficultyNames } from 'src/app/models/RecipeDifficultyEnum';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css'],
})
export class RecipeAddComponent {
  recipe!: Recipe;
  recipeHeader: RecipeHeader = RecipeHeader.Empty;
  difficulties: string[] = GetRecipeDifficultyNames();

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private notify: NotificationService,
    ) { }

  ngOnInit() {
    this.recipe = { ...Recipe.Empty } as Recipe;

    
    this.recipe = new Recipe(-1, "nome asdf", "descrizione", [
      {
        quantity: 10,
        measure: "gr",
        name: "nome",
      }], ["instructions"], 10, 0, "https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale");

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
    this.recipe.Ingredients = [...newData].map((ingredient) => {
      try
      {
        return MapStringToIngredient(ingredient);
      }
      catch(err) {
        this.notify.error(`${ingredient} has an invalid format`);
        return null;
      }
    }).filter((ingredient) => ingredient != null) as Array<RecipeIngredient>;
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
      this.notify.error("Changes aren't ok, unable to add the recipe");
      return;
    }

    this.recipesService.AddRecipe(this.recipe)
      .then((message) => {
        console.log(message);
        this.notify.success("Recipe added correctly");
      } )
      .catch((err: Error) => {
        console.error(err);
        this.notify.error(err.message);
      });    

    this.router.navigate(['']);
  }

  OnDiscardChanges() { 
    this.notify.warning("Changes ignored");

    this.router.navigate(['']);
  }
}
