import { Component, Input, Output, EventEmitter } from '@angular/core';

type dataSourceType = (object | string | number);

@Component({
  selector: 'input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent {
  private static counter = 0;
  private init: boolean = true;

  private inputElement!: HTMLInputElement;
  private optionsElement!: HTMLElement;

  @Input({ required: true })
  dataSource!: dataSourceType[];

  @Input({ required: true })
  label!: string;

  @Output()
  DataSourceChangedEvent: EventEmitter<Set<string>> = new EventEmitter();

  options!: Set<string>;
  filteredOptions!: Set<string>;
  id!: number;

  constructor() {
    this.id = InputListComponent.counter++;
  }

  ngOnInit() { 
    if(this.init) {
      this.options = this.getDataSourceAsSet();
      this.filteredOptions = this.options;
      this.init = false;
    }

    console.log(this.options);
  }

  ngAfterViewChecked() {
    const wrapper = document.getElementsByClassName(`wrapper-${this.label}${this.id}`)[0];
    this.inputElement = wrapper.getElementsByClassName(`input-${this.label}${this.id}`)[0] as HTMLInputElement;
    this.optionsElement = wrapper.getElementsByClassName(`options-${this.label}${this.id}`)[0] as HTMLElement;
  }

  OnFocus() { 
    this.optionsElement.classList.add("show");
  }

  OnInputMouseLeave() { 
    this.closeOptions();
  }

  OnOptionsMouseOver() {
    this.optionsElement.classList.add("show");
  }

  OnOptionsMouseLeave() {
    this.closeOptions();
  }

  OnSelect(option: string) {
    this.autoComplete(option);
  }

  OnDelete(option: string) {
    this.closeOptions();
    this.options.delete(option);
    this.DataSourceChangedEvent.emit(this.options);

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
    const option = o.trim();

    this.inputElement.value = "";

    if(option === "") {
      return;
    }

    if(this.options.has(option)) {
      console.log("cè")
      return;
    }

    this.options.add(option);

    this.DataSourceChangedEvent.emit(this.options);
  }

  private autoComplete(option: string) {
    this.closeOptions();
    this.inputElement.value = option;
  }
}
