import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent {
  private txtSearch!: HTMLInputElement;

  @Output() 
  searchEvent = new EventEmitter<string>();

  ngOnInit() {
    this.txtSearch = document.getElementById("txtSearchBar") as HTMLInputElement;
  }

  OnKeyPress(e: any) {
    if(e.key.toUpperCase() !== "ENTER") {
      return;
    }

    this.searchEvent.emit(this.txtSearch.value);
  }
}
