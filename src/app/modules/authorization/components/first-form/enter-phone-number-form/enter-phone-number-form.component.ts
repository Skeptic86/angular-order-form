import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-enter-phone-number-form',
  templateUrl: './enter-phone-number-form.component.html',
  styleUrls: ['./enter-phone-number-form.component.scss'],
})
export class EnterPhoneNumberComponent {
  @Output() showFirstFormEvent = new EventEmitter<string>();
  @Input() phoneInput?: string = '';

  private sendFisrtFormFlag(phoneNumber: string) {
    this.showFirstFormEvent.emit(phoneNumber);
  }

  getPhoneInput(input: string | null) {
    if (input) {
      this.phoneInput = input;
    } else {
      this.phoneInput = '';
    }
    return this.phoneInput;
  }

  confirmPhoneInput() {
    if (this.phoneInput?.length) {
      if (this.phoneInput.length > 0) {
        this.sendFisrtFormFlag(this.phoneInput);
      }
    }
  }
}
