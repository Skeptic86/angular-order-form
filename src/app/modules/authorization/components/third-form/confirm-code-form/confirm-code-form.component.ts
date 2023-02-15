import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-code-form',
  templateUrl: './confirm-code-form.component.html',
  styleUrls: ['./confirm-code-form.component.scss'],
})
export class ConfirmCodeFormComponent {
  @Input() phoneNumber?: string;
  @Output() sendPhoneNumberEvent = new EventEmitter<string>();
  iconToggle = true;

  sendPhoneNumber(phoneNumber: string | null) {
    if (phoneNumber) {
      this.sendPhoneNumberEvent.emit(phoneNumber);
    }
  }

  // enableInput(event: any) {
  //   console.log(event);
  //   event.target.disable = false;
  //   event.target.isDisabled = false;
  //   this.iconToggle = false;
  // }
}
