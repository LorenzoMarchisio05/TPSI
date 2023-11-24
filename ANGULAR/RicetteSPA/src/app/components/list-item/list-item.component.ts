import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RecipeHeader } from 'src/app/models/RecipeHeader';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input({required: true}) 
  recipeHeader!: RecipeHeader;

  @Output()
  detailsRequest = new EventEmitter<number>();

  OnDetailClick() {
    this.detailsRequest.emit(this.recipeHeader.Id);
  }
}
