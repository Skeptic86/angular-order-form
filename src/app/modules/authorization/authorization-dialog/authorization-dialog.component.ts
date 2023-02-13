import { Component } from '@angular/core';

@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrls: ['./authorization-dialog.component.scss'],
})
export class AuthorizationDialogComponent {
  showFirstForm = true;
  showSecondForm = false;
  showThirdForm = false;
  private phoneNumber?: string;

  toggleShowFirstForm(phoneNumber?: string) {
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
    this.showFirstForm = !this.showFirstForm;
    this.toggleShowSecondForm();
  }

  toggleShowSecondForm() {
    this.showSecondForm = !this.showSecondForm;
  }
}
