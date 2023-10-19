import { Component, Input } from '@angular/core';

@Component({
  selector: 'dadi',
  templateUrl: './dadi.component.html',
  styleUrls: ['./dadi.component.css']
})
export class DadiComponent {
  private basePath = "assets/img/";
  
  pathDado1: string;
  pathDado2: string;

  dado1: number;
  dado2: number;
  pari: boolean;

  constructor() { 
    this.dado1 = this.GeneraNumeroCasuale(1, 6);
    this.dado2 = this.GeneraNumeroCasuale(1, 6);

    this.pathDado1 = this.basePath + this.dado1 + ".png";
    this.pathDado2 = this.basePath + this.dado2 + ".png";

    this.pari = this.dado1 == this.dado2;
  }

  private GeneraNumeroCasuale(min = 0, max = 2^32/2): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @Input({required: true}) 
  title!: string;
}

