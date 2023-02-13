import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-authorization-button',
  templateUrl: './authorization-button.component.html',
  styleUrls: ['./authorization-button.component.scss'],
})
export class AuthorizationButtonComponent {
  @Output() confirmPhoneNumberEvent = new EventEmitter();

  confirmPhoneNumber() {
    this.confirmPhoneNumberEvent.emit();
  }
}
