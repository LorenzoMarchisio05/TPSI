import { Component } from '@angular/core';

@Component({
  selector: 'eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent {

  btnClick() {
    console.log("click");
  }
}