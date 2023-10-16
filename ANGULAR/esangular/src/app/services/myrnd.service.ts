import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class randomService {
  //come per qualsiasi classe posso avere property e metodi
  //public (senza niente davanti) e private
  //N.B. in questo esempio non viene gestito OBSERVABLE
  private minValue:number;
  private maxValue:number;
  constructor() { 
    this.minValue=0;
    this.maxValue=10;
  }
  
  private genera():number{
    //N.B. solo per fare esempio di private
    var r:number;
    r=Math.floor(Math.random() * (this.maxValue-this.minValue+1))+this.minValue;
    return r;
  }

  random(): number {
    return this.genera();
  }

  setValue(min?: number, max?: number){
    this.setMin(min || this.minValue);
    this.setMax(max || this.maxValue);
  }

  setMin(min: number) {
    this.minValue = min;
  }

  setMax(max: number) {
    this.maxValue = max;
  }
}

