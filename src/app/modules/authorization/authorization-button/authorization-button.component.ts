import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-authorization-button',
  templateUrl: './authorization-button.component.html',
  styleUrls: ['./authorization-button.component.scss'],
})
export class AuthorizationButtonComponent {
  @Output() sendPhoneNumberEvent = new EventEmitter<string>();

  sendPhoneNumber(phoneNumber: string) {
    this.sendPhoneNumberEvent.emit(phoneNumber);
  }
}
