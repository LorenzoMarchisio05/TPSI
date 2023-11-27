import { Component } from '@angular/core';
import { RecipeHeader } from '../../models/RecipeHeader';
import { Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { RecipesSearchService } from '../../services/recipes-search.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  private init: boolean = true;

  recipeHeaders!: RecipeHeader[] 

  filteredRecipeHeaders!: RecipeHeader[];

  headers: string[] = RecipeHeader.GetHeaders();

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private recipeSearchService: RecipesSearchService,
    private notify: NotificationService
  ) { }

  async ngOnInit() {
    if(this.init) {
      try
      {
        this.recipeHeaders = await this.recipesService.GetRecipesHeader();
        this.filteredRecipeHeaders = this.recipeHeaders;
      }
      catch(err: any) {
        console.error(err);
        this.notify.error(err.ToString());
      }

      this.init = false;
    }
  }

  OnDetailClick(id: number) {
    if(id === -1) {
      return;
    }
    
    this.router.navigate([`recipe/${id}/`]);
  }

  OnSearch(args: string) {
    const query: string = args.trim().toLowerCase();

    this.filteredRecipeHeaders = this.recipeSearchService.search(this.recipeHeaders, query);

    this.ngOnInit();
  }

  OnAddRecipeClick() {
    this.router.navigate(['recipe-add']);
  }
}
