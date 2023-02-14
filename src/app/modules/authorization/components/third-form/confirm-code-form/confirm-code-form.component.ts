import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-code-form',
  templateUrl: './confirm-code-form.component.html',
  styleUrls: ['./confirm-code-form.component.scss'],
})
export class ConfirmCodeFormComponent {
  @Input() phoneNumber?: string;
  @Output() sendPhoneNumberEvent = new EventEmitter<string>();

  sendPhoneNumber(phoneNumber: string | null) {
    if (phoneNumber) {
      this.sendPhoneNumberEvent.emit(phoneNumber);
    }
  }
}
