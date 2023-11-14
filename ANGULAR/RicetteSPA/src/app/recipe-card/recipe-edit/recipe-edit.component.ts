import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from 'src/app/models/Recipe';
import { MapStringToIngredient } from 'src/app/models/RecipeIngredient';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  @Input()
  recipe!: Recipe;

  @Output()
  EditRecipeEvent: EventEmitter<void> = new EventEmitter();

  private txtName!: HTMLInputElement;
  private txtExecutionTime!: HTMLInputElement;
  private txtUrlImage!: HTMLInputElement;
  private txtDescription!: HTMLTextAreaElement;

  ngAfterViewChecked() {
    this.txtName = document.getElementById('txtName') as HTMLInputElement;
    this.txtExecutionTime = document.getElementById('txtExecutionTime') as HTMLInputElement;
    this.txtUrlImage = document.getElementById('txtUrlImage') as HTMLInputElement;
    this.txtDescription = document.getElementById('txtDescription') as HTMLTextAreaElement;
  }

  OnIngredientsChanged(newData: Set<string>) {
    this.recipe.Ingredients = [...newData].map(ingredient => MapStringToIngredient(ingredient));
  }

  OnInstructionsChanged(newData: Set<string>) {
    this.recipe.Instructions = [...newData];
  }

  OnSave() {
    const name: string = this.txtName.value.trim();
    const executionTime: number = parseInt(this.txtExecutionTime.value);
    const urlImage: string = this.txtUrlImage.value.trim();
    const description: string = this.txtDescription.value.trim();

    if(name != this.recipe.Name) {
      this.recipe.Name = name;
    }

    if(executionTime != this.recipe.ExecutionTime) {
      this.recipe.ExecutionTime = executionTime;
    }

    if(urlImage != this.recipe.UrlImage) {
      this.recipe.UrlImage = urlImage;
    }

    if(description != this.recipe.Description) {
      this.recipe.Description = description;
    }

    this.EditRecipeEvent.emit();
  }

  OnDiscardChanges() {
    this.EditRecipeEvent.emit();
  }
}
