import { Component, Input, numberAttribute, Output, EventEmitter } from '@angular/core';
import { randomService } from "../../services/myrnd.service";

@Component({
  selector: 'output-servizio-child',
  templateUrl: './output-servizio-child.component.html',
  styleUrls: ['./output-servizio-child.component.css']
})
export class OutputServizioChildComponent {
  @Input({ required: true, transform: numberAttribute })
  min: number = 1;

  @Input({ required: true, transform: numberAttribute })
  max: number = 100; 

  @Output() 
  randomNumberEvent = new EventEmitter<number>();

  randomProvider: randomService = new randomService();
  
  ngOnInit() {
    this.randomProvider.setValue(this.min, this.max);
  }

  generaNumero() {
    const number: number = this.randomProvider.random();
    this.randomNumberEvent.emit(number);
  }
}
