import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt } from 'rxjs';

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
  ) {
    this.recipe = new Recipe(
      1,
      "Lorem ipsum",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit pariatur neque iure modi, ducimus dignissimos iusto dolorum dolores quia reiciendis odit, doloremque explicabo aliquid veniam!",
      [
        "2 Lorem ipsum dolor sit amet ", 
        "1 consectetur adipisicing elit. ", 
        "1 Sit pariatur neque iure modi" , 
        "2 ducimus dignissimos iusto dolorum dolores", 
        "4 quia reiciendis odit", 
        "1 doloremque explicabo aliquid veniam!",
      ],
      [
        "Lorem ipsum dolor sit amet ", 
        "consectetur adipisicing elit. ", 
        "Sit pariatur neque iure modi" , 
        "ducimus dignissimos iusto dolorum dolores", 
        "quia reiciendis odit", 
        "doloremque explicabo aliquid veniam!",
      ],
      15,
      RecipeDifficulty.easy,
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
  }

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
      //this.router.navigate(['not-found']);
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

