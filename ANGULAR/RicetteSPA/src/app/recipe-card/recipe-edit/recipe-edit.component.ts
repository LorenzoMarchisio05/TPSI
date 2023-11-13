import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from 'src/app/models/Recipe';

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

  ngOnInit() {
    console.log(this.recipe);
  }

  OnSave() {
    this.EditRecipeEvent.emit();
  }
}
