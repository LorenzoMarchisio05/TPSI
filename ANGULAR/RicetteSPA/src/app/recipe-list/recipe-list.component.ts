import { Component } from '@angular/core';
import { RecipeHeader } from '../models/RecipeHeader';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipeHeaders: RecipeHeader[] = new Array(25)
      .fill("")
      .map((_, i) => new RecipeHeader(
        i,
        `name${i}`, 
        Math.floor(Math.random() * (60 - 5) + 5), 
        Math.floor(Math.random() * 3)));

  headers: string[] = RecipeHeader.GetHeaders();

  constructor(
    private router: Router,
  ) {}

  rowClick(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const id = target.parentElement!.id;
    
    this.router.navigate([`recipe/${id}/`]);
  }
}
