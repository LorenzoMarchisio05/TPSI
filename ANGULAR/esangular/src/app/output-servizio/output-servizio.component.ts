import { Component } from '@angular/core';

@Component({
  selector: 'output-servizio',
  templateUrl: './output-servizio.component.html',
  styleUrls: ['./output-servizio.component.css']
})
export class OutputServizioComponent {
  numeroCasuale?: number;

  mostraNumero(number: number) {
    this.numeroCasuale = number;
  }
}
