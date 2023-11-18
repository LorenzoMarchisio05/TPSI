import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from 'src/app/models/Recipe';
import { MapStringToIngredient } from 'src/app/models/RecipeIngredient';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css'],
})
export class RecipeAddComponent {
  recipe: Recipe = Recipe.Empty;

  private txtId!: HTMLInputElement;
  private txtName!: HTMLInputElement;
  private txtExecutionTime!: HTMLInputElement;
  private txtUrlImage!: HTMLInputElement;
  private txtDescription!: HTMLTextAreaElement;

  constructor(
    private recipesService: RecipesService,
    private router: Router
    ) {}

  ngAfterViewChecked() {
    this.txtId = document.getElementById('txtId') as HTMLInputElement;
    this.txtName = document.getElementById('txtName') as HTMLInputElement;
    this.txtExecutionTime = document.getElementById(
      'txtExecutionTime'
    ) as HTMLInputElement;
    this.txtUrlImage = document.getElementById(
      'txtUrlImage'
    ) as HTMLInputElement;
    this.txtDescription = document.getElementById(
      'txtDescription'
    ) as HTMLTextAreaElement;
  }

  OnIngredientsChanged(newData: Set<string>) {
    this.recipe.Ingredients = [...newData].map((ingredient) =>
      MapStringToIngredient(ingredient)
    );
  }

  OnInstructionsChanged(newData: Set<string>) {
    this.recipe.Instructions = [...newData];
  }

  OnSave() {
    const id: number = parseInt(this.txtId.value);
    const name: string = this.txtName.value.trim();
    const executionTime: number = parseInt(this.txtExecutionTime.value);
    const urlImage: string = this.txtUrlImage.value.trim();
    const description: string = this.txtDescription.value.trim();

    const idChanged = id != this.recipe.Id;
    const nameChanged = name != this.recipe.Name;
    const executionTimeChanged = executionTime != this.recipe.ExecutionTime;
    const urlImageChanged = urlImage != this.recipe.UrlImage;
    const descriptionChanged = description != this.recipe.Description;

    if(idChanged) {
      this.recipe.Id = id;
    }

    if (nameChanged) {
      this.recipe.Name = name;
    }

    if (executionTimeChanged) {
      this.recipe.ExecutionTime = executionTime;
    }

    if (urlImageChanged) {
      this.recipe.UrlImage = urlImage;
    }

    if (descriptionChanged) {
      this.recipe.Description = description;
    }
    
    this.recipesService.AddRecipe(this.recipe);

    this.router.navigate(['']);
  }

  OnDiscardChanges() {
    this.router.navigate(['']);
  }
}
