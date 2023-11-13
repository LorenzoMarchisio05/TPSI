import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent {
  @Input({ required: true })
  dataSource!: object[];
  options!: string[];

  private select!: HTMLElement;

  ngOnInit() { 
    this.options = this.getDataSourceAsStringArray();

    this.select = document.getElementById("options")!;
  }

  OnFocus(e: Event) { 
    this.select.classList.add("show");
  }

  OnFocusOut(e: Event) { 
    this.closeOptions();
  }

  OnSelect(option: string) {
    this.closeOptions();
    console.log(option);
  }

  OnDelete(option: string) {
    this.closeOptions();
    console.log(option);
  }

  OnKeyUp(e: KeyboardEvent) { 
    const input = e.target as HTMLInputElement;
    const option = input.value;

    if("Enter" === e.code) {
      this.addIfNotExists(option);
      return;
    }

    console.log(option);
  }

  private closeOptions() {
    this.select.classList.remove("show");
  }

  private getDataSourceAsStringArray(): string[] {
    return this.dataSource.map(data => Object.values(data).join(" "));
  }

  private addIfNotExists(o: string): void {
    const option = o.trim().toLowerCase();

    if(option === "") {
      return;
    }

    if(this.options.includes(option)) {
      return;
    }

    this.options.push(option);
  }
}
