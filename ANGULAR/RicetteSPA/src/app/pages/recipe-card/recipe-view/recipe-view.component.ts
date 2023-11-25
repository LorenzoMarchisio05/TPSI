import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../../../models/Recipe';
import { RecipesService } from '../../../services/recipes.service';
import { RecipeIngredient } from '../../../models/RecipeIngredient';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent {
  private init: boolean = true;
  private baseIngredients!: RecipeIngredient[];

  @Input({ required: true })
  recipe!: Recipe;
  peopleCount: number = 1;

  @Output()
  EditRecipeEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router,
    private recipesService: RecipesService,
  ) { }

  async ngOnInit() {
    if(this.init) {
      this.baseIngredients = this.recipe.Ingredients;
      this.init = false;
      return;
    }
  }

  OnCloseButtonClick() {
    this.router.navigate(['']);
  }

  OnDeleteButtonClick() {
    this.recipesService.DeleteRecipe(this.recipe.Id)
      .then(console.log)
      .catch(console.error);

    this.router.navigate(['']);
  }

  OnEditButtonClick() {
    this.updateIngredients(1);

    this.EditRecipeEvent.emit();
  }

  OnPersonAddButtonClick() {
    this.peopleCount++;
    this.updateIngredients();

    this.ngOnInit();
  }

  OnPersonRemoveButtonClick() {
    if(this.peopleCount <= 1) {
      return;
    }

    this.peopleCount--;
    this.updateIngredients();
    
    this.ngOnInit();
  }

  private updateIngredients(peopleCount = -1) {
    if(peopleCount === -1) {
      peopleCount = this.peopleCount;
    }

    this.recipe.Ingredients = this.baseIngredients
      .map<RecipeIngredient>(ingredient => ({...ingredient, quantity: ingredient.quantity * peopleCount}));
  }
}
