import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-send-button',
  templateUrl: './code-send-button.component.html',
  styleUrls: ['./code-send-button.component.scss'],
})
export class CodeSendButtonComponent {
  @Input() buttonText?: string;
  @Input() icon?: string;
  @Output() showThirdFormEvent = new EventEmitter<string>();

  showThirdForm(codeChoice: string | undefined): void {
    if (codeChoice) {
      this.showThirdFormEvent.emit(codeChoice);
    }
  }
}
