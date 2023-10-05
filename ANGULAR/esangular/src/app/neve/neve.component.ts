import { Component } from '@angular/core';

@Component({
  selector: 'neve',
  templateUrl: './neve.component.html',
  styleUrls: ['./neve.component.css']
})
export class NeveComponent {
  dati: neve[] = 
  [
    { altezza : 100, localita : "Località1" },
    { altezza : 45, localita : "Località2" },
    { altezza : 126, localita : "Località3" },
    { altezza : 74, localita : "Località4" },
  ];
  
  constructor() {
    this.dati.forEach(dato => dato.altezza = Math.floor(Math.random() * (250 - 10) + 10));
  }
}

type neve = {
  localita: string,
  altezza: number,
};
