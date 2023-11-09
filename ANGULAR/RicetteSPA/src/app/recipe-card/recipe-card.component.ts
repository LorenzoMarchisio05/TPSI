import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../models/Recipe';
import { RecipeDifficulty } from '../models/RecipeDifficultyEnum';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  private rendered: boolean = false;

  id!: number
  recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
  ) { }

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || "-1");

    if(Number.isNaN(this.id) || this.id === -1) {
      this.router.navigate(['not-found']);
    }

    try
    {
      this.recipe = await this.recipesService.GetRecipe(this.id);
    }
    catch(err) {
      console.error(err);
    }

    this.rendered = true;
    document.querySelectorAll('.disabled').forEach((element: any) => element.classList.remove('disabled'))
  }

  onCloseButtonClick() {
    if(!this.rendered) {
      return;
    }
    this.router.navigate(['recipe-list']);
  }
}

