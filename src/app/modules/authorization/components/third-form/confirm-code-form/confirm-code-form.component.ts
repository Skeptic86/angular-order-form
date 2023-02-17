import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-code-form',
  templateUrl: './confirm-code-form.component.html',
  styleUrls: ['./confirm-code-form.component.scss'],
})
export class ConfirmCodeFormComponent {
  @Input() phoneNumber?: string;
  @Output() sendPhoneNumberEvent = new EventEmitter<string>();
  @Output() sendRequestCodeEvent = new EventEmitter();
  iconToggle = true;

  sendRequestCode(): void {
    this.sendRequestCodeEvent.emit();
  }

  sendPhoneNumber(phoneNumber: string | null): void {
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
