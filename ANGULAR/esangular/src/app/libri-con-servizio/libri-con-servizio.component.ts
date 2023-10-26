import { Component } from '@angular/core';
import { LibriService } from '../services/libri.service';
import { Book } from './book.model';

@Component({
  selector: 'libri-con-servizio',
  templateUrl: './libri-con-servizio.component.html',
  styleUrls: ['./libri-con-servizio.component.css']
})
export class LibriConServizioComponent {
  private endpoint: string = '/books/';

  libri!: Book[];
  headers!: string[];

  constructor ( 
    private libriService: LibriService,
  ) { }

  async ngOnInit () {
    try {
      this.libri = await this.libriService.GetBooks() || [];
      
      this.headers = this.libri.length > 0 ? Object.keys(this.libri[0]) : [];
    } catch (e) {
      alert("errore caricamento libri");
    }
  }

  async btnDettagli_Click(id: number) {
    try {
      const {author, country, pages, title, year} = await this.libriService.GetBook(id);
      
      alert([id, author, country, pages, title, year].join(', '));
    } catch (e) {
        alert("errore recupero libro");
    }
  }

  async btnElimina_Click(id: number) {
    try {
      await this.libriService.DeleteBook(id);
      
      alert("libro eliminato con successo");
      this.ngOnInit();
    } catch (e) {
      alert("errore eliminazione libro");
    }
  }

  async btnModifica_Click(id: number) {
    const book = new Book(id, "autore1", "country1", 234, "titolo2", 1967);
    try {
      await this.libriService.UpdateBook(book);
      
      alert("libro aggiornato con successo");
      this.ngOnInit();
    } catch (e) {
      alert("errore aggiornamento libro");
    }
  }

  async btnInserisci_Click() { 
    const book = new Book(1034, "autore", "country", 234, "titolo", 1967);

    try {
      await this.libriService.AddBook(book);
     
      alert("libro aggiunto con successo");
      this.ngOnInit();
    }
    catch(e) {
      alert("errore inserimento libro");
    }

  }
}


