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

  togglShowFirstForm() {
    this.showFirstForm = !this.showFirstForm;
  }
}
