import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from 'src/app/models/Recipe';
import { MapStringToIngredient } from 'src/app/models/RecipeIngredient';
import { NotificationService } from 'src/app/services/notification.service';
import { RecipesService } from 'src/app/services/recipes.service';

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

  constructor(
    private recipesService: RecipesService,
    private notify: NotificationService
  ) { }

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

    const nameChanged = name != this.recipe.Name;
    const executionTimeChanged = executionTime != this.recipe.ExecutionTime;
    const urlImageChanged = urlImage != this.recipe.UrlImage;
    const descriptionChanged = description != this.recipe.Description;  

    if(nameChanged) {
      this.recipe.Name = name;
    }

    if(executionTimeChanged) {
      this.recipe.ExecutionTime = executionTime;
    }

    if(urlImageChanged) {
      this.recipe.UrlImage = urlImage;
    }

    if(descriptionChanged) {
      this.recipe.Description = description;
    }
    this.recipesService.UpdateRecipe(this.recipe)
      .then((message) => {
        console.log(message);
        this.notify.success("Recipe modified correctly");
      } )
      .catch((err: Error) => {
        console.error(err);
        this.notify.error("Ooops something went wrong");
      });    

    this.EditRecipeEvent.emit();
  }

  OnDiscardChanges() {
    const name: string = this.txtName.value.trim();
    const executionTime: number = parseInt(this.txtExecutionTime.value);
    const urlImage: string = this.txtUrlImage.value.trim();
    const description: string = this.txtDescription.value.trim();

    const nameChanged = name != this.recipe.Name;
    const executionTimeChanged = executionTime != this.recipe.ExecutionTime;
    const urlImageChanged = urlImage != this.recipe.UrlImage;
    const descriptionChanged = description != this.recipe.Description;  

    const anyChange = nameChanged 
      || executionTimeChanged
      || urlImageChanged
      || descriptionChanged;

    if(!anyChange) {
      this.EditRecipeEvent.emit();
      return;
    }

    this.EditRecipeEvent.emit();
  }
}
