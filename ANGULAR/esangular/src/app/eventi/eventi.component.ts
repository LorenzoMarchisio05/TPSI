import { Component } from '@angular/core';

@Component({
  selector: 'eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent {
  nome!: string;
  textChanged!: string;

  ngOnInit() {
    this.nome="Inserito da ngOnInit";
  }
  btnClick(){
    window.alert('Salve Mondo')
  }
  txtNomeTextChanged() {
    this.textChanged=this.nome;
  }
}