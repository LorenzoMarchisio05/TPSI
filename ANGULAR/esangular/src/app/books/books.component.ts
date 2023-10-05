import { Component } from '@angular/core';
import { books } from "../../assets/dati/books";

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  libri: book[] = books;
  headers: string[] = Object.keys(this.libri[0]);
  mostraPagine: boolean = false;

}

type book = {
  author: string,
  country: string,
  pages: number,
  title: string,
  year: number,
};
