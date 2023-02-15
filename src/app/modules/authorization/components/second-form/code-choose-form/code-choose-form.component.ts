import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-choose-form',
  templateUrl: './code-choose-form.component.html',
  styleUrls: ['./code-choose-form.component.scss'],
})
export class CodeChooseFormComponent {
  @Output() toggleFirstFormEvent = new EventEmitter();
  @Output() toggleThirdFormEvent = new EventEmitter<string>();

  toggleThirdForm(codeChoice: string) {
    console.log(codeChoice);
    this.toggleThirdFormEvent.emit(codeChoice);
  }

  toggleFirstForm() {
    this.toggleFirstFormEvent.emit();
  }
}
