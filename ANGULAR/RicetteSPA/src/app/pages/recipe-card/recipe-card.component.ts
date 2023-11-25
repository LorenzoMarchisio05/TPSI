import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../models/Recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  private init: boolean = true;
  recipe!: Recipe;
  view: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
  ) { }

  async ngOnInit() {
    if(this.init) {
      const id = parseInt(this.route.snapshot.paramMap.get('id') || "-1");

      if(Number.isNaN(id) || id === -1) {
        this.router.navigate(['not-found']);
      }
  
      try
      {
        this.recipe = await this.recipesService.GetRecipe(id);
      }
      catch(err) {
        this.router.navigate(['not-found']);
      }
  
      document.querySelectorAll('.disabled').forEach((element: any) => element.classList.remove('disabled'));

      this.init = false;
      return;
    }
  }

  OnEditRecipe() {
    this.view = !this.view;
    this.ngOnInit();
  }
}

