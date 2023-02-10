import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-enter-phone-number-form',
  templateUrl: './enter-phone-number-form.component.html',
  styleUrls: ['./enter-phone-number-form.component.scss'],
})
export class EnterPhoneNumberComponent {
  @Output() showFirstFormEvent = new EventEmitter();
  private phoneInput = '';

  private sendFisrtFormFlag() {
    this.showFirstFormEvent.emit();
  }

  getPhoneInput(input: string | null) {
    if (input) {
      this.phoneInput = '+7' + input;
    } else {
      this.phoneInput = '';
    }
    return this.phoneInput;
  }

  confirmPhoneInput() {
    if (this.phoneInput.length > 0) {
      alert(1);
      this.sendFisrtFormFlag();
    }
  }
}
