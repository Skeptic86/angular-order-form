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
  phoneNumber?: string;
  private codeChoice?: string;

  toggleShowFirstForm(phoneNumber?: string) {
    this.setPhoneNumber(phoneNumber);

    this.showFirstForm = !this.showFirstForm;
    this.toggleShowSecondForm();
  }

  setPhoneNumber(phoneNumber: string | undefined) {
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  }

  toggleShowThirdForm(codeChoice?: string) {
    if (this.codeChoice) {
      this.codeChoice = codeChoice;
    }
    this.showThirdForm = !this.showThirdForm;
    this.toggleShowSecondForm();
  }

  toggleShowSecondForm() {
    this.showSecondForm = !this.showSecondForm;
  }
}
