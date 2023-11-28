import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipeListComponent } from 'src/app/components/recipe-list/recipe-list.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild("recipes") recipes!: ElementRef<RecipeListComponent>

  ngOnInit() {
    this.recipes.nativeElement.FetchRecipeHeaders();
  }
}
