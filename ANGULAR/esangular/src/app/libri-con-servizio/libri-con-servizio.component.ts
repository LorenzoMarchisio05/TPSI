import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Book } from './book.model';

@Component({
  selector: 'libri-con-servizio',
  templateUrl: './libri-con-servizio.component.html',
  styleUrls: ['./libri-con-servizio.component.css']
})
export class LibriConServizioComponent {
  private endpoint: string = 'http://localhost:3000'

  libri!: Book[];
  headers!: string[];

  constructor ( 
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit() {
    this.libri = [];
    this.headers = Object.keys(this.libri[0])
  }

  btnDettagli_Click(id: number) {
    
  }

  btnElimina_Click(id: number) {
    
  }

  btnModifica_Click(id: number) {
    
  }

  btnInserisci_Click() { 
    
  }
}


