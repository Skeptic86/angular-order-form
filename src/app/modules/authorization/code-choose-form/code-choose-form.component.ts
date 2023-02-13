import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-choose-form',
  templateUrl: './code-choose-form.component.html',
  styleUrls: ['./code-choose-form.component.scss'],
})
export class CodeChooseFormComponent {
  @Output() toggleFirstFormEvent = new EventEmitter();

  toggleFirstForm() {
    this.toggleFirstFormEvent.emit();
  }
}
