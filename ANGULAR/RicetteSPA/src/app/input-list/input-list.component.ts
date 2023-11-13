import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent {
  private init: boolean = true;

  private inputElement!: HTMLInputElement;
  private optionsElement!: HTMLElement;

  @Input({ required: true })
  dataSource!: (object | string | number)[];

  @Input({ required: true })
  label!: string;

  options!: Set<string>;
  filteredOptions!: Set<string>;

  ngOnInit() { 
    if(this.init) {
      this.options = this.getDataSourceAsSet();
      this.filteredOptions = this.options;
      this.init = false;
    }
  }

  ngAfterViewChecked() {
    const wrapper = document.getElementsByClassName(`wrapper-${this.label}`)[0];
    this.inputElement = wrapper.getElementsByClassName(`input-${this.label}`)[0] as HTMLInputElement;
    this.optionsElement = wrapper.getElementsByClassName(`options-${this.label}`)[0] as HTMLElement;
  }

  OnFocus() { 
    this.optionsElement.classList.add("show");
  }

  OnFocusOut() { 
    this.closeOptions();
  }

  OnSelect(option: string) {
    this.autoComplete(option);
  }

  OnDelete(option: string) {
    this.closeOptions();
    this.options.delete(option);

    if(this.inputElement.value === option) {
      this.inputElement.value = "";
    }
  }

  OnKeyUp(e: KeyboardEvent) { 
    const input = e.target as HTMLInputElement;
    const option = input.value;

    if("Enter" === e.code) {
      this.addIfNotExists(option);
      this.closeOptions();
      return;
    }

    const filteredOptions = [...this.options].filter((o: string) => o.includes(option));
    this.filteredOptions = new Set(filteredOptions);

    this.ngOnInit();
  }

  private closeOptions() {
    this.optionsElement.classList.remove("show");
    this.inputElement.blur();
  }

  private getDataSourceAsSet(): Set<string> {
    return new Set<string>(this.dataSource.map(data => Object.values(data).join(" ")));
  }

  private addIfNotExists(o: string) {
    const option = o.trim().toLowerCase();

    if(option === "") {
      return;
    }

    if(this.options.has(option)) {
      return;
    }

    this.options.add(option);
  }

  private autoComplete(option: string) {
    this.closeOptions();
    this.inputElement.value = option;
  }
}
